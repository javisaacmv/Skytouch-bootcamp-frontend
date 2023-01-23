import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { HeaderMenuColored } from "@/components/Header";

const links = [
  { link: "/", label: "Home" },
  { link: "/create", label: "Create" },
];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <HeaderMenuColored links={links} />

      <Component {...pageProps} />
    </MantineProvider>
  );
}
