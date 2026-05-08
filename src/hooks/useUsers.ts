import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { User } from '../types/user';


export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        return await userService.getAll();
      } catch (error) {
        // Tenta retornar cache offline em caso de falha de rede
        const cached = await userService.getCachedUsers();
        if (cached) return cached;
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

/**
 * Custom Hook para um único usuário por ID.
 * Exercício 6: UserDetailsScreen.
 */
export function useUser(userId: number) {
  return useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: async () => {
      try {
        return await userService.getById(userId);
      } catch (error) {
        const cached = await userService.getCachedUser(userId);
        if (cached) return cached;
        throw error;
      }
    },
    enabled: userId > 0, // Só busca se o ID for válido
    staleTime: 1000 * 60 * 5,
  });
}
