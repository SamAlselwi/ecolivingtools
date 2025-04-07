import { getLatestPosts } from "@/common/services/post.service";
import {SearchResults} from "@/common/components/";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Search for Eco Living Tools',
  description: `Search for the best eco living tools to save energy, reduce waste, and create a sustainable home. Upgrade your lifestyle with smart choices`,
  openGraph: {
    title: 'Search for Eco Living Tools',
    description: `Search for the best eco living tools to save energy, reduce waste, and create a sustainable home. Upgrade your lifestyle with smart choices`,
    url: `${process.env.BASE_URL}/search`,
    images: [
      {
        url: `${process.env.BASE_URL}/ecolivingtools.png`,
        secureUrl: `${process.env.BASE_URL}/ecolivingtools.png`,
        alt: 'Search for Eco Living Tools',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search for Eco Living Tools',
    description: `Search for the best eco living tools to save energy, reduce waste, and create a sustainable home. Upgrade your lifestyle with smart choices`,
    images: [`${process.env.BASE_URL}/ecolivingtools.png`],
  },
  alternates: {
    canonical: `${process.env.BASE_URL}`,
    languages: {
      'en-us': `${process.env.BASE_URL}/search`,
      'en-ca': `${process.env.BASE_URL}/search`,
      'en': `${process.env.BASE_URL}/search`,
      'x-default': `${process.env.BASE_URL}/search`,
    }
  },
  robots: {index: false, follow: false}
};


const SearchPage = async () => {
  const latest = await getLatestPosts();

  return (<SearchResults posts={latest}/>)
};

export default SearchPage;