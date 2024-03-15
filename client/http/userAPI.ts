import { AxiosResponse } from "axios";
import { $authhost, $host } from ".";
import { AuthResponse } from "@/store/auth/types";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const login = async (email: string, password: string) => {
  const { data }: AxiosResponse<AuthResponse> = await $host.post(
    `${process.env.APP_API_URL}auth/login`,
    {
      email,
      password,
    }
  );
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const registration = async (email: string, password: string) => {
  const { data }: AxiosResponse<AuthResponse> = await $host.post(
    `${process.env.APP_API_URL}auth/registration`,
    {
      email,
      password,
      roles: ["USER"],
    }
  );
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async (id: string) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<JwtPayload>(token);
  if (decodedToken.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
  }
  const { data } = await $authhost.get(`${process.env.APP_API_URL}users/${id}`);
};
