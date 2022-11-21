export type UserConfig = {
  username: string;
  picture: string;
}

export type User = UserConfig &  {
  name: string;
  XP: number;
}
