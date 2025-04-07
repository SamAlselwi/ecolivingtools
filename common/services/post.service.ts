import dbConnect from '@/lib/dbConnect';
import PostModel, { Post } from '@/common/models/Post';
import SlugModel from '../models/Slug';
//mongoose
import { FilterQuery, QueryOptions } from 'mongoose'
//model
//interfaces
import { IPost, ShortPost, mapFeatured, mapPost, mapSinglePost } from '../interfaces';

export const getFeatures = async () => {
  await dbConnect();

  
  let query: FilterQuery<IPost> = {isFeatured: true, status: true};
  let options: QueryOptions = {
    sort: '-createdAt',
  };

  options.skip = 0;
  options.limit = 5;
  const list = await PostModel.find(query, null, options)
  .populate('categories', ['name', 'slug', 'inRoot']).lean();
  return list.map((item) => {return mapFeatured(item)});
}

export const getLatestPosts = async () =>{
  await dbConnect();
  try {
    let query: FilterQuery<IPost> = {status: true};
    let options: QueryOptions = {
      sort: '-createdAt',
    };

    options.skip = 0;
    options.limit = process.env.LIMIT ? parseInt(process.env.LIMIT.toString()) : 48;
    const list = await PostModel.find(query, null, options)
      .populate('categories', ['name', 'slug', 'inRoot']).lean();
    return list.map((item) => {return mapPost(item)});
    
  } catch (error) {
    throw error;
  }
}


export const getPosts = async (skip: number = 0) => {
  await dbConnect();
  let query: FilterQuery<IPost> = {status: true};
  let options: QueryOptions = {
    sort: '-createdAt',
  };

  options.skip = skip;
  options.limit = 40;
  const list = await PostModel.find(query, null, options)
  .populate('categories', ['name', 'slug', 'inRoot']).lean();
  return list.map((item) => {return mapFeatured(item)});
}

export const getPostsByTag = async (tag: string, skip: number = 0) =>{
  await dbConnect();
  const limit = process.env.LIMIT ? parseInt(process.env.LIMIT.toString()) : 48;
  let postAggregate = PostModel.aggregate();
  postAggregate.lookup({ from: 'tags', localField: 'tags', foreignField: '_id', as: 'tags' });
  postAggregate.lookup({ from: 'categories', localField: 'categories', foreignField: '_id', as: 'categories'});
  postAggregate.sort('-createdAt');
  // postAggregate.unwind('tags');
  postAggregate.match({'tags.slug': tag, status: true});
  postAggregate.skip(skip);
  postAggregate.limit(limit);
  const posts = await PostModel.populate<Post[]>(postAggregate, [{path: 'categories', select: 'name slug inRoot'}, {path: 'tags', select: 'name slug'}]); 
  const items = posts.map((item) => {return mapPost(item)});
  return items;
}

export const getPostsByCategory = async (category: string, skip: number = 0) =>{
  await dbConnect();
  const limit = process.env.LIMIT ? parseInt(process.env.LIMIT.toString()) : 48;
  let postAggregate = PostModel.aggregate();
  postAggregate.lookup({ from: 'categories', localField: 'categories', foreignField: '_id', as: 'categories'});
  postAggregate.sort('-createdAt');
  postAggregate.match({'categories.slug': category, status: true});
  postAggregate.skip(skip);
  postAggregate.limit(limit);
  const posts = await PostModel.populate<Post[]>(postAggregate, {path: 'categories', select: 'name slug inRoot'});
  const items = posts.map((item) => {return mapPost(item)});
  return items;
}

export const getPostBySlug = async (slug: string) => {
  try {
    await dbConnect();
    const post = await PostModel.findOne({slug: slug}).populate('categories', 'name slug inRoot').populate('tags', 'name slug');
    if(!post){
      return null;
    }
    const related = await getRelated(post);
    return {item: mapSinglePost(post, true), related: related,}
  } catch (error) {
    throw error;
  }
}

export const getDataBySlug = async (slug: any): Promise<any> => {
  try {
    await dbConnect();


    const slugEntry = await SlugModel.findOne({ slug });
    if (!slugEntry) {
      throw 'Content not found';
    }

    // Fetch the content based on the reference type
    switch (slugEntry.referenceType) {
      case 'post':{
        const post = await getPostBySlug(slug);
        return {posts: [], post: post?.item, related: post?.related, tag: null};
      }
      case 'tag':{
        const posts = await getPostsByTag(slug);
        const tag = getTagFromPosts(posts, slug);
        return {posts: posts, post: null, tag: tag};
      }
      case 'category':{
        const posts = await getPostsByCategory(slug);
        const cate = getCategoryFromPosts(posts, slug);
        return {posts, post: null, tag: null, category: cate}
      }
      default:{
        return {posts: [], post: null, related:[], tag: null};
      }
    }


    // if(slug.length <= 15){
    //   const posts = await getPostsByTag(slug);
    //   const tag = getTagFromPosts(posts, slug);
    //   return {posts: posts, post: null, tag: tag};
    // } else {
    //   const post = await getPostBySlug(slug);
    //   return {posts: [], post: post?.item, related: post?.related, tag: null};
    // }
  } catch (error) {
    throw error;
  }
}

export const getRelated = async (post: any) => {
  try {
    const categoryIds = post.categories.map((cate: any) => cate.id);
    
    const query = {
      status: true,
      categories: { $in: categoryIds },
      _id: { $ne: post._id },
    };

    let options: QueryOptions = {
      sort: '-createdAt',
      limit: 6,
    };
  
    const posts = await PostModel.find(query, null, options);
    const items = posts.map((item) => {return mapPost(item)});
    return items;
    
  } catch (error) {
    throw error;
  }

}


const getTagFromPosts = (posts: ShortPost[], slug: string) => {
  let tag: any = null;
  if (Array.isArray(posts) && posts.length) {
    const post = posts[0];
    tag = post.tags?.find((item) => {
      return item.slug === slug;
    });
  }
  return tag;
}


const getCategoryFromPosts = (posts: ShortPost[], slug: string) => {
  let cate: any = null;
  if (Array.isArray(posts) && posts.length) {
    const post = posts[0];
    cate = post.categories?.find((item) => {
      return item.slug === slug;
    });
  }
  return cate;
}

