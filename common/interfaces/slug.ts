
//client interface
export interface ISlug {
  id: string;
  slug: string;
  referenceId: string;
  referenceType: string;
  prefix: string;
  updatedAt: Date;
  createdAt: Date;
}