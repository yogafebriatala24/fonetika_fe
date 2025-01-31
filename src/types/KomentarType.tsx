import { UserType } from "./UserType";

export interface KomentarType {
  id: number;
  artikel_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  parent_id: number;
  jumlah_like: number;
  child: KomentarType[];
  user: UserType;
}

export interface FollowerType {
  total_followers: number;
}
