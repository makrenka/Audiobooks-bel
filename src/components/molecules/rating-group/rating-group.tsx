import { RatingStar } from '../../atoms/rating-star';
import styles from './rating-group.module.scss';

export const RatingGroup = ({ filling }: { filling: number }) => (
    <div className={styles.ratingGroup}>
        <RatingStar filling={filling} />
    </div>
)