"use client";

import "./globals.css";
import { Lato } from "next/font/google";
import { NextAuthProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const lato = Lato({ weight: ["100", "300", "400", "700"], subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={lato.className}>
        <QueryClientProvider client={queryClient}>
          <NextAuthProvider>{children}</NextAuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
