//services
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/common/services/post.service';
import { fetchCategoryMeta } from '@/common/services/meta.service';
import { limit } from '@/common/services';
//components
import { PageHeader, PostList } from '@/common/components';
import { getMetadata } from '@/common/util';
import { MetaItem } from '@/common/interfaces';

interface Prop {
  params: { slug: string };
}

export async function generateMetadata({ params }: Prop): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  try {
    // fetch data
    const item: unknown = await fetchCategoryMeta(slug, `category/${slug}`);
    return getMetadata(item as MetaItem);

  } catch (error) {
    throw error;
  }
}

const SingleCategoryPage = async ({ params: { slug } }: Prop) => {
  const posts = await getPostsByCategory(slug);
  if (!Array.isArray(posts)) {
    notFound();
  }

  let category = null;
  if(posts.length){
    const post = posts[0];
    category = post.categories?.find(item => {return item.slug === slug});
  }
  const hasMore = posts.length === limit ? true : false;
  return (
    <>
      <PageHeader title={category ? category.name: ''} subTitle={category ? category.description: ''} />
      <div className="mt-4">
        <PostList items={posts} hasMore={hasMore} category={slug} />
      </div>
    </>
  );
};
export default SingleCategoryPage;
