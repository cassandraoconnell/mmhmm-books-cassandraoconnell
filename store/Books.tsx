import {
  createContext,
  ReactChild,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface BookData {
  description: string;
  imageUrl: string;
  author: string;
  title: string;
}

interface Book extends BookData {
  id: string;
}

const BooksContext = createContext<{
  list?: Book[];
  add: (data: BookData) => void;
  remove: (id: string) => void;
}>({
  // Kinda hacky, but ensures we don't have to optional chain
  // these function calls in context.
  add: () => {},
  remove: () => {},
});

const useBooks = () => {
  return useContext(BooksContext);
};

class BooksApi {
  readonly headers: { [name: string]: string };
  readonly resource: string;

  constructor() {
    this.headers = { Authorization: "cassandraoconnell" };
    this.resource =
      "https://us-central1-all-turtles-interview.cloudfunctions.net/books";
  }

  async add(data: BookData): Promise<Book[]> {
    const request = new Request(this.resource, {
      body: JSON.stringify(data),
      headers: { ...this.headers, "Content-Type": "application/json" },
      method: "POST",
    });

    const response = await fetch(request);
    const books = await response.json();

    return books;
  }

  async get(): Promise<Book[]> {
    const request = new Request(this.resource, {
      headers: this.headers,
      method: "GET",
    });

    const response = await fetch(request);
    const books = await response.json();

    return books;
  }

  async remove(id: string): Promise<Book[]> {
    const request = new Request(this.resource + "/" + id, {
      headers: this.headers,
      method: "DELETE",
    });

    const response = await fetch(request);
    const books = await response.json();

    return books;
  }
}

const BooksProvider = ({ children }: { children: ReactChild }) => {
  const api = useMemo(() => new BooksApi(), []);

  const [list, setList] = useState<Book[]>();

  const get = useCallback(async () => {
    setList(await api.get());
  }, [api]);

  const add = useCallback(
    async (data) => {
      setList(await api.add(data));
    },
    [api]
  );

  const remove = useCallback(
    async (id: string) => {
      setList(await api.remove(id));
    },
    [api]
  );

  useEffect(() => {
    get();
  }, [get]);

  return (
    <BooksContext.Provider
      value={{
        list,
        add,
        remove,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export type { Book };
export { BooksProvider, useBooks };
