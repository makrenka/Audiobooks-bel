import { useState } from "react";
import classNames from "classnames";

import styles from "./CategoryButton.module.css";

type CategoryButtonProps = {
  categoryName: string;
  genres: string[];
  onClick: (name: string) => void;
};

export const CategoryButton = ({
  categoryName,
  genres,
  onClick,
}: CategoryButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const filteredGenre = genres.filter((i) => i === categoryName);

  const handleColor = () => {
    onClick(categoryName);
    if (filteredGenre.length) {
      setIsActive(false);
    } else {
      setIsActive(!isActive);
    }
  };

  return (
    <button
      type="button"
      className={classNames(
        styles.btn,
        (isActive || filteredGenre.length) && styles.btnActive
      )}
      onClick={handleColor}
      key={categoryName}
    >
      {categoryName}
    </button>
  );
};
