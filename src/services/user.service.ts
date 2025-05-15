import axios from './axios';
import type { User } from '@/types/user';

export const userService = {
  async getProfile(): Promise<User> {
    const res = await axios.get('/users/me');
    return res.data;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const res = await axios.put('/users/me', data);
    return res.data;
  },
};
