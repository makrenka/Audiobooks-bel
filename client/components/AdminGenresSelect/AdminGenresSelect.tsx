import { ChangeEventHandler, useEffect, useState } from "react";

import styles from "./AdminGenresSelect.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories } from "@/store/categories";

export const AdminGenresSelect = ({
  setGenres,
}: {
  setGenres: (genres: string[]) => void;
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categories.categoriesList.data
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const selectOnChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const arr = [...selectedGenre, e.target.value];
    const setArr = new Set(arr);
    const filteredArr = Array.from(setArr);
    setSelectedGenre(filteredArr);
    setGenres(filteredArr);
  };

  const deleteCategory = (item: string) => {
    setSelectedGenre(selectedGenre.filter((genre) => genre !== item));
    setGenres(selectedGenre.filter((genre) => genre !== item));
  };

  return (
    <div className={styles.genres}>
      <label className={styles.genresLabel}>
        Жанры:
        <div className={styles.selectedGenres}>
          {selectedGenre.map((item) => (
            <button
              key={item}
              className={styles.selectedGenresBtn}
              type="button"
            >
              {item}
              <img
                src="/icons/Close Square.svg"
                alt="delete category button"
                className={styles.selectedGenresCloseBtn}
                onClick={() => deleteCategory(item)}
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
