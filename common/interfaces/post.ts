import { PostImage, PostCategory, PostTag  } from '.';
import { formatDate } from '../helpers';

export interface IPost {
  id: string;
  name: string;
  slug: string;
  content: string;
  description: string;
  isFeatured: boolean;
  status: boolean;
  image: PostImage;
  categories: PostCategory[];
  updatedAt: string;
  createdAt: string;
  tags: PostTag[];
  related?: IPost[];
  metaDescription: string;
  notIndexable?: boolean;
  hideBanner?: boolean;
}

export interface ShortPost {
  id: string;
  name: string;
  image: PostImage;
  slug: string;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  categories?: PostCategory[];
  tags?: PostTag[];
}

export const mapFeatured = (post: any): ShortPost =>{
  const s3Url = process.env.S3_HOSTNAME;
  const s3Bucket = process.env.S3_BUCKET;
  const cloudfront = `https://${s3Bucket}.${s3Url}`;
  return {
    id: post._id.toString(),
    name: post.name,
    slug: post.slug,
    description: post.description,
    updatedAt: formatDate(post.updatedAt as any),
    createdAt: formatDate(post.createdAt as any),
    image: {
      thumbnail: `${cloudfront}/${post.image?.thumbnail}`,
      full: `${cloudfront}/${post.image?.full}`,
    },
    categories: getFeatureCategory(post)
  }
}

const getFeatureCategory = (post: any) =>{
  if(Array.isArray(post.categories) && post.categories.length){
    const categories: PostCategory[] = post.categories;
    let category = categories[0];
    if(categories.length > 1){
      category = categories.find(cate => cate.slug !== 'gadgets')!;
    }

    return [{
      id: category._id?.toString()!,
      name: category.name,
      slug: category.slug,
      inRoot: category.inRoot ? category.inRoot : false
    }]
  }
  return [];
}

// export const mapPost = (post: Post): ShortPost =>{
export const mapPost = (post: any): ShortPost =>{
  // const cloudfront = process.env.AWS_CLOUDFRONT;
  const s3Url = process.env.S3_HOSTNAME;
  const s3Bucket = process.env.S3_BUCKET;
  const cloudfront = `https://${s3Bucket}.${s3Url}`;
  return {
    id: post._id.toString(),
    name: post.name,
    slug: post.slug,
    description: post.description,
    updatedAt: formatDate(post.updatedAt),
    createdAt: formatDate(post.createdAt),
    image: {
      thumbnail: `${cloudfront}/${post.image?.thumbnail}`,
      full: `${cloudfront}/${post.image?.full}`,
    },
    categories: getCategories(post),
    tags: getTags(post),
  }
}

// export const mapSinglePost = (item: Post, server = true): IPost => {
export const mapSinglePost = (item: any, server = true): IPost => {
  const s3Url = server ? process.env.S3_HOSTNAME : process.env.NEXT_PUBLIC_S3_HOSTNAME;
  const s3Bucket = server ? process.env.S3_BUCKET : process.env.NEXT_PUBLIC_S3_BUCKET;
  const cloudfront = `https://${s3Bucket}.${s3Url}`;
  return {
    id: item._id.toString(),
    name: item.name,
    slug: item.slug,
    content: item.content,
    description: item.description as string,
    status: item.status,
    isFeatured: item.isFeatured,
    categories: getCategories(item),
    tags: getTags(item),
    image: {
      thumbnail: `${cloudfront}/${item.image?.thumbnail}`,
      full: `${cloudfront}/${item.image?.full}`,
    },
    createdAt: formatDate(item.createdAt, 'MMM d, y'),
    updatedAt: formatDate(item.updatedAt, 'MMM d, y'),
    metaDescription: item.metaDescription ? item.metaDescription : '',
    hideBanner: item.hideBanner ? item.hideBanner : false,
  };
};

export const getCategories = (post: any) => {
  if(Array.isArray(post.categories) && post.categories.length){
    const categories: PostCategory[] = post.categories;
    return categories.map(cate => {
      return {
        id: cate._id?.toString()!,
        name: cate.name,
        slug: cate.slug,
        description: cate.description,
        inRoot: cate.inRoot ? cate.inRoot : false
      }
    });
  }
  return [];
}

export const getTags = (post: any) => {
  if(Array.isArray(post.tags) && post.tags.length){
    const tags: PostTag[] = post.tags;
    return tags.map(tag => {
      return {
        id: tag._id?.toString()!,
        name: tag.name,
        slug: tag.slug,
        description: tag.description
      }
    });
  }
  return [];
}


export interface FetchResponse<T> {
  data: T[];
  skip: number;
}