import { ICardProps, PropertyCard } from "@/components/card";
import { properties } from "@/services/properties";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  const propertiesData = await properties.getMany();

  return (
    <main className="flex flex-col gap-4 items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {(propertiesData || []).length > 0 ? (
        propertiesData?.map((property: ICardProps) => (
          <PropertyCard
            key={property.id}
            description={property.description}
            imageUrl={property.imageUrl}
            location={property.location}
            price={property.price}
            title={property.title}
            id={property.id}
            isAvailable={property.isAvailable}
          />
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </main>
  );
}
