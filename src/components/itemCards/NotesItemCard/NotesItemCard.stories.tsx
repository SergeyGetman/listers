import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NotesItemCard from './NotesItemCard';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';

export default {
  title: 'Components/ItemsCard/NotesItemCard',
  component: NotesItemCard,
} as ComponentMeta<typeof NotesItemCard>;

const Template: ComponentStory<typeof NotesItemCard> = (args) => <NotesItemCard {...args} />;

export const NotesItemCardStory = Template.bind({});
NotesItemCardStory.args = {
  currentUserId: 1286,
  item: {
    title: 'My note with long title and two lines of text goes here',
    body: 'Bacon ipsum dolor amet bresaola sausage salami doner shankle beef pork loin ham hock, kielbasa fatback buffalo chislic meatball t-bone rump.  Pork belly tri-tip buffalo leberkas brisket chislic, beef ribs short ribs cupim sausage shoulder prosciutto.  Tongue jowl shank landjaeger spare ribs kevin chuck.  Short loin t-bone jerky,',
    id: 1488,
    updated_at: '2022-06-06 15:51:12',
    creator: {
      avatar: {
        additional_info: {
          in_progress: false,
          size_urls: {
            avatar_icon: '/storage/avatar_preview/2021/11/02/aFG3DwFGV0Xcqctv/avatar_icon.jpeg',
            avatar_profile: '/storage/avatar_preview/2021/11/02/aFG3DwFGV0Xcqctv/avatar_profile.jpeg',
          },
          sizes: ['avatar_icon', 'avatar_profile'],
        },

        created_at: '2022-05-09 07:19:36',
        filename: 'original',
        id: 20682,
        original_filename: '20220509_1019.jpeg',
        url: '/storage/avatar_preview/2021/11/02/aFG3DwFGV0Xcqctv/original.jpeg',
      },
      connection_role: 'Friend',
      contacts: null,
      entity_type: 'friend',
      first_name: 'Вася',
      id: 1286,
      is_can_view_media: false,
      is_fake: 0,
      last_name: 'Бой',
      package: 'personal_hub',

      status: PlannerItemStatusesEnum.done,
    },
  },
  hasEditPermission: true,
};
