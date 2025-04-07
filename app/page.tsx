import { Banners, PageTitle, PostList } from "@/common/components";
import { limit } from "@/common/services";
import { getFeatures, getLatestPosts } from "@/common/services/post.service";
import { notFound } from 'next/navigation';

export default async function Home() {
  const posts = await getFeatures();
  const latest = await getLatestPosts();
  if (!Array.isArray(posts) || !Array.isArray(latest)) {
    notFound();
  }

  if(!posts.length){
    notFound();
  }
  
  const items = {
    primary: posts[0],
    secondary: posts.slice(1, 5),
  };

  const hasMore = latest.length === limit ? true : false;
  return (
    <>
      <Banners primaryItem={items.primary} secondaryItems={items.secondary} />
      <PageTitle header="Latest" eleKey="latest-posts" />
      <PostList items={latest} hasMore={hasMore}/>
    </>
  )
}
