import styles from './rating-star.module.scss';

export const RatingStar = ({ filling }: { filling: number }) => (
    <div className={styles.ratingStar}>
        <div className={styles.filledStar} style={{ width: `${filling}%` }}></div>
    </div>
)