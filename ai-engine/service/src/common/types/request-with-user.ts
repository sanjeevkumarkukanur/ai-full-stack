export interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
  };
}
