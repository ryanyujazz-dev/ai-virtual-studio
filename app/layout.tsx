import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { LanguageProviderWrapper } from "../components/LanguageProviderWrapper";
import { Language } from "../store/languageStore";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI 虚拟片场",
  description: "AI驱动的视频创作平台",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read language preference from cookie on server side
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get('preferred-language');
  let initialLanguage: Language = 'zh'; // Default to Chinese

  // Parse the language from cookie if available
  if (languageCookie?.value && (languageCookie.value === 'en' || languageCookie.value === 'zh')) {
    initialLanguage = languageCookie.value as Language;
  }

  return (
    <html lang={initialLanguage} className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white`}>
        <LanguageProviderWrapper initialLanguage={initialLanguage}>
          {children}
        </LanguageProviderWrapper>
      </body>
    </html>
  );
}
