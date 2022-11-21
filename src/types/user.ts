export type UserConfig = {
  username: string;
  picture: string;
  baseline: number;
}

export type User = UserConfig &  {
  name: string;
  XP: number;
}
