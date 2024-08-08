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

  console.log(session);

  return (
    <div className="flex flex-row h-screen text-white bg-[#0E1E46] p-4 gap-2">
      <Sidebar session={session} />
      {children}
    </div>
  );
}
