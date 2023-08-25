import React, { FC } from 'react';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import { tagsConfig } from '../../../../../shared/configs/tags.config';
import { TagItemContainer } from './TagItem.style';
type TagItemProps = {
  selectedTag: TagsEnum;
};
const TagItem: FC<TagItemProps> = ({ selectedTag }) => {
  const tagItem = tagsConfig[selectedTag];

  return (
    <TagItemContainer
      backgroundColor={tagItem.backgroundColor}
      borderColor={tagItem.borderColor}
      iconColor={tagItem.iconColor}
      tagId={tagItem.id}
    >
      <tagItem.icon />
    </TagItemContainer>
  );
};

export default TagItem;
