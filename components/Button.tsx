import { forwardRef, ReactNode } from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isDisabled = false, onClick, type }: ButtonProps, ref) => {
    return (
      <button
        className={styles.button}
        disabled={isDisabled}
        onClick={onClick}
        ref={ref}
        type={type}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
