import { categories } from "@/constants/categories";
import styles from "./PersonalizationForm.module.css";
import { useState } from "react";
import classNames from "classnames";
import { CategoryButton } from "../CategoryButton/CategoryButton";

export const PersonalizationForm = () => {
  const [genres, setGenres] = useState<string[]>([]);
  console.log(genres);

  const onClick = (name: string) => {
    if (!genres.length) {
      setGenres([name]);
    }
    if (genres.length && !genres.includes(name)) {
      setGenres([...genres, name]);
    }
    if (genres.length && genres.includes(name)) {
      setGenres(genres.filter((item) => item !== name));
    }
  };

  return (
    <form className={styles.persForm}>
      <input
        type="text"
        placeholder="Пошук жанраў"
        className={styles.searchInput}
      />
      <div className={styles.buttons}>
        {categories.map(({ name }) => (
          <CategoryButton name={name} onClick={onClick} key={name} />
        ))}
      </div>
      <div className={styles.topics}>{` жанраў выбрана`}</div>
      <button className={styles.submitBtn}>Адправіць</button>
      <button type="button" className={styles.skipBtn}>
        Адмяніць
      </button>
    </form>
  );
};
