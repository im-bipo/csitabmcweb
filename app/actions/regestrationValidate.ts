"use server";

import { Card } from "@/components/ui/card";

export const getAllRegistration = async () => {
  try {
    const response = await fetch(process.env.REGESTATION_DATA_API as string);
    const res = await response.json();
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error fetching registration data:", error);
    throw error;
  }
};

export const validateRegistration = async (name: string, email: string) => {
  try {
    const Data = await getAllRegistration();
    const user = Data.find(
      (item: any) =>
        item.Email.toUpperCase().trim() === email.toUpperCase().trim()
    );

    if (!user) {
      return {
        exists: false,
        nameMatch: false,
        paid: false,
        name: { status: false },
        payment: { status: false },
      };
    }

    const nameMatch =
      user["Full Name"].toUpperCase().trim() === name.toUpperCase().trim();
    const isPaid = user.Paid;

    return {
      exists: true,
      id: user.ID,
      card: user["Image ID"],
      nameMatch,
      paid: isPaid,
      name: { status: nameMatch },
      payment: { status: isPaid },
    };
  } catch (error) {
    console.error("Error validating registration:", error);
    throw error;
  }
};
