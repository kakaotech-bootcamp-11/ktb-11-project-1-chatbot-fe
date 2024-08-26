import { cookies } from "next/headers";
import "../globals.css";
import Sidebar from "./components/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const session = cookieStore.get("JSESSIONID")?.value as string;

  return (
    <div className="flex flex-row h-screen w-full text-white bg-ktb_navy p-4 gap-2">
      <Sidebar session={session} />
      {children}
    </div>
  );
}
