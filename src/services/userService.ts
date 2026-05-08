import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const CACHE_KEYS = {
  USERS: '@cp2:users',
  USER: (id: number) => `@cp2:user_${id}`,
} as const;


export const userService = {
  
  async getAll(): Promise<User[]> {
    const { data } = await api.get<User[]>('/users');

    await AsyncStorage.setItem(CACHE_KEYS.USERS, JSON.stringify(data));

    return data;
  },

  
  async getById(id: number): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);

    await AsyncStorage.setItem(CACHE_KEYS.USER(id), JSON.stringify(data));

    return data;
  },

 
  async getCachedUsers(): Promise<User[] | null> {
    const cached = await AsyncStorage.getItem(CACHE_KEYS.USERS);
    return cached ? (JSON.parse(cached) as User[]) : null;
  },

  
  async getCachedUser(id: number): Promise<User | null> {
    const cached = await AsyncStorage.getItem(CACHE_KEYS.USER(id));
    return cached ? (JSON.parse(cached) as User) : null;
  },
};
