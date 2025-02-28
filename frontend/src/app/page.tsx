// "use client";

import { ICardProps, PropertyCard } from "@/components/card";
import { properties } from "@/services/properties";

export default async function Home() {
  const propertiesData = await properties.getMany();
  console.log({ propertiesData });

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
