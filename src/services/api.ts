import { UsersApiResponse, User } from '../types';

const API_BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

// Error types for better error handling
interface ApiError {
  success: false;
  message: string;
  fails?: Record<string, string[]>;
}

interface UserByIdResponse {
  success: boolean;
  user: User;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData: ApiError;
      try {
        errorData = await response.json();
      } catch {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  async fetchUsers(page: number = 1, count: number = 6): Promise<UsersApiResponse> {
    // Validate parameters according to API spec
    if (page < 1) {
      throw new Error('Page must be at least 1');
    }
    if (count < 1 || count > 100) {
      throw new Error('Count must be between 1 and 100');
    }

    try {
      const url = new URL(`${this.baseUrl}/users`);
      url.searchParams.set('page', page.toString());
      url.searchParams.set('count', count.toString());

      const response = await fetch(url.toString(), {
        method: 'GET',
      });

      return await this.handleResponse<UsersApiResponse>(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async fetchUserById(id: number): Promise<User> {
    if (id < 1) {
      throw new Error('User ID must be at least 1');
    }

    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`, {
        method: 'GET',
      });

      const data = await this.handleResponse<UserByIdResponse>(response);
      return data.user;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  async fetchPositions(): Promise<{ id: number; name: string }[]> {
    try {
      const response = await fetch(`${this.baseUrl}/positions`, {
        method: 'GET',
      });

      const data = await this.handleResponse<{ success: boolean; positions: { id: number; name: string }[] }>(response);
      return data.positions;
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw error;
    }
  }

  async getToken(): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/token`, {
        method: 'POST',
      });

      const data = await this.handleResponse<{ success: boolean; token: string }>(response);
      return data.token;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error;
    }
  }

  async registerUser(userData: {
    name: string;
    email: string;
    phone: string;
    position_id: number;
    photo: File;
  }): Promise<{ success: boolean; user_id: number; message: string }> {
    try {
      // First get a token
      const token = await this.getToken();

      // Create form data for multipart/form-data
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);
      formData.append('position_id', userData.position_id.toString());
      formData.append('photo', userData.photo);

      const response = await fetch(`${this.baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Token': token,
        },
        body: formData,
      });

      return await this.handleResponse<{ success: boolean; user_id: number; message: string }>(response);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
}

// Create and export the API service instance
const apiService = new ApiService(API_BASE_URL);

// Export individual methods for backward compatibility
export const fetchUsers = apiService.fetchUsers.bind(apiService);
export const fetchUserById = apiService.fetchUserById.bind(apiService);
export const fetchPositions = apiService.fetchPositions.bind(apiService);
export const getToken = apiService.getToken.bind(apiService);
export const registerUser = apiService.registerUser.bind(apiService);

// Export the service instance for advanced usage
export default apiService;
