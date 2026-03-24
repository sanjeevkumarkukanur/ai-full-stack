export interface UserAdapter {
  create(
    email: string,
    password: string,
  ): Promise<{
    id: number;
    email: string;
    password: string;
    createdAt: Date;
  }>;

  findByEmail(email: string): Promise<{
    id: number;
    email: string;
    password: string;
    createdAt: Date;
  } | null>;

  findById(id: number): Promise<{
    id: number;
    email: string;
    password: string;
    createdAt: Date;
  } | null>;
}
