import { create } from "zustand";
import CryptoJS from "crypto-js";

// Chave secreta (deve ser armazenada em variável de ambiente no .env)
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "default_secret_key";

// Interface do Zustand
interface AuthState {
  user: { id: string; name: string; email: string; img?: string } | null;
  token: string | null;
  login: (user: {
    id: string;
    name: string;
    email: string;
    token: string;
  }) => void;
  logout: () => void;
  loadStoredAuth: () => void; // Nova função para carregar dados salvos
}

// Função para criptografar dados
const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Função para descriptografar dados
const decryptData = (encryptedData: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error("Erro ao descriptografar:", err);
    return null;
  }
};

// Estado global Zustand
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  // Login: salva token criptografado no localStorage
  login: (user) => {
    const encryptedToken = encryptData(user.token);
    const encryptedUser = encryptData(JSON.stringify(user)); // Criptografa o usuário

    // Armazena criptografado no localStorage
    localStorage.setItem("user", encryptedUser);
    localStorage.setItem("token", encryptedToken);

    set({ user, token: user.token });
  },

  // Logout: remove dados do localStorage
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  // Carrega dados salvos no localStorage (se disponíveis)
  loadStoredAuth: () => {
    try {
      const encryptedUser = localStorage.getItem("user");
      const encryptedToken = localStorage.getItem("token");

      if (encryptedUser && encryptedToken) {
        const decryptedUser = JSON.parse(decryptData(encryptedUser) || "{}");
        const decryptedToken = decryptData(encryptedToken);

        if (decryptedUser && decryptedToken) {
          set({ user: decryptedUser, token: decryptedToken });
        }
      }
    } catch (err) {
      console.error("Erro ao carregar autenticação armazenada:", err);
    }
  },
}));
