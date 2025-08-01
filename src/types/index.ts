export interface User {
  id: number;
  name: string;
  position: string;
  position_id: number;
  email: string;
  phone: string;
  photo: string;
  registration_timestamp: number;
}

export interface UsersApiResponse {
  success: boolean;
  total_pages: number;
  total_users: number;
  count: number;
  page: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  users: User[];
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File | null;
}

export interface PositionOption {
  id: string;
  label: string;
}
