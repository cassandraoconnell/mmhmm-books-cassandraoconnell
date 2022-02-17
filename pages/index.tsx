import { useCallback, useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import BookInfo from "../components/BookInfo";
import Button from "../components/Button";
import { useBooks } from "../store/Books";

const Home: NextPage = () => {
  const books = useBooks();

  return (
    <div className="container">
      <Head>
        <title>mmhmm Bookshelf</title>
        <meta name="description" content="Look at all these books!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Bookshelf</h1>
        <Link href="/add-book" passHref>
          <Button>Add Book</Button>
        </Link>
      </header>

      <main>
        {books.list ? (
          books.list.length > 0 ? (
            books.list.map((book) => <BookInfo book={book} key={book.id} />)
          ) : (
            <i>Bookshelf is empty. Try adding some books!</i>
          )
        ) : (
          <i>Loading...</i>
        )}
      </main>
    </div>
  );
};

export default Home;
