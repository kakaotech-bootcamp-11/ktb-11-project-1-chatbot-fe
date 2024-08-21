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
    <div className="flex flex-row h-screen w-full text-white bg-ktb_navy p-4 gap-2">
      <Sidebar session={session} />
      {children}
    </div>
    // <div className="flex flex-col md:flex-row h-screen w-full text-white bg-ktb_navy p-4 gap-4">
    //   <div className="w-full md:w-1/4 lg:w-1/5">
    //     <Sidebar session={session} />
    //   </div>
    //   <div className="flex-1 w-full">{children}</div>
    // </div>
  );
}
