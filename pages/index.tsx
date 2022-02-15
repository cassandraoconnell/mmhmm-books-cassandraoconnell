import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>mmhmm Bookshelf</title>
        <meta name="description" content="Look at all these books!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>TODO - Bookshelf</main>
    </div>
  );
};

export default Home;
