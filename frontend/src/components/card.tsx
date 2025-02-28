"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Confirmation } from "./confirmation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export interface ICardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  location: string;
  isAvailable: boolean;
}

export const PropertyCard: React.FC<ICardProps & { preview?: boolean }> = ({
  id,
  title,
  description,
  imageUrl,
  price,
  location,
  isAvailable,
  preview = false,
}) => {
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const handleCLick = async () => {
    // setOpen(true);
    setShowInput(true);
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg min-w-sm bg-gray-400">
      <Image
        width={400}
        height={300}
        src={imageUrl}
        alt={title}
        className="w-full bg-gray-800"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-900 font-semibold">{price}</p>
        <p className="text-gray-600">{location}</p>
        {!preview && (
          <>
            {showInput && (
              <div className="my-4">
                <Input
                  type="email"
                  placeholder="Enter email"
                  className="mb-4"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={() => {
                      setOpen(true);
                      setShowInput(false);
                    }}
                  >
                    Send Gift
                  </Button>
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={() => {
                      setShowInput(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {!showInput && (
              <div className="mt-4">
                <button
                  onClick={handleCLick}
                  className="cursor-pointer w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Gift Listing
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {!preview && (
        <Confirmation
          receiverEmail={email}
          property={{
            id,
            title,
            description,
            imageUrl,
            price,
            location,
            isAvailable,
          }}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};
