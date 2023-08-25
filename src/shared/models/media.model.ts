export type GalleryItem = {
  created_at: string;
  filename: string;
  id: number;
  original_filename: string;
  url: string;
  additional_info: {
    in_progress: boolean;
    size_urls: {
      big_icon: string;
      gallery: string;
    };
    sizes: string[];
  };
  progress?: number;
  progressId?: string;
};

export type FileItem = {
  id: number;
  filename: string;
  original_filename: string;
  additional_info: {
    in_progress?: boolean;
    pdf_url?: string;
    sizes: string[];
    size_urls: {
      middle_icon: string;
      big_icon: string;
    };
  };
  created_at: string;
  url: string;
};

export type MediaType = {
  created_at: string;
  filename: string;
  id: number;
  token: string;
  size?: number;
  original_filename: string;
  url: string;
  progress?: number;
  progressId?: string;
  additional_info: {
    in_progress?: boolean;
    pdf_url?: string;
    sizes: string[];
    size_urls: {
      big_icon: string;
      middle_icon?: string;
      gallery?: string;
      avatar_icon?: string;
      small_icon?: string;
      attachment_middle?: string;
      attachment_small?: string;
    };
  };
};
