"use client"

import { Toaster } from "../components/ui/toaster";
import HotelsList from "../components/hotelsList";
import Navbar from "@/components/navbar";

export default function Home() {

  return (
    <>
      <Navbar />
      <HotelsList />
      <Toaster />
    </>
  );
}
