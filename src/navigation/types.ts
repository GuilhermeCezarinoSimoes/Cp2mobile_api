
export type RootStackParamList = {
  Home: undefined;
  UsersFetch: undefined;
  Users: undefined;
  UserDetails: { userId: number };
  UserPosts: { userId: number; userName: string };
  Posts: undefined;
  CreatePost: undefined;
  ErrorTest: undefined;
};
