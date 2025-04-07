import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
//mongoose
import { FilterQuery, QueryOptions } from 'mongoose';
//models
import CategoryModel from '@/common/models/Category';
//interfaces
import { ICategory, mapCategory } from '@/common/interfaces';

export async function GET() {
  try {
    await dbConnect();
    const query: FilterQuery<ICategory> = {status: true};
    const options: QueryOptions = {
      sort: '-createdAt',
    };

    const list = await CategoryModel.find(query, null, options);

    const items = list.map((item) => {return mapCategory(item)});
    return NextResponse.json({data: items}, { status: 200 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}


// const list = await CategoryModel.aggregate([
//   {
//     $sort: { order: 1 }
//   },
//   {
//       $graphLookup: {
//           from: 'categories',
//           startWith: '$_id',
//           connectFromField: '_id',
//           connectToField: 'parentId',
//           as: 'children'
//       }
//   },
//   {
//       $match: {
//         parentId: null
//       }
//   }
// ]).exec();