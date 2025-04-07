import dbConnect from "@/lib/dbConnect";
import { generateSitemap } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { FilterQuery, QueryOptions } from 'mongoose';
import { IPost } from "@/common/interfaces";
import PostModel from "@/common/models/Post";
import { format } from 'date-fns';


export async function GET() {
  const posts = await fetchPosts(); // Replace with your actual data-fetching logic

  const sitemap = generateSitemap(posts);

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

async function fetchPosts(): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    await dbConnect();
    const query: FilterQuery<IPost> = {
      status: true,
      $or: [
        { notIndexable: { $exists: false } },
        { notIndexable: false }
      ]
    };
    const options: QueryOptions = {
      sort: '-createdAt',
    };
    const list: IPost[] = await PostModel.find(query, null, options);
    return list.map(eachPost => {
      return {
        slug: eachPost.slug,
        updatedAt: format(eachPost.updatedAt, 'yyyy-MM-dd')
      }
    })
    
  } catch (error) {
    return [];
  }
}