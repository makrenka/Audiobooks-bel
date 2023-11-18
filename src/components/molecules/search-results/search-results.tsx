import "./search-results.css";

export const SearchResults = ({
  searchBooks,
}: {
  searchBooks: Array<{
    cover: string;
    title: string;
    author: string;
    id: string;
  }>;
}) => (
  <div className="container">
    <section className="search-page__search-results">
      <h2 className="search-page__search-results-heading">Search Results</h2>
      <div className="search-page__search-results-cards">
        {searchBooks.map(({ cover, title, author, id }) => (
          <div className="search-page__search-results-card" key={id}>
            <img
              src={cover}
              alt="Cover of the book"
              className="search-page__search-results-card-img"
            />
            <h3 className="search-page__search-results-card-heading">
              {title}
            </h3>
            <p className="search-page__search-results-card-author">{author}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
