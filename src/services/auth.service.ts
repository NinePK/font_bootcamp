
import axios from './axios';
import type { User } from '@/types/user';

type LoginPayload = { sid: string; password: string };
type LoginResponse = { accessToken: string; user: User };
type RefreshResponse = { accessToken: string };

/** POST /auth/login */
export const login = async (
  sid: string,
  password: string,
): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>('/auth/login', {
    sid,
    password,
  } satisfies LoginPayload);
  return data;
};

/** GET /auth/me — ตรวจ token / ดึง profile */
export const me = async (): Promise<User> => {
  const { data } = await axios.get<User>('/auth/me');
  return data;
};



/** POST /auth/refresh — รับ access token ใหม่ (refresh token ส่งผ่าน cookie) */
export const refresh = async (): Promise<RefreshResponse> => {
  const { data } = await axios.post<RefreshResponse>('/auth/refresh');
  return data;
};
