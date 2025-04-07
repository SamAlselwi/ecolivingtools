import { Metadata } from 'next';
import { notFound } from 'next/navigation';
//services
import { limit } from '@/common/services';
import { getLatestPosts } from '@/common/services/post.service';
//components
import { PageHeader, PostList } from '@/common/components';


export const metadata: Metadata = {
  title: 'Eco Living Blog - Smart & Sustainable Tech Insights',
  description: 'Stay updated with the latest eco-friendly innovations, smart home tech, and sustainable living tips. Explore expert insights on Eco Living Blog.',
  openGraph: {
    title: 'Eco Living Blog - Smart & Sustainable Tech Insights',
    description: 'Stay updated with the latest eco-friendly innovations, smart home tech, and sustainable living tips. Explore expert insights on Eco Living Blog.',
    url: `${process.env.BASE_URL}/blog`,
    images: [
      {
        url: `${process.env.BASE_URL}/ecolivingtools.png`,
        secureUrl: `${process.env.BASE_URL}/ecolivingtools.png`,
        alt: 'Blog Banner - Eco Living',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eco Living Blog - Smart & Sustainable Tech Insights',
    description: 'Stay updated with the latest eco-friendly innovations, smart home tech, and sustainable living tips. Explore expert insights on Eco Living Blog.',
    images: [`${process.env.BASE_URL}/ecolivingtools.png`],
  },
  alternates: {
    canonical: `${process.env.BASE_URL}`,
    languages: {
      'en-us': `${process.env.BASE_URL}/blog`,
      'en-ca': `${process.env.BASE_URL}/blog`,
      'en': `${process.env.BASE_URL}/blog`,
      'x-default': `${process.env.BASE_URL}/blog`,
    }
  }
};

export default async function BlogPage() {
  const posts = await getLatestPosts();
  if (!Array.isArray(posts)) {
    notFound();
  }

  const hasMore = posts.length === limit ? true : false;
  return (
    <>
      <PageHeader title="Eco Living Blog" subTitle="Your gateway to the latest in tech trends, smart living, and eco friendly innovations." />
      <div className="mt-4">
        <PostList items={posts} hasMore={hasMore} />
      </div>
    </>
  );
}
