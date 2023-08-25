import React, { FC } from 'react';
import { Typography } from '@mui/material';
import parse from 'html-react-parser';
import Linkify from 'react-linkify';
type PlannerItemMainBlockContentProps = {
  site?: string;
  address?: string;
  phone?: string;
  description?: string;
  location?: google.maps.LatLng | google.maps.LatLngLiteral;
};
const PlannerItemMainBlockContent: FC<PlannerItemMainBlockContentProps> = ({
  site,
  location,
  address,
  phone,
  description,
}) => {
  return (
    <>
      {site ? (
        <Typography
          noWrap
          sx={{
            width: ' 100%',
          }}
          variant="default"
        >
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a onClick={(e) => e.stopPropagation()} target="blank" href={decoratedHref} key={key}>
                {decoratedText}
              </a>
            )}
          >
            {site}
          </Linkify>
        </Typography>
      ) : address && location?.lat ? (
        <Typography
          noWrap
          sx={{
            width: ' 100%',
          }}
          variant="default"
        >
          <a
            target="blank"
            onClick={(e) => e.stopPropagation()}
            href={`http://maps.google.com/maps?q=loc:${location?.lat},${location?.lng}`}
          >
            {address}
          </a>
        </Typography>
      ) : phone ? (
        <Typography
          noWrap
          sx={{
            width: '100%',
          }}
          variant="default"
        >
          <a href={`tel:${phone}`}>{phone}</a>
        </Typography>
      ) : description ? (
        <Typography
          noWrap
          sx={{
            width: ' 100%',
          }}
          variant="default"
        >
          {description ? parse(description) : 'N/A'}
        </Typography>
      ) : (
        <Typography
          noWrap
          sx={{
            width: ' 100%',
          }}
          variant="default"
        >
          N/A
        </Typography>
      )}
    </>
  );
};

export default PlannerItemMainBlockContent;
