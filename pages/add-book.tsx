import { useCallback, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import TextInput from "../components/TextInput";

const AddBook: NextPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  const router = useRouter();
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
      router.push("/");
    },
    [author, description, imageUrl, router, title]
  );

  return (
    <div className="container">
      <Head>
        <title>mmhmm Bookshelf - Add Book</title>
        <meta name="description" content="Wow! I can add more books?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Add a new book</h1>
        <Link href="/" passHref>
          <IconButton glyph="close" title="Close" />
        </Link>
      </header>

      <main>
        <form onSubmit={onFormSubmit}>
          <TextInput
            label="Title"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />

          <TextInput
            label="Author"
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
            value={author}
          />

          <TextInput
            isMultiLine
            label="Description"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />

          <TextInput
            label="Image URL"
            name="imageUrl"
            onChange={(event) => setImageUrl(event.target.value)}
            value={imageUrl}
          />

          <Button isDisabled={isAdding} type="submit">
            Save
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddBook;
