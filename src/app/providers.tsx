"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider refetchOnWindowFocus={true} refetchInterval={60 * 5}>
      {children}
    </SessionProvider>
  );
};
