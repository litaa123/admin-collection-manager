
export type Category = "video" | "audio" | "hadist";

export interface Collection {
  id: string;
  title: string;
  category: Category;
  link: string;
  summary: string;
  coverImage: string;
  speaker: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CollectionFormData = Omit<Collection, "id" | "createdAt" | "updatedAt">;
