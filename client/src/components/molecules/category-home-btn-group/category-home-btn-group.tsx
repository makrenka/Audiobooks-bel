import { categories } from '../../../constants/categories';
import './category-home-btn-group.css';

export const CategoryHomeBtnGroup = () => (
    <div className="categories-home__buttons">
        {categories.map(({ name }) =>
            <button type="button" className="categories-home__btn" key={name}>
                {name}
            </button>
        )}
    </div>

)