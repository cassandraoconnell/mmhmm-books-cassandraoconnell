import { useCallback, useState } from "react";
import IconButton from "./IconButton";
import styles from "../styles/BookInfo.module.css";
import { Book, useBooks } from "../store/Books";

interface BookInfoProps {
  book: Book;
}

const BookInfo = ({ book }: BookInfoProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const books = useBooks();

  const onBookDeleteClick = useCallback(() => {
    setIsDeleting(true);
    books.remove(book.id);
  }, [book.id, books]);

  return (
    <div className={styles.container}>
      <img alt="Cover image" className={styles.image} src={book.imageUrl} />
      <div className={styles.text}>
        <h1>{book.title || <i>Missing title</i>}</h1>
        <h2>{book.author || <i>Missing author</i>}</h2>
        <p>{book.description || <i>Missing description</i>}</p>
      </div>
      <div className={styles.delete}>
        {isDeleting ? (
          <i>Deleting...</i>
        ) : (
          <IconButton
            glyph="delete_outline"
            onClick={onBookDeleteClick}
            title="Delete Book"
          />
        )}
      </div>
    </div>
  );
};

export default BookInfo;
