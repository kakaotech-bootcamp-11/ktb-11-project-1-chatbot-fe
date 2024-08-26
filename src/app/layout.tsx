import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProviders from "./components/ReactQueryProvider";
import { Inter, Nanum_Gothic } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const ng = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "카테부 챗봇",
  description: "카카오 부트캠프 챗봇입니다. 무엇이든 물어보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProviders>{children}</ReactQueryProviders>
        <Toaster position="top-right" closeButton richColors />
      </body>
    </html>
  );
}
