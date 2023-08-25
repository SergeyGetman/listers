export type AvatarModel = {
  additional_info: {
    in_progress: boolean;
    size_urls: {
      middle_icon?: string;
      avatar_icon?: string;
      avatar_profile?: string;
      background_lg?: string;
      background_md?: string;
      background_sm?: string;
      background_sx?: string;
    };
    sizes: string[];
  };
  created_at: string;
  filename: string;
  id: number;
  original_filename: string;
  url: string;
} | null;
