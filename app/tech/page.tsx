import type { Metadata } from 'next'
import { notFound } from 'next/navigation';
//services
import { limit } from '@/common/services';
import { getPostsByTag } from '@/common/services/post.service';
import { fetchMeta } from '@/common/services/meta.service';
//components
import { PageHeader, PostList } from '@/common/components';
import { getMetadata } from '@/common/util';
import { MetaItem } from '@/common/interfaces';
 

export async function generateMetadata(): Promise<Metadata> {
  try {
    // fetch data
    const item = await fetchMeta('tech');
    //map mate data
    // const mapItem = mapMetaItem(item, '/tech');
    // get the meta data
    return getMetadata(item as MetaItem)
    
  } catch (error) {
    throw error;
  }
}


export default async function TechPage() {
  const slug = 'tech';
  const posts = await getPostsByTag(slug);
  if (!Array.isArray(posts)) {
    notFound();
  }

  let tag = null;
  if (posts.length) {
    const post = posts[0];
    tag = post.tags?.find((item) => {
      return item.slug === slug;
    });
  }
  const hasMore = posts.length === limit ? true : false;
  return (
    <>
      {tag && <PageHeader title={tag.name} subTitle={tag.description} />}
      <div className="mt-4">
        <PostList items={posts} hasMore={hasMore} tag={slug} />
      </div>
    </>
  );
}

/**
 * TODO fix the getPostsByTag method
 * arrow bottom
 *  post.tags?
 */