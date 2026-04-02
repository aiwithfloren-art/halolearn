// Shared in-memory store for codes and user access
// Note: resets on cold start - for production use Vercel KV or Supabase

export interface CodeEntry {
  code: string;
  role: string;
  email: string | null;
  expiresAt: string | null;
  used: boolean;
  createdAt: string;
}

export interface UserAccess {
  email: string;
  roles: string[];
  purchasedAt: string;
  expiresAt: string | null;
}

// Global stores
export const codesStore: CodeEntry[] = [];
export const userAccessStore: UserAccess[] = [];

export const ALL_ROLES = ['management-trainee', 'akuntansi', 'admin', 'human-resources', 'odp-bank'];
