import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { api } from "~/utils/api";

import "~/styles/globals.css";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <NextUIProvider>
      <NextThemesProvider  attribute="class" defaultTheme="dark">
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </NextThemesProvider>
    </NextUIProvider>

  );
};

export default api.withTRPC(MyApp);
