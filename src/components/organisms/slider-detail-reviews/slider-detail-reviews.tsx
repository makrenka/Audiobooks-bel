import { TouchEvent, useContext, useState } from 'react';

import { ReviewsContext } from '../../pages/detail-page/detail-page';
import { SlidesList } from './slides-list';
import { Dots } from './dots';

import './slider-detail-reviews.css';

export const SliderDetailReviews = ({ onSlider }: { onSlider: () => void }) => {

    const [slide, setSlide] = useState(0);
    const [touchPosition, setTouchPosition] = useState<number | null>(null);
    const { reviews } = useContext(ReviewsContext);

    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = 0;
        } else if (slide + direction <= (reviews || '').length - 1) {
            slideNumber = (slide + direction);
        } else { slideNumber = (reviews || '').length - 1 };

        setSlide(slideNumber);
    };

    const goToSlide = (number: number) => {
        setSlide(number);
    };

    const handleTouchStart = (e: TouchEvent) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (touchPosition === null) return;

        const currentPosition = e.touches[0].clientX;
        const direction = touchPosition - currentPosition;

        if (direction > 10) {
            changeSlide(1);
        };

        if (direction < -10) {
            changeSlide(-1);
        };

        setTouchPosition(null);
    }

    return (
        <div
            className="detail-page__reviews-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <SlidesList
                slideNumber={slide}
            />
            <div className='detail-page__reviews-slider-links-wrapper'>
                <Dots
                    slideNumber={slide}
                    goToSlide={goToSlide}
                />
                <button
                    className='detail-page__reviews-slider-view-link'
                    onClick={() => onSlider()}
                >
                    View More
                </button>
            </div>
        </div>
    )
}