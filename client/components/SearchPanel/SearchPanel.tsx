import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

import styles from "./SearchPanel.module.css";

type SearchPanelProps = {
  onValueChange: (value: string) => void;
};

export const SearchPanel = ({ onValueChange }: SearchPanelProps) => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onValueChange(value);
  };

  return (
    <form className={styles.searchPanel}>
      <label htmlFor="search" className={styles.label}>
        {router.pathname.includes("/search") ? "Шукаць" : "Вашы кнігі"}
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
