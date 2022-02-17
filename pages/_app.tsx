import "../styles/globals.css";
import "material-icons/iconfont/material-icons.css";
import { BooksProvider } from "../store/Books";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BooksProvider>
      <Component {...pageProps} />
    </BooksProvider>
  );
}

export default MyApp;
