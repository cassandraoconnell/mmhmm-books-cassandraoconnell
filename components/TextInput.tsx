import { ChangeEvent } from "react";
import styles from "../styles/TextInput.module.css";

interface TextInputProps {
  isMultiLine?: boolean;
  label: string;
  name: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
}

const TextInput = ({
  isMultiLine = false,
  label,
  name,
  onChange,
  value,
}: TextInputProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {isMultiLine ? (
        <textarea
          className={styles.textarea}
          id={name}
          name={name}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          className={styles.input}
          type="text"
          id={name}
          name={name}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};

export default TextInput;
