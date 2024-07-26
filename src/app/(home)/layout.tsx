import "../globals.css";
import Sidebar from "./components/Sidebar";

type Props = {
  params: { chatId: string };
  children: React.ReactNode;
};

export default function HomeLayout({ children, params }: Props) {
  return (
    <div className="flex flex-row h-screen text-white bg-[#0E1E46] p-4">
      <Sidebar />
      {children}
    </div>
  );
}
