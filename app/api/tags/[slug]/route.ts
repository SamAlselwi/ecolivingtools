import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import TagModel from '@/common/models/Tag';
//interfaces
import util from '@/common/util';
import { ERRORS } from '@/common/msg';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const slug = params.slug;
    const tag = await TagModel.findOne({slug: slug}).select('name slug description');
    if (tag) {
      return NextResponse.json({data: {
        title: tag.name, 
        description: tag.description,
        metaDescription: tag.metaDescription ? tag.metaDescription : null,
        slug: tag.slug
      }}, { status: 200 });
    }
    const error = util.getError(ERRORS.MismatchElement, request);
    return NextResponse.json(error, { status: 400 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}