import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PostModel, {Post} from '@/common/models/Post';
//mongoose
import { FilterQuery, QueryOptions } from 'mongoose';
//interfaces
import { mapPost } from '@/common/interfaces';
import { getPostsByTag } from '@/common/services/post.service';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const query: FilterQuery<Post> = {status: true};
    const options: QueryOptions = {
      sort: '-createdAt',
    };
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')
    if (q) {
      query.name = new RegExp('.*' + q + '.*', 'i');
    }
    options.skip = parseInt(searchParams.get('skip') as string) || 0;
    options.limit = parseInt(searchParams.get('limit') as string) || 48;
    const tag = searchParams.get('tag');
    if(tag){
      const items = await getPostsByTag(tag, options.skip);
      return NextResponse.json({data: items}, { status: 200 });
    }

    const list: Post[] = await PostModel.find(query, null, options)
      .populate('categories', ['name', 'slug', 'inRoot']).lean();
    const items = list.map((item) => {return mapPost(item)});
    return NextResponse.json({data: items}, { status: 200 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}