// pages/_app.tsx
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme"; // Adjust the path based on your project structure
import Head from "next/head";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppCacheProvider>
      <Head>
        <title>Handball APP</title>
      </Head>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppRouterCacheProvider>
    </AppCacheProvider>
  );
}
