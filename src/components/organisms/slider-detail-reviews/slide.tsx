import { useContext } from "react";
import { ReviewsContext } from "../../pages/detail-page/detail-page";

export const Slide = () => {

    const { reviews } = useContext(ReviewsContext);

    return (
        <>
            {
                reviews?.map(({ number, image, name, rating, date, text }) => (
                    <div className="detail-page__reviews-slider-slide" key={number}>
                        <div className="detail-page__reviews-slider-slide-info-wrapper">
                            <img src={image} alt="avatar" className="detail-page__reviews-slider-slide-img" />
                            <div className="detail-page__reviews-slider-slide-info">
                                <h3 className="detail-page__reviews-slider-slide-info-name">
                                    {name}
                                </h3>
                                <div className="detail-page__reviews-slider-slide-info-rating">
                                    <img
                                        src={rating}
                                        alt="rating"
                                        className="detail-page__reviews-slider-slide-info-rating-img"
                                    />
                                    <p className="detail-page__reviews-slider-slide-info-rating-date">
                                        {date}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="detail-page__reviews-slider-slide-review">
                            {text}
                        </p>
                    </div>
                ))
            }
        </>
    )
}