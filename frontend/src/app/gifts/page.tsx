import { gifts } from "@/services/gifts";
import { cookies } from "next/headers";
import Link from "next/link";

async function getGifts() {
  const cookieStore = await cookies();
  if (cookieStore.get("token")) {
    const token = cookieStore.get("token")?.value;
    const giftsData = await gifts.getMany({
      headers: { Authorization: `Bearer ${token}` },
    });
    return giftsData;
  }
  return [];
}

export default async function Gifts() {
  const giftsList = await getGifts();
  console.log({ giftsList });
  return (
    <div>
      <h1>Gifts</h1>
      <ul className="list-disc pl-5">
        {giftsList.map((gift) => (
          <Link
            href={`/gifts/${gift.id}`}
            key={gift.id}
            className="block p-4 mb-4 border rounded shadow-sm"
          >
            <h2 className="text-lg font-semibold">
              {gift.receiverEmail ? gift.receiverEmail : "No receiver"}
            </h2>
            <p className={gift.accepted ? "text-green-500" : "text-yellow-500"}>
              {gift.accepted ? "Accepted" : "Pending"}
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
