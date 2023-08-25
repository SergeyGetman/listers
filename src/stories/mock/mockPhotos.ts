import { MediaType } from '../../shared/models/media.model';

export const mockPhotos: MediaType[] = [
  {
    id: 23940,
    filename: 'original',
    original_filename: '20220718_1134.jpeg',
    token: '',
    additional_info: {
      sizes: ['big_icon', 'middle_icon', 'gallery'],
      size_urls: {
        big_icon: '/storage/transport_photo/2022/07/18/HDD8HOPuhNZlpqGj/big_icon.jpeg',
        middle_icon: '/storage/transport_photo/2022/07/18/HDD8HOPuhNZlpqGj/middle_icon.jpeg',
        gallery: '/storage/transport_photo/2022/07/18/HDD8HOPuhNZlpqGj/gallery.jpeg',
      },
      in_progress: true,
    },
    created_at: '2022-07-18 08:34:19',
    url: '/storage/transport_photo/2022/07/18/HDD8HOPuhNZlpqGj/original.jpeg',
  },
];
