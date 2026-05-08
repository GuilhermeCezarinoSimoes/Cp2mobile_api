import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post, CreatePostPayload, CreatedPost } from '../types/post';

/** Chaves para cache no AsyncStorage */
const CACHE_KEYS = {
  POSTS: '@cp2:posts',
  USER_POSTS: (userId: number) => `@cp2:posts_user_${userId}`,
} as const;


export const postService = {
  
  async getAll(): Promise<Post[]> {
    const { data } = await api.get<Post[]>('/posts');

    await AsyncStorage.setItem(CACHE_KEYS.POSTS, JSON.stringify(data));

    return data;
  },

  
  async getByUserId(userId: number): Promise<Post[]> {
    const { data } = await api.get<Post[]>('/posts', {
      params: { userId },
    });

    await AsyncStorage.setItem(CACHE_KEYS.USER_POSTS(userId), JSON.stringify(data));

    return data;
  },


  async create(payload: CreatePostPayload): Promise<CreatedPost> {
    const { data } = await api.post<CreatedPost>('/posts', payload);
    return data;
  },

  
  async getCachedPosts(): Promise<Post[] | null> {
    const cached = await AsyncStorage.getItem(CACHE_KEYS.POSTS);
    return cached ? (JSON.parse(cached) as Post[]) : null;
  },

  
  async getCachedUserPosts(userId: number): Promise<Post[] | null> {
    const cached = await AsyncStorage.getItem(CACHE_KEYS.USER_POSTS(userId));
    return cached ? (JSON.parse(cached) as Post[]) : null;
  },
};
