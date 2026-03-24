export interface VectorAdapter {
  add(content: string, embedding: number[]): Promise<void>;

  search(embedding: number[], topK?: number): Promise<string[]>;

  findAll(): Promise<
    {
      id: number;
      content: string;
      embedding: any;
      createdAt: Date;
    }[]
  >;
}
