// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { PropertyCard } from "@/components/card";
import { gifts } from "@/services/gifts";
import { cookies } from "next/headers";

async function getGift({ params }: { params: { id: number } }) {
  const cookieStore = await cookies();
  if (cookieStore.get("token")) {
    const token = cookieStore.get("token")?.value;
    const giftsData = await gifts.getOne(+params.id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return giftsData;
  }
  return null;
}

export default async function GiftPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const gift = await getGift({ params: { id: +id } });

  if (!gift) {
    return <div>Gift not found</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <PropertyCard preview {...gift.property} />
      <div className="p-4 bg-gray-100 rounded-lg mt-4">
        <h1 className="text-3xl font-bold mb-4">Gift Details</h1>
        <div className="text-lg mb-2">
          <span className="font-semibold">Giver:</span> {gift.giver.firstname}{" "}
          {gift.giver.lastname}
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold">Receiver:</span>{" "}
          {gift.receiver
            ? `${gift.receiver.firstname} ${gift.receiver.lastname}`
            : "Not accepted yet"}
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold">Receiver Email:</span>{" "}
          {gift.receiverEmail}
        </div>
        <div className="text-lg">
          <span className="font-semibold">Accepted:</span>{" "}
          {gift.accepted ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
}
