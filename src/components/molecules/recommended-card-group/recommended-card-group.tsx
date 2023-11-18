import { Link } from 'react-router-dom';
import { audiobooks } from '../../../constants/audiobooks';
import './recommended-card-group.css';

export const RecommendedCardGroup = () => (
    <div className="recommended-home__images">
        {audiobooks.map(({ coverBigSize, id }) =>
            <Link to={"detail/" + id} key={id}>
                <img src={coverBigSize} alt="Cover of the book" className='recommended-home__img' />
            </Link>
        )}
    </div>
)