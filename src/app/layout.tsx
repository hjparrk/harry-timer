import type { Metadata } from "next";
import { Ubuntu_Sans, Ubuntu_Sans_Mono, Michroma } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import Header from "@/components/global/header";

const ubuntuSans = Ubuntu_Sans({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Sans_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "Pomodoro Timer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ubuntuSans.variable} ${ubuntuMono.variable} ${michroma.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
