import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const jwtAuthHeader = (token: string | undefined) => {
  return { Authorization: `Bearer ${token || ""}`, }
};

export const apiUrl = (path: string) => {
  return `${process.env.API_BASE_URL}${path}`;
}

export const ociApiUrl = (path: string) => {
  return `${process.env.OCI_API_BASE_URL}${path}`;
}
