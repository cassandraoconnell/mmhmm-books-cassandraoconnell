import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const AddBook: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>mmhmm Bookshelf - Add Book</title>
        <meta name="description" content="Wow! I can add more books?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>TODO - Add Book</main>
    </div>
  );
};

export default AddBook;
