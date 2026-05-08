export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface CreatedPost extends Post {
  id: number;
}
