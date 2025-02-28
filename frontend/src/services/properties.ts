import { toast } from "react-toastify";
import { apiClient } from "./config";
import { ICardProps } from "@/components/card";

async function getMany() {
  try {
    const response = await apiClient.get<ICardProps[]>("properties");
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    if (typeof document !== "undefined") {
      toast.error("Failed to fetch properties");
    }
  }
}

async function giftListing({
  receiverEmail,
  giverId,
  propertyId,
}: {
  receiverEmail: string;
  giverId: number;
  propertyId: number;
}) {
  try {
    const response = await apiClient.post("gifts", {
      receiverEmail,
      giverId,
      propertyId,
    });
    if (typeof document !== "undefined") {
      toast.success("Gift sent successfully");
    }
    return response.data;
  } catch (error) {
    console.error("Error listing gift:", error);
    if (typeof document !== "undefined") {
      toast.error("Failed to list gift");
    }
  }
}

export const properties = { getMany, giftListing };
