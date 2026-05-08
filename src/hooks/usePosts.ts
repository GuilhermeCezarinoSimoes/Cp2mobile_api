import { useQuery } from '@tanstack/react-query';
import { postService } from '../services/postService';
import { Post } from '../types/post';


export function usePosts() {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const all = await postService.getAll();
        return all.slice(0, 20); // PostsScreen exibe os 20 primeiros
      } catch (error) {
        const cached = await postService.getCachedPosts();
        if (cached) return cached.slice(0, 20);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Custom Hook para posts de um usuário específico.
 * Exercício 6: UserPostsScreen.
 */
export function useUserPosts(userId: number) {
  return useQuery<Post[], Error>({
    queryKey: ['posts', 'user', userId],
    queryFn: async () => {
      try {
        return await postService.getByUserId(userId);
      } catch (error) {
        const cached = await postService.getCachedUserPosts(userId);
        if (cached) return cached;
        throw error;
      }
    },
    enabled: userId > 0,
    staleTime: 1000 * 60 * 5,
  });
}
