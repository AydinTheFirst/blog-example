import { API_URL } from "@/config";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getFileUrl = (filename?: string) => {
  if (!filename) return "/placeholder.jpg";
  return API_URL + "/files/" + encodeURIComponent(filename);
};
