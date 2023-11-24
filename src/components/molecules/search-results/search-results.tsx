import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import { highlightMatches } from "../../../utils/highlight-matches";

import noImage from "./assets/no-image.png";

import "./search-results.css";

export const SearchResults = ({ value }: { value: string }) => {
  const books = useSelector((state: RootState) => state.books.bookList.data);

  const handleHighlight = (string: string) => highlightMatches(value, string);

  return (
    <div className="container">
      <section className="search-page__search-results">
        <h2 className="search-page__search-results-heading">Search Results</h2>
        <div className="search-page__search-results-cards">
          {books
            ?.filter(
              (item) =>
                item.title.toLowerCase().includes(value) ||
                item.author.toLowerCase().includes(value)
            )
            .map(({ cover, title, author, id }) => (
              <div className="search-page__search-results-card" key={id}>
                <img
                  src={cover.url ? cover.url : noImage}
                  alt="Cover of the book"
                  className="search-page__search-results-card-img"
                />
                <h3 className="search-page__search-results-card-heading">
                  {handleHighlight(title)}
                </h3>
                <p className="search-page__search-results-card-author">
                  {handleHighlight(author)}
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
