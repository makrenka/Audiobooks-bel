import './detail-card.css';

export const DetailCard = ({ cover, title, author, rating, ratingNumber }: {
    cover: string | undefined,
    title: string | undefined,
    author: string | undefined,
    rating: string | undefined,
    ratingNumber: number | undefined,
}) => (
    <div className="detail-page__main-card">
        <div className='detail-page__card-img-wrapper'>
            <img src={cover} alt="Book cover" className="detail-page__card-img" />
        </div>
        <h2 className="detail-page__card-heading">
            {title}
        </h2>
        <p className='detail-page__card-author'>
            {author}
        </p>
        <div className='detail-page__card-rating-wrapper'>
            <img src={rating} alt="book rating" className='detail-page__card-rating-img' />
            <p className='detail-page__card-rating-number'>{ratingNumber?.toFixed(1)}</p>
        </div>
    </div>
)