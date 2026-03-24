export interface Chat {
  id: number;
  userId: number;
  message: string;
  response: string;
  createdAt: Date;
}

export interface ChatAdapter {
  // ✅ CREATE
  save(userId: number, message: string, response: string): Promise<Chat>;

  // ✅ GET ALL
  findAll(): Promise<Chat[]>;

  // ✅ GET BY USER
  findByUser(userId: number): Promise<Chat[]>;
}
