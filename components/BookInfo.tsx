import { useCallback, useState } from "react";

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
    <div>
      <img src={book.imageUrl} alt={`Cover image for ${book.title}`} />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      <button disabled={isDeleting} onClick={onBookDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export type { Book };
export default BookInfo;
