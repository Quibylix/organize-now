import ProgressBar from "@/features/ui/components/progress-bar/progress-bar.component";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-do App | Add, edit, and delete to-dos",
  description: "A simple to-do app built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
