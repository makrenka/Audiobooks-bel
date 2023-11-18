import './category-detail-btn-group.css';

export const CategoryDetailBtnGroup = ({ category }: {
    category: [] | undefined,
}) => (
    <div className="categories-detail__buttons">
        {category?.map((item) =>
            <button type="button" className="categories-detail__btn" key={item}>
                {item}
            </button>
        )}
    </div>
);