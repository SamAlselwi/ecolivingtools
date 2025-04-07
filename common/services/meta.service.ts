import dbConnect from '@/lib/dbConnect';
import CategoryModel from '../models/Category';
import TagModel from '@/common/models/Tag';
import PostModel from '@/common/models/Post';
import SlugModel from '../models/Slug';

export const fetchMeta = async (slug: string) => {
  try {
    await dbConnect();
  
    const slugEntry = await SlugModel.findOne({ slug });
    if (!slugEntry) {
      throw 'Content not found';
    }

    // Fetch the content based on the reference type
    switch (slugEntry.referenceType) {
      case 'post':{
        const post = await PostModel.findOne({slug: slug});
        if (post) {
          const s3Url = process.env.S3_HOSTNAME;
          const s3Bucket = process.env.S3_BUCKET;
          const cloudfront = `https://${s3Bucket}.${s3Url}`;
  
          return {
            title: post.name, 
            description: post.metaDescription ? post.metaDescription : post.description,
            slug: post.slug,
            type: 'article',
            url: `${process.env.BASE_URL}/${slug}`,
            thumbnail:`${cloudfront}/${post.image?.thumbnail}`,
            fullImage:`${cloudfront}/${post.image?.full}`,
            notIndexable: post.notIndexable ? post.notIndexable : false,
            referenceType: 'post'
          } as any
        }
        throw 'No posts available'
      }
      case 'tag':{
        const tag = await TagModel.findOne({slug: slug});
        if (tag) {
          return {
            title: tag.name, 
            description: tag.description,
            slug: tag.slug,
            type: 'website',
            url:  `${process.env.BASE_URL}/${slug}`,
            metaDescription: tag.metaDescription ? tag.metaDescription : '',
            metaTitle: tag.metaTitle ? tag.metaTitle : '',
            referenceType: 'tag'
          } as any
        }
        throw 'Invalid tag';

      }
      case 'category':{
        const cate = await fetchCategoryMeta(slug, `${slug}`);
        return {
          ...cate,
          referenceType: 'category'
        } as any
      }
      default:{
        throw 'Invalid tag';
      }
    }

    // if(slug.length <= 15){
    //   //*******************[START] Tag modal ************************/
    //   const tag = await TagModel.findOne({slug: slug}).select('name slug description');
    //   if (tag) {
    //     return {
    //       title: tag.name, 
    //       description: tag.description,
    //       slug: tag.slug,
    //       type: 'website',
    //       url:  `${process.env.BASE_URL}/${slug}`,
    //       metaDescription: tag.metaDescription ? tag.metaDescription : ''
    //     }
    //   }
    //   throw 'Invalid tag';
    //   //*******************[START] Tag modal ************************/
  
    // } else {
    //   //*******************[END] Post modal ************************/
    //   const post = await PostModel.findOne({slug: slug});
  
    //   if (post) {
    //     const s3Url = process.env.S3_HOSTNAME;
    //     const s3Bucket = process.env.S3_BUCKET;
    //     const cloudfront = `https://${s3Bucket}.${s3Url}`;

    //     return {
    //       title: post.name, 
    //       description: post.metaDescription ? post.metaDescription : post.description,
    //       slug: post.slug,
    //       type: 'article',
    //       url: `${process.env.BASE_URL}/${slug}`,
    //       thumbnail:`${cloudfront}/${post.image?.thumbnail}`,
    //       fullImage:`${cloudfront}/${post.image?.full}`,
    //       notIndexable: post.notIndexable ? post.notIndexable : false,
    //     }
    //   }
    //   throw 'No posts available'
    //   //*******************[END] Post modal ************************/
    // }
    
  } catch (error) {
    throw error;
  }
}


export const fetchCategoryMeta = async (slug: string, params: string) => {
  try {
    await dbConnect();

    const category = await CategoryModel.findOne({slug: slug});
    if (category) {
      return {
        title: category.name, 
        description: category.description,
        slug: category.slug,
        type: 'website',
        url:  `${process.env.BASE_URL}/${params}`,
        category: category.name,
        classification: category.name,
        metaDescription: category.metaDescription ? category.metaDescription : '',
        metaTitle: category.metaTitle ? category.metaTitle : '',
      }
    }

    throw 'Invalid category';
    
  } catch (error) {
    throw error;
  }
}