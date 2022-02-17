import { useCallback, useState } from "react";
import IconButton from "./IconButton";
import styles from "../styles/BookInfo.module.css";

interface Book {
  id: string;
  description: string;
  imageUrl: string;
  author: string;
  title: string;
}

interface BookInfoProps {
  book: Book;
  onBookDelete: (book: Book) => void;
}

const BookInfo = ({ book, onBookDelete }: BookInfoProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onBookDeleteClick = useCallback(() => {
    setIsDeleting(true);
    onBookDelete(book);
  }, [book, onBookDelete]);

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

export type { Book };
export default BookInfo;
