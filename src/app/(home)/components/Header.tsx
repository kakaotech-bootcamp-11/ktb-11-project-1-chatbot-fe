"use client";

import { Menu, SquarePen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import HeaderSidebar from "./HeaderSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Sheet>
      <SheetContent
        className="flex flex-col w-[260px] p-1 pt-4 h-full bg-ktb_navy text-white border-none"
        side="left"
      >
        <HeaderSidebar />
      </SheetContent>
      <SheetTrigger>
        <Menu className="cursor-pointer" />
      </SheetTrigger>
      <h1 className="text-xl font-bold">카테부 챗봇</h1>
      <SquarePen onClick={() => router.push("/")} className="cursor-pointer" />
    </Sheet>
  );
}
