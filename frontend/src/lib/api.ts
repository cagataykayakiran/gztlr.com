const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

export const api = {
  newspapers: {
    list: () => request<{ id: number; title: string; url: string }[]>('/newspaper'),
    get: (id: number) =>
      request<{ id: number; title: string; url: string }>(`/newspaper/${id}`),
  },

  auth: {
    login: (username: string, password: string) =>
      request<{ access_token: string; refresh_token: string; expires_in: number }>(
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        }
      ),
    register: (data: {
      name: string;
      lastname: string;
      username: string;
      password: string;
    }) =>
      request<{ access_token: string; refresh_token: string; expires_in: number }>(
        '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      ),
  },
};
