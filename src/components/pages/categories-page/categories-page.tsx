import { categories } from "../../../constants/categories";
import { BottomBar } from "../../molecules/bottom-bar";
import { HeaderSection } from "../../molecules/header-section";

import './categories-page.css';

export const CategoriesPage = ({ heading }: { heading: string }) => (
    <>
        <HeaderSection heading={heading} />
        <div className="container">
            <div className="categories-page__buttons">
                {categories.map(({ name }) =>
                    <button type="button" className="categories-page__btn" key={name}>
                        {name}
                    </button>
                )}
            </div>
        </div>
        <BottomBar />
    </>
)