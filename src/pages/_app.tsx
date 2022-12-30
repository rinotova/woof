import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import PageLayout from "../components/PageLayout/PageLayout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
      <ReactQueryDevtools />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
