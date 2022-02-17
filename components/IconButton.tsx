import { forwardRef, ReactNode } from "react";
import styles from "../styles/IconButton.module.css";

interface IconButtonProps {
  glyph: string;
  onClick?: () => void;
  title: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ glyph, onClick, title }: IconButtonProps, ref) => {
    return (
      <span
        className={`${styles.button} material-icons`}
        onClick={onClick}
        role="button"
        title={title}
      >
        {glyph}
      </span>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
