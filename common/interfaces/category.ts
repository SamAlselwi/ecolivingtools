
export interface ICategory {
  id: number;
  type: 'shop'|'blog';
  name: string;
  slug: string;
  path: string;
  image: string|null;
  items: number;
  parents?: ICategory[]|null;
  children?: ICategory[]|null;
  inRoot: boolean;
  metaDescription: string;
  metaTitle: string;
}

export interface PostCategory{
  _id?: string;
  id: string;
  name: string;
  slug: string;
  description?: string;
  inRoot: boolean;
}


export interface CategoryItem{
  id: string;
  name: string;
  slug: string;
  inRoot: boolean;
  // parentId: string|null;
  // children: CategoryItem[];
}

export const mapCategory = (category: any) =>{
  return {
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    inRoot: category.inRoot ? category.inRoot : false
    // parentId: category.parentId ?? null,
    // children: category.children ? category.children.map((child: any) => {return mapCategory(child)})  : []
  }
}
