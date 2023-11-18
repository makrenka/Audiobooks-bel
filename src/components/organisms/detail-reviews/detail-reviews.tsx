import { useState } from 'react';
import { SliderDetailReviews } from '../slider-detail-reviews';
import { Slide } from '../slider-detail-reviews/slide';

import './detail-reviews.css';

export const DetailReviews = () => {

    const [slider, setSlider] = useState(true);

    const onSlider = () => {
        setSlider(false);
    }

    return (
        <div className="detail-page__reviews">
            <h3 className="detail-page__reviews-heading">Reviews</h3>
            {
                slider
                    ? <SliderDetailReviews onSlider={onSlider} />
                    : <div className='detail-page__reviews-list'>
                        <Slide />
                    </div>
            }
        </div>
    );
};