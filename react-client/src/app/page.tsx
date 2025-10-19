"use client"

import { Toaster } from "../components/ui/toaster";
import Navbar from "@/components/navbar";
import Body from "@/components/body";
import GlobalLoading from "@/components/loading";

export default function Home() {

  return (
    <>
      <Navbar />
      <Body />
      <GlobalLoading />
      <Toaster />
    </>
  );
}
