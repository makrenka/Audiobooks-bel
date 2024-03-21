import { useState } from "react";
import styles from "./CategoryButton.module.css";
import classNames from "classnames";

type CategoryButtonProps = {
  name: string;
  onClick: (name: string) => void;
};

export const CategoryButton = ({ name, onClick }: CategoryButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleColor = () => {
    onClick(name);
    setIsActive(!isActive);
  };

  return (
    <button
      type="button"
      className={classNames(styles.btn, isActive && styles.btnActive)}
      onClick={handleColor}
      key={name}
    >
      {name}
    </button>
  );
};
