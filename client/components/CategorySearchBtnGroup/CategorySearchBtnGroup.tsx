import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/pages";
import classNames from "classnames";

import { fetchCategories } from "@/store/categories";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUser } from "@/store/users";
import { Loader } from "../Loader/Loader";

import styles from "./CategorySearchBtnGroup.module.css";

export const CategorySearchBtnGroup = ({
  onSelectedCategory,
}: {
  onSelectedCategory: (category: string) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useAppDispatch();
  const { data: categories, isLoading } = useAppSelector(
    (state) => state.categories.categoriesList
  );
  const user = useAppSelector((state) => state.user.user.data);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { id } = jwtDecode(token || "") as JwtPayload;
      dispatch(fetchUser(id));
    }
  }, []);

  useEffect(() => {
    const cookie = Cookies.get("access_token");
    if (cookie) {
      const { id } = jwtDecode(cookie || "") as JwtPayload;
      dispatch(fetchUser(id));
    }
  }, []);

  const selectCategory = (category: string) => {
    onSelectedCategory(category);
    setSelectedCategory(category);
  };

  if (isLoading) return <Loader />;

  return (
    <section className={styles.categories}>
      <h2 className={styles.heading}>Вашы катэгорыі</h2>
      <div className={styles.buttons}>
        {categories
          ?.filter((item) =>
            user?.categories.map((i) => i.name).includes(item.name)
          )
          .map(({ name }) => (
            <button
              className={classNames(
                styles.btn,
                selectedCategory === name && styles.btnActive
              )}
              key={name}
              onClick={() => selectCategory(name)}
            >
              <span>{name}</span>
            </button>
          ))}
      </div>
    </section>
  );
};
