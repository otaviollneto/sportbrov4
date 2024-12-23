import { create } from "zustand";
import CryptoJS from "crypto-js";

// Chave secreta (salve no .env e não exponha no código!)
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "default_secret_key";

// Interface do Zustand
interface AuthState {
  user: any | null;
  token: string | null;
  login: (user: any) => void;
  logout: () => void;
}

// Função para criptografar dados
const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Função para descriptografar dados
const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Estado global Zustand
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  // Login: salva token criptografado no localStorage
  login: (user) => {
    const encryptedToken = encryptData(user.token);
    const encryptedUser = encryptData(JSON.stringify(user)); // Criptografa o token
    localStorage.setItem("user", encryptedUser); // Salva usuário
    localStorage.setItem("token", encryptedToken); // Salva token criptografado

    set({ user, token: user.token });
  },

  // Logout: remove dados do localStorage
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
