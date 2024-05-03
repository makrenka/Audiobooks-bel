import { ChangeEventHandler, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSections } from "@/store/sections";
import { Loader } from "../Loader/Loader";

import styles from "../AdminGenresSelect/AdminGenresSelect.module.css";

export const AdminSectionsSelect = ({
  setSections,
}: {
  setSections: (section: string[]) => void;
}) => {
  const [selectedSection, setSelectedSection] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { data: sections, isLoading } = useAppSelector(
    (state) => state.sections.sectionsList
  );

  useEffect(() => {
    dispatch(fetchSections());
  }, []);

  const selectOnChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const arr = [...selectedSection, e.target.value];
    const setArr = new Set(arr);
    const filteredArr = Array.from(setArr);
    setSelectedSection(filteredArr);
    setSections(filteredArr);
  };

  const deleteSection = (item: string) => {
    setSelectedSection(selectedSection.filter((section) => section !== item));
    setSections(selectedSection.filter((section) => section !== item));
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.genres}>
      <label className={styles.genresLabel}>
        Сэкцыі:
        <div className={styles.selectedGenres}>
          {selectedSection.map((item) => (
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
                onClick={() => deleteSection(item)}
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
            Абярыце сэкцыі
          </option>
          {sections?.map((item) => (
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
