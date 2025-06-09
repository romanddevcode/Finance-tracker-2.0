export interface AuthContextValue {
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  register: (email: string, pass: string) => Promise<void>;
}
