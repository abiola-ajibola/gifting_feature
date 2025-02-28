// import { useState } from "react";
import { Button } from "./ui/button";
import { DialogComponent } from "./ui/dialog";
// import { Input } from "./ui/input";
import { properties } from "@/services/properties";
import { ICardProps } from "./card";

export function Confirmation({
  receiverEmail,
  property,
  open,
  setOpen,
}: {
  receiverEmail: string;
  property: ICardProps;
  open: boolean;
  setOpen: (b: boolean) => void;
}) {
  const handleSubmit = async () => {
    await properties.giftListing({
      receiverEmail,
      giverId: JSON.parse(localStorage.getItem("user") || "{}").id,
      propertyId: property.id,
    });
    setOpen(false);
  };
  return (
    <DialogComponent
      description={`You are sending a gift to ${receiverEmail}, see details below:`}
      title="Are you sure?"
      open={open}
      setOpen={setOpen}
    >
      <div>
        <ul className="list-disc pl-5 space-y-2">
          {Object.entries(property).map(([key, value]) =>
            key !== "id" ? (
              <li key={key} className="flex">
                <strong className="mr-2 capitalize">{key}:</strong>
                <span>{value.toString()}</span>
              </li>
            ) : null
          )}
        </ul>
        <Button onClick={handleSubmit} className="cursor-pointer mt-4">
          Confirm Gift
        </Button>
      </div>
    </DialogComponent>
  );
}
