
export interface ITag {
  id: number;
  name: string;
  slug: string;
  description: string;
  metaDescription: string;
  metaTitle: string;
}

export interface PostTag{
  _id?: string;
  id: string;
  name: string;
  slug: string;
  description: string;
}