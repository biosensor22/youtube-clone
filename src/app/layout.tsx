import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header";
import { SideMenu } from "@/widgets/side-menu/ui";
import { StoreProvider } from "./providers/StoreProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Youtube",
  description: "Youtube clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} @container antialiased`}>
        <div>
          <StoreProvider>
            <SideMenu />
            <Header />

            <main>{children}</main>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
