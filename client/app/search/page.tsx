"use client";
import { useState } from "react";

import { BottomBar } from "@/components/BottomBar/BottomBar";
import { CategorySearchBtnGroup } from "@/components/CategorySearchBtnGroup/CategorySearchBtnGroup";
import { Header } from "@/components/Header/Header";
import { LatestSearchCardsGroup } from "@/components/LatestSearchCardsGroup/LatestSearchCardsGroup";
import { SearchPanel } from "@/components/SearchPanel/SearchPanel";
import { SearchResults } from "@/components/SearchResults/SearchResults";

import styles from "./page.module.css";

export default function SearchPage() {
  const [value, setValue] = useState("");

  const onValueChange = (value: string) => {
    setValue(value);
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <SearchPanel onValueChange={onValueChange} />
          {!value ? (
            <>
              <CategorySearchBtnGroup />
              <LatestSearchCardsGroup />
            </>
          ) : (
            <SearchResults value={value} />
          )}
        </main>
      </div>
      <BottomBar />
    </>
  );
}
