import { audiobooks } from "../../../constants/audiobooks";

import './latest-search-cards-group.css';

export const LatestSearchCardsGroup = () => (
    <div className="container">
        <section className="search-page__latest-search">
            <h2 className="search-page__latest-search-heading">
                Latest Search
            </h2>
            <div className="search-page__latest-search-cards">
                {audiobooks.map(({ cover, title, id }) =>
                    <div className="search-page__latest-search-card" key={id}>
                        <img
                            src={cover}
                            alt="Cover of the book"
                            className="search-page__latest-search-card-img"
                        />
                        <h3 className="search-page__latest-search-card-heading">{title}</h3>
                    </div>
                )}
            </div>
        </section>
    </div>
)