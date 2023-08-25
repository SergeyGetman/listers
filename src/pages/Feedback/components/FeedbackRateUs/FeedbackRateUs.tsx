import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Collapse, Grid, Typography, useTheme } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import StyledRating from '@mui/material/Rating';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { StyledRatingBlock, StyledRatingStars } from './FeedbackRateUs.style';
import MuiBaseAccordion from '../../../../components/accordions/MuiBaseAccordion';
import MuiBaseTextFiled from '../../../../components/formElements/MuiBaseTextFiled';
import MuiSquareButton from '../../../../components/buttons/MuiSquareButton';
import { ReactComponent as FeedbackStarEmpty } from '../../../../assets/Images/feedback-star-empty.svg';
import { ReactComponent as FeedbackStar } from '../../../../assets/Images/feedback-star.svg';
import { MediaType } from '../../../../shared/models/media.model';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { uploadMediaFile } from '../../../../store/Common/commonThunk';
import useValidTypes from '../../../../shared/hooks/useValidTypes';
import i18next from '../../../../shared/locales/i18n';
import { sendFeedback } from '../../../../store/Profile/profile.actions';
import MuiLoadingButton from '../../../../components/buttons/MuiLoadingButton';
import { DocumentsEntityTypeEnum } from '../../../../shared/enums/documentEntityType.enum';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import ChatInputFileElement from '../../../../components/forms/ChatForm/FileElement/ChatInputFileElement';

const LOADIN_FILE = {
  created_at: '',
  filename: '',
  id: 0,
  original_filename: '',
  url: '',
  token: '',
  additional_info: {
    in_progress: true,
    size_urls: {
      big_icon: '',
      middle_icon: '',
    },
    sizes: [],
  },
  progress: undefined,
  progressId: 0,
};

const validationSchema = Yup.object().shape({
  message: Yup.string()
    .test({
      name: 'message',
      test: (middle_name, schema) => {
        if (!!middle_name && middle_name.length >= 1 && middle_name.length <= 1) {
          return schema.createError({
            path: schema.path,
            message: i18next.t('validation.general.min', {
              field: i18next.t('general.fieldNames.message'),
              count: 2,
            }),
          });
        }
        return true;
      },
    })
    .max(
      600,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.middleName'),
        count: 600,
      }),
    ),
  design: Yup.string().required(),
  idea: Yup.string().required(),
  functionality: Yup.string().required(),
});

export type FeedBackFormType = {
  message: string | null;
  design: number | null;
  functionality: number | null;
  idea: number | null;
};

const FeedbackRateUs = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<MediaType[]>([]);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { getAcceptedFormat, validateMediaFormat } = useValidTypes();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);

  const initialValues = {
    message: '',
    design: null,
    functionality: null,
    idea: null,
  };
  const { handleSubmit, control, reset, formState } = useForm<FeedBackFormType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FeedBackFormType) => {
    setIsShowConfirmLoader(true);
    const documents = files.map((item: MediaType) => ({
      id: item.id,
    }));
    const reqData = {
      ...data,
      design: data.design ? +data.design * 20 : 100,
      idea: data.idea ? +data.idea * 20 : 100,
      functionality: data.functionality ? +data.functionality * 20 : 100,
      documents: documents,
    };
    dispatch(sendFeedback(reqData))
      .then((result) => {
        if (sendFeedback.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.feedbackSent'));
          reset();
          setFiles([]);
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });
  };

  const handleChangeProgress = (progressId: string, progress: number) => {
    setFiles((prev) =>
      prev.map((file) => {
        if (file.progressId === progressId) {
          return { ...file, progress };
        }
        return file;
      }),
    );
  };

  const deleteLoadingMedia = (progressId: string, file?: MediaType) => {
    if (file !== undefined) {
      setFiles((prev) =>
        prev.map((item) => {
          if (item.progressId === progressId) {
            return { ...file, progressId, progress: undefined };
          }
          return item;
        }),
      );
    } else {
      setFiles((prev) => prev.filter((item) => item.progressId !== progressId));
    }
  };

  const handleAddFile = useCallback(
    (inputFiles: any) => {
      const loadingFile: MediaType[] = [];
      for (let i = 0; i < inputFiles.length; i += 1) {
        if (!validateMediaFormat('file', inputFiles[i].type)) {
          NotificationService.error(t('mediaGallery.errors.fileTypeItem', { fileName: inputFiles[i].name }));
        } else {
          const loadingFileItem = {
            ...LOADIN_FILE,
            progressId: uuidv4() || '',
            original_filename: inputFiles[i].name,
          };
          const formData = new FormData();
          formData.append('file', inputFiles[i]);
          formData.append('entity_type', DocumentsEntityTypeEnum.feedback_document);
          dispatch(
            uploadMediaFile(
              formData,
              (progress) => handleChangeProgress(loadingFileItem.progressId, progress),
              (file) => deleteLoadingMedia(loadingFileItem.progressId, file),
            ),
          );
          loadingFile.push(loadingFileItem);
        }
      }
      setFiles([...files, ...loadingFile]);
    },
    [dispatch, files, t, validateMediaFormat],
  );

  const handleDeleteFile = (id: number, oldMedia: MediaType[]) => {
    const newMedia = oldMedia.filter((file) => file.id !== id);
    setFiles(newMedia);
  };

  const handleOpenViewModal = (active: number) => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media: files,
        activeMedia: active,
        onDelete: () => {
          handleDeleteFile(files[active].id, files);
        },
        permission: { isDownload: true, isDelete: true },
      },
    });
  };

  return (
    <MuiBaseAccordion
      infoTooltipText={t('feedback.tooltips.rateUs')}
      isDisabledExpand
      label={t('general.containers.rateUs')}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="large">{t('feedback.rateUsInfo.rateUsInfoDescription')}</Typography>
        <Box sx={{ mt: '30px' }}>
          <StyledRatingBlock>
            <Typography component="legend" sx={{ width: '90px' }}>
              {t('feedback.rateUsInfo.rateUsInfoCategories.idea')}
            </Typography>
            <StyledRatingStars>
              <Controller
                name="idea"
                control={control}
                render={({ field, fieldState }) => (
                  // @ts-ignore
                  <StyledRating
                    {...field}
                    precision={1}
                    sx={{
                      svg: {
                        path: {
                          stroke: !!fieldState?.error?.message ? 'red' : '',
                          fill: !!fieldState?.error?.message ? `transparent` : '',
                        },
                      },
                    }}
                    icon={<FeedbackStar />}
                    emptyIcon={<FeedbackStarEmpty />}
                  />
                )}
              />
            </StyledRatingStars>
          </StyledRatingBlock>
          <StyledRatingBlock>
            <Typography component="legend" sx={{ width: '90px' }}>
              {t('feedback.rateUsInfo.rateUsInfoCategories.design')}
            </Typography>
            <StyledRatingStars>
              <Controller
                name="design"
                control={control}
                render={({ field, fieldState }) => (
                  // @ts-ignore
                  <StyledRating
                    {...field}
                    precision={1}
                    sx={{
                      svg: {
                        path: {
                          stroke: !!fieldState?.error?.message ? 'red' : '',
                          fill: !!fieldState?.error?.message ? `transparent` : '',
                        },
                      },
                    }}
                    icon={<FeedbackStar />}
                    emptyIcon={<FeedbackStarEmpty />}
                  />
                )}
              />
            </StyledRatingStars>
          </StyledRatingBlock>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              marginBottom: '30px',
            }}
          >
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Typography component="legend" sx={{ width: '90px' }}>
                {t('feedback.rateUsInfo.rateUsInfoCategories.functionality')}
              </Typography>
              <StyledRatingStars>
                <Controller
                  name="functionality"
                  control={control}
                  render={({ field, fieldState }) => (
                    // @ts-ignore
                    <StyledRating
                      {...field}
                      precision={1}
                      sx={{
                        svg: {
                          path: {
                            stroke: !!fieldState?.error?.message ? 'red' : '',
                            fill: !!fieldState?.error?.message ? `transparent` : '',
                          },
                        },
                      }}
                      icon={<FeedbackStar />}
                      emptyIcon={<FeedbackStarEmpty />}
                    />
                  )}
                />
              </StyledRatingStars>
            </Box>
            <Collapse
              in={
                !!formState?.errors?.design || !!formState?.errors?.idea || !!formState?.errors?.functionality
              }
            >
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '90px' }} />
                <Typography sx={{ ml: '40px', mt: '10px', color: theme.palette.case.warning.high }}>
                  {t('validation.general.areRequired', {
                    field: i18next.t('general.fieldNames.stars'),
                  })}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </Box>
        <Controller
          name="message"
          control={control}
          render={({ field, fieldState }) => (
            <MuiBaseTextFiled
              {...field}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              label={t('general.fieldNames.describeYourIssueOrSuggestion')}
              placeholder={t('general.placeholders.describe_experience')}
              size="medium"
              multiline
              rows={3}
              maxRows={5}
            />
          )}
        />
        <Collapse in={files.length !== 0}>
          <Box sx={{ maxHeight: '50px', p: '0 10px 0 10px', overflowY: 'auto' }}>
            <Box
              sx={{
                paddingTop: '10px',
              }}
            >
              <Grid spacing="7px" container>
                {files.map((file, index) => (
                  <Grid key={file.progressId} item>
                    <ChatInputFileElement item={file} showFile={() => handleOpenViewModal(index)} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Collapse>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '16px' }}>
          <MuiSquareButton
            onClick={() => {
              if (fileRef) {
                fileRef.current?.click();
              }
            }}
            icon={<AttachFileIcon />}
          />
          <input
            ref={fileRef}
            onChange={(e: any) => handleAddFile(e.target.files)}
            accept={getAcceptedFormat('file')}
            type="file"
            multiple
            max={10}
            name="media"
            hidden
          />
          <Box sx={{ ml: '20px' }}>
            <MuiLoadingButton
              isStopPropagation={false}
              label={t('general.buttons.send')}
              loading={isShowConfirmLoader}
              variant="contained"
              type="submit"
              size="medium"
            />
          </Box>
        </Box>
      </form>
    </MuiBaseAccordion>
  );
};

export default FeedbackRateUs;
