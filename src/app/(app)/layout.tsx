import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECommerce App",
  description: "Full stack project built with Next.js, TypeScript, and Tailwind CSS/shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${dmSans.className} antialiased`}>
        <NuqsAdapter>
          <TRPCProvider>
            {children}
            <Toaster />
          </TRPCProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
