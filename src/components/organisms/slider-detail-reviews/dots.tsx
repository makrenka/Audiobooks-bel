import { useContext } from "react";
import classNames from "classnames";

import { ReviewsContext } from "../../pages/detail-page/detail-page";

export const Dots = ({ slideNumber, goToSlide }: {
    slideNumber: number,
    goToSlide: (number: number) => void,
}) => {

    const { reviews } = useContext(ReviewsContext);

    const renderDots = () => {
        const dots = [];
        const countSlides = reviews?.length || 0;
        for (let i = 0; i < countSlides; i++) {
            dots.push(<div
                key={i}
                className={classNames('detail-page__reviews-slider-dot', { selected: slideNumber === i })}
                onClick={() => goToSlide(i)}
            />);
        };

        return dots;
    };

    return (
        <div className="detail-page__reviews-slider-dots">
            {renderDots()}
        </div>
    );
};