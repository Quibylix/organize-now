import { getLanguage } from "@/features/i18n/services/get-language.service";
import { getTranslation } from "@/features/i18n/services/get-translation.service";
import ProgressBar from "@/features/ui/components/progress-bar/progress-bar.component";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async (): Promise<Metadata> => {
  const dictionary = await getTranslation();

  return {
    title: dictionary.title,
    description: dictionary.description,
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={getLanguage()}>
      <body className={inter.className}>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
