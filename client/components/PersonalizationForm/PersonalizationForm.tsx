import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { categories } from "@/constants/categories";
import { JwtPayload } from "@/pages/settings";
import { addCategoryUser, fetchUser } from "@/store/users";
import { CategoryButton } from "../CategoryButton/CategoryButton";

import styles from "./PersonalizationForm.module.css";
import { fetchCategories } from "@/store/categories";
import { highlightMatches } from "@/pages/services/highlightMatches";

export const PersonalizationForm = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const user = useAppSelector((state) => state.user.user.data);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { handleSubmit } = useForm();
  const handleHighlight = (string: string) =>
    highlightMatches(searchValue, string);
  const categories = useAppSelector(
    (state) => state.categories.categoriesList.data
  );

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

  useEffect(() => {
    const categories = user?.categories.map((i) => i.name);
    if (categories?.length) {
      setGenres(categories);
    }
  }, [user]);

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

  const onSubmit = () => {
    const data = { userId: user?._id, categories: genres };
    dispatch(addCategoryUser(data));
    router.push("/profile");
  };

  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <form className={styles.persForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Пошук жанраў"
        className={styles.searchInput}
        onChange={changeSearchValue}
      />
      <div className={styles.buttons}>
        {categories
          ?.filter((item) => item.name.toLowerCase().includes(searchValue))
          .map(({ name }) => (
            <CategoryButton
              categoryName={handleHighlight(name) as string}
              genres={genres}
              onClick={onClick}
              key={name}
            />
          ))}
      </div>
      <div className={styles.topics}>
        <p className={styles.topicsText}>{`${genres.length} ${
          genres.length === 1
            ? "жанр выбраны"
            : genres.length > 1 && genres.length < 5
            ? "жанры выбрана"
            : "жанраў выбрана"
        }`}</p>
      </div>
      <button className={styles.submitBtn}>Адправіць</button>
      <Link href={"/profile"} className={styles.skipBtn}>
        Адмяніць
      </Link>
    </form>
  );
};
