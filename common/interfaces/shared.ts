export interface PostImage{
  thumbnail: string|null;
  full: string|null;
}

export interface IBanner {
  id: string;
  name: string;
  image: PostImage;
  slug: string;
}

export type MetadataType = 'website' | 'article';

export interface MetaItem {
  title: string;
  description: string;
  name: string;
  image: string;
  url: string;
  type: MetadataType;
  category: string;
  metaDescription?: string;
  metaTitle?: string;
  referenceType?: string;
}

export type ToastColors = 'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark';

export interface IProgress {
  isLoading: boolean;
  toastShow: boolean;
  message?: string|ErrorObj;
  color?: ToastColors;
  header?: string;
  autohide?: boolean;
  duration?:number;
  isError?: boolean;
}

export interface ErrorObj{
  message: string;
}

export type SearchLocation = 'header' | 'indicator' | 'mobile-header';
export type IndicatorTrigger = 'hover' | 'click' | false;
