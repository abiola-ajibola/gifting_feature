import { ICardProps } from "@/components/card";
import { apiClient } from "./config";
import { toast } from "react-toastify";
import { AxiosRequestConfig } from "axios";
interface IPerson {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}
export interface Gift {
  id: number;
  accepted: boolean;
  receiverEmail: string;
  giverId: number;
  propertyId: number;
  giver: IPerson;
  receiver: null | IPerson;
  property: ICardProps;
}

async function getMany(config?: AxiosRequestConfig) {
  try {
    const response = await apiClient.get<Gift[]>("gifts", config);
    return response.data;
  } catch (error) {
    if (typeof document === "undefined") {
      console.error("Error fetching gifts:", error);
      return [];
    }
    console.error("Error fetching gifts:", error);
    if (typeof document !== "undefined") {
      toast.error("Failed to fetch gifts");
    }
    return [];
  }
}

async function getOne(giftId: number, config?: AxiosRequestConfig) {
  try {
    const response = await apiClient.get<Gift>(`gifts/${giftId}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching gift with id ${giftId}:`, error);
    if (typeof document !== "undefined") {
      toast.error("Failed to fetch gift");
    }
    return null;
  }
}

export const gifts = { getMany, getOne };
