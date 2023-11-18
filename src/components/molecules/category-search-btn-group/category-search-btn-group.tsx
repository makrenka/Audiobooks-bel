import { searchRecommendedCategories } from "../../../constants/search-recommended-categories";

import './category-search-btn-group.css';

export const CategorySearchBtnGroup = () => (
    <div className="container">
        <section className="search-page__categories">
            <h2 className="search-page__categories-heading">
                Recommended Categories
            </h2>
            <div className="search-page__categories-buttons">
                {searchRecommendedCategories.map(({ icon, name }) =>
                    <button className="search-page__categories-buttons-btn" key={name}>
                        {icon}
                        <span>{name}</span>
                    </button>
                )}
            </div>
        </section>
    </div>
)