import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
//services
import { getDataBySlug } from '@/common/services/post.service';
import { fetchMeta } from '@/common/services/meta.service';
import { limit } from '@/common/services';
//components
import { PageHeader, PostDetails, PostList } from '@/common/components';
import { getMetadata, getMetadataDetailsPage } from '@/common/util';
import { MetaItem } from '@/common/interfaces';

type Props = {
  params: { slug: string };
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  try {
    // fetch data
    const item = await fetchMeta(slug); 

    if(item && typeof item === 'object' && ((item.referenceType === 'post') || item.type === 'article')){
      return getMetadataDetailsPage(item);
    } else {
      return getMetadata(item as MetaItem);
    }
    
  } catch (error) {
    throw error;
  }
}

export default async function Post({ params }: Props) {
  const slug = params.slug;
  const { posts, post, related, tag, category } = await getDataBySlug(slug);

  if (tag && !Array.isArray(posts)) {
    notFound();
  }

  if (!tag && !category && !post) {
    notFound();
  }

  // getting posts by tag
  if (tag || category) {
    return (
      <>
        {category && <PageHeader title={category.name} subTitle={category.description} /> }
        {tag && <PageHeader title={tag.name} subTitle={tag.description} /> }
        <div className="mt-4">
          <PostList
            items={posts}
            hasMore={posts.length === limit}
            tag={tag ? slug : undefined}
            category={category ? slug : undefined}
          />
        </div>
      </>
    );
  }

  // show the post details page
  return (
    <PostDetails post={JSON.parse(JSON.stringify(post))} related={related} />
  );
}
