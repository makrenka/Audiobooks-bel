import { HashRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "./components/pages/home";
import { SearchPage } from "./components/pages/search-page";
import { SectionPage } from "./components/pages/section-page";
import { CategoriesPage } from "./components/pages/categories-page/categories-page";
import { DetailPage } from "./components/pages/detail-page";

import "./App.css";

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/categories"
        element={<CategoriesPage heading="Categories" />}
      />
      <Route
        path="/recommended"
        element={
          <SectionPage heading="Recommended For You" section="recommended" />
        }
      />
      <Route
        path="/best"
        element={<SectionPage heading="Best Seller" section="best" />}
      />
      <Route
        path="/new"
        element={<SectionPage heading="New Releases" section="new" />}
      />
      <Route
        path="/trending"
        element={<SectionPage heading="Trending Now" section="trending" />}
      />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  </HashRouter>
);
