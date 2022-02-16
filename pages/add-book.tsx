import { useCallback, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const AddBook: NextPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  const onFormSubmit = useCallback(
    async (event) => {
      const request = new Request(
        "https://us-central1-all-turtles-interview.cloudfunctions.net/books",
        {
          method: "POST",
          headers: {
            Authorization: "cassandraoconnell",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            description,
            imageUrl,
          }),
        }
      );

      event.preventDefault();
      setIsAdding(true);
      await fetch(request);
      setIsAdding(false);
    },
    [author, description, imageUrl, title]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>mmhmm Bookshelf - Add Book</title>
        <meta name="description" content="Wow! I can add more books?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Add a new book</h1>
        <Link href="/" passHref>
          <button>Close</button>
        </Link>
      </header>

      <main>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
            value={author}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />

          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            onChange={(event) => setImageUrl(event.target.value)}
            value={imageUrl}
          />

          <button disabled={isAdding} type="submit">
            Save
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddBook;
