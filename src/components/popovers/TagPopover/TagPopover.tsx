import React, { FC } from 'react';
import { Box } from '@mui/material';
import { tagsConfig } from '../../../shared/configs/tags.config';
import { TagsEnum } from '../../../shared/enums/tags.enum';
import PaperActionMenu from '../../actionMenus/PaperActionMenu';
import TagItem from './components/TagItem';
type TagPopoverProps = {
  selectedTag?: TagsEnum | null;
  setTag: (val: TagsEnum) => void;
};
const TagPopover: FC<TagPopoverProps> = ({ selectedTag = TagsEnum.none, setTag }) => {
  const tagsMenu = [
    {
      item: tagsConfig[TagsEnum.profile],
      callback: () => setTag(tagsConfig[TagsEnum.profile].id),
    },
    {
      item: tagsConfig[TagsEnum.garage],
      callback: () => setTag(tagsConfig[TagsEnum.garage].id),
    },
    {
      item: tagsConfig[TagsEnum.education],
      callback: () => setTag(tagsConfig[TagsEnum.education].id),
    },
    {
      item: tagsConfig[TagsEnum.work],
      callback: () => setTag(tagsConfig[TagsEnum.work].id),
    },
    {
      item: tagsConfig[TagsEnum.pets],
      callback: () => setTag(tagsConfig[TagsEnum.pets].id),
    },
    {
      item: tagsConfig[TagsEnum.property],
      callback: () => setTag(tagsConfig[TagsEnum.property].id),
    },
    {
      item: tagsConfig[TagsEnum.none],
      callback: () => setTag(tagsConfig[TagsEnum.none].id),
    },
  ];

  return (
    <Box>
      <PaperActionMenu activeItem={selectedTag ?? TagsEnum.none} menuList={tagsMenu}>
        <TagItem selectedTag={selectedTag ?? TagsEnum.none} />
      </PaperActionMenu>
    </Box>
  );
};

export default TagPopover;
