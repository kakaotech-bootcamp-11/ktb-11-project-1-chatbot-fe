import { cookies } from "next/headers";
import "../globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const session = cookieStore.get("JSESSIONID")?.value as string;

  return (
    <div className="flex flex-col w-full h-screen gap-2 p-4 text-white md:flex-row bg-ktb_navy">
      <div className="top-0 flex flex-row items-center justify-between h-10 p-4 fix md:hidden">
        <Header />
      </div>
      <Sidebar session={session} />
      {children}
    </div>
  );
}
