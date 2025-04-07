export type {
  PostImage,
  IBanner,
  MetaItem,
  MetadataType,
  ToastColors,
  IProgress,
  ErrorObj,
  SearchLocation,
  IndicatorTrigger
} from './shared'; //shared
export type { ILink } from './link'; //link
export type { IPost, ShortPost, FetchResponse } from './post'; //post
export { mapFeatured, mapPost, mapSinglePost } from './post'; //post

export type { ICategory, PostCategory, CategoryItem } from './category'; //category
export { mapCategory } from './category'; //category
export type { ITag, PostTag } from './tag'; //category
export type { ISlug } from './slug'; //slug
