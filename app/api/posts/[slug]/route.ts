import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import PostModel from '@/common/models/Post';
//interfaces
import { mapSinglePost } from '@/common/interfaces';
import util from '@/common/util';
import { ERRORS } from '@/common/msg';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const slug = params.slug;
    const post = await PostModel.findOne({slug: slug}).populate('categories', 'name slug inRoot').populate('tags', 'name', 'slug');
    if (post) {
      return NextResponse.json({data: mapSinglePost(post, true)}, { status: 200 });
    }
    const error = util.getError(ERRORS.MismatchElement, request);
    return NextResponse.json(error, { status: 400 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}