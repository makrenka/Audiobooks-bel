import { ChangeEventHandler, useEffect, useState } from "react";

import styles from "./AdminGenresSelect.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories } from "@/store/categories";

export const AdminGenresSelect = () => {
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categories.categoriesList.data
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const selectOnChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedGenre([...selectedGenre, e.target.value]);
  };

  return (
    <div className={styles.genres}>
      <label className={styles.genresLabel}>
        Жанры:
        <div className={styles.selectedGenres}>
          {selectedGenre.map((item) => (
            <button key={item} className={styles.selectedGenresBtn}>
              {item}
              <img
                src="/icons/delete-category-btn.svg"
                alt="delete category button"
                className={styles.selectedGenresCloseBtn}
              />
            </button>
          ))}
        </div>
        <select
          name="genres"
          className={styles.genresSelect}
          onChange={selectOnChange}
        >
          <option value="" className={styles.genresOption}>
            Абярыце жанры
          </option>
          {categories?.map((item) => (
            <option
              value={item.name}
              key={item._id}
              className={styles.genresOption}
            >
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
