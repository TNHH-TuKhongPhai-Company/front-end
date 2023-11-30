import "@/styles/global.css";
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps, session }: { Component: any, pageProps: any, session: any}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

