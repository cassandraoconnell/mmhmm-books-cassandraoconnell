import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import BookInfo, { Book } from "../components/BookInfo";
import Button from "../components/Button";

const ENDPOINT = "https://us-central1-all-turtles-interview.cloudfunctions.net";
const AUTH_HEADER = { Authorization: "cassandraoconnell" };

const getBooks = async () => {
  const request = new Request(`${ENDPOINT}/books`, {
    method: "GET",
    headers: AUTH_HEADER,
  });

  const response = await fetch(request);
  const books = await response.json();

  return books;
};

const deleteBook = async (id: string) => {
  const request = new Request(`${ENDPOINT}/books/${id}`, {
    method: "DELETE",
    headers: AUTH_HEADER,
  });

  const response = await fetch(request);
  const books = await response.json();

  return books;
};

const Home: NextPage = () => {
  const [bookList, setBookList] = useState<Book[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!bookList) {
      const fetch = async () => {
        setIsLoading(true);

        const books = await getBooks();

        setBookList(books);
        setIsLoading(false);
      };

      fetch();
    }
  }, [bookList]);

  const onBookDelete = async (book: Book) => {
    const books = await deleteBook(book.id);
    setBookList(books);
  };

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
        {isLoading ? (
          <i>Loading...</i>
        ) : bookList && bookList.length > 0 ? (
          bookList.map((book) => (
            <BookInfo book={book} key={book.id} onBookDelete={onBookDelete} />
          ))
        ) : (
          <i>Bookshelf is empty. Try adding some books!</i>
        )}
      </main>
    </div>
  );
};

export default Home;
