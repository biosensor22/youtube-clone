import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header";
import { SideMenu } from "@/widgets/side-menu/ui";
import { StoreProvider } from "./providers/StoreProvider";
import { NotificationProvider } from "@/widgets/header/ui/notifications/ui/NotificationContext";
import { CreateBtnProvider } from "@/widgets/header/ui/create-btn/ui/CreateBtnContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YouTube",
  description: "YouTube clone",
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
            <CreateBtnProvider>
              <NotificationProvider>
                <SideMenu />
                <Header />
                <main>{children}</main>
              </NotificationProvider>
            </CreateBtnProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
