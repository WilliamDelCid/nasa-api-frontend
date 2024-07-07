export interface NASAImage {
  collection:{
      href: string;
      items: NASAImageItem[];
      version: string;
     }
  }
  
  export interface NASAImageItem {
    data: NASAImageData;
    links: NASALink[];
    href: string;
  }
  
  export interface NASAImageData {
    center: string;
    date_created: string;
    description: string;
    media_type: string; 
    nasa_id: string;
    title: string;
  }
  
  export interface NASALink {
    href: string;
    rel: string;
  }
  
  export interface Card {
    mediaUrl: string;
    info: string;
    mediaType: string;
    captionsUrl?: string; 
    favorite?: boolean;
    iconFavorite?: string;
    description?: string;
  }