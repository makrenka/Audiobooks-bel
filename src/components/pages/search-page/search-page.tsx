import { useState } from "react";

import { BottomBar } from "../../molecules/bottom-bar";
import { CategorySearchBtnGroup } from "../../molecules/category-search-btn-group";
import { Header } from "../../molecules/header";
import { LatestSearchCardsGroup } from "../../molecules/latest-search-cards-group";
import { SearchPanel } from "../../molecules/search-panel";
import { SearchResults } from "../../molecules/search-results";

import "./search-page.css";

export const SearchPage = () => {
  const [value, setValue] = useState("");

  const onValueChange = (value: string) => {
    setValue(value);
  };

  return (
    <>
      <Header />
      <main className="search-page__main">
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
      <BottomBar />
    </>
  );
};
