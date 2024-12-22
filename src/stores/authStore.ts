import { create } from "zustand";
import CryptoJS from "crypto-js";

const SECRET_KEY = "my-secret-key"; // Substitua por uma chave segura

interface User {
  id: string;
  nome: string;
  img: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
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

// Função para armazenar dados criptografados no LocalStorage
const saveEncryptedData = (key: string, data: any) => {
  const encrypted = encryptData(JSON.stringify(data));
  localStorage.setItem(key, encrypted);
};

// Função para recuperar dados criptografados do LocalStorage
const getEncryptedData = (key: string) => {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;

  const decrypted = decryptData(encrypted);
  return JSON.parse(decrypted);
};

// Zustand Store
export const useAuthStore = create<AuthState>((set) => ({
  user: getEncryptedData("user"), // Recupera usuário armazenado
  isAuthenticated: !!getEncryptedData("user"), // Verifica se está autenticado

  login: (user: User) => {
    saveEncryptedData("user", user);
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },
}));
