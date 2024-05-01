import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";

import { BottomBar } from "@/components/BottomBar/BottomBar";
import { CategorySearchBtnGroup } from "@/components/CategorySearchBtnGroup/CategorySearchBtnGroup";
import { Header } from "@/components/Header/Header";
import { LatestSearchCardsGroup } from "@/components/LatestSearchCardsGroup/LatestSearchCardsGroup";
import { SearchPanel } from "@/components/SearchPanel/SearchPanel";
import { SearchResults } from "@/components/SearchResults/SearchResults";

import styles from "./page.module.css";
import { SelectedCategoryCardsGroup } from "@/components/SelectedCategoryCardsGroup/SelectedCategoryCardsGroup";
import { useAppDispatch } from "@/store/hooks";
import { fetchBooks } from "@/store/books";

export default function SearchPage() {
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const onValueChange = (value: string) => {
    setValue(value);
  };

  const onSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <NextSeo title={"Аўдыёкнігі - пошук кніг"} />
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <SearchPanel onValueChange={onValueChange} />
          {!value ? (
            !selectedCategory ? (
              <>
                <CategorySearchBtnGroup
                  onSelectedCategory={onSelectedCategory}
                />
                <LatestSearchCardsGroup />
              </>
            ) : (
              <>
                <CategorySearchBtnGroup
                  onSelectedCategory={onSelectedCategory}
                />
                <SelectedCategoryCardsGroup
                  selectedCategory={selectedCategory}
                />
              </>
            )
          ) : (
            <SearchResults value={value} />
          )}
        </main>
      </div>
      <BottomBar />
    </>
  );
}
