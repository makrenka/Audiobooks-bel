"use client";
import { ChangeEvent, useState } from "react";

import styles from "./SearchPanel.module.css";

type SearchPanelProps = {
  onValueChange: (value: string) => void;
};

export const SearchPanel = ({ onValueChange }: SearchPanelProps) => {
  const [value, setValue] = useState("");

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onValueChange(value);
  };

  return (
    <form className={styles.searchPanel}>
      <label htmlFor="search" className={styles.label}>
        Шукаць
      </label>
      <input
        id="search"
        type="text"
        placeholder="Пошук кніг альбо аўтара..."
        className={styles.input}
        onChange={changeValue}
        value={value}
      />
    </form>
  );
};
