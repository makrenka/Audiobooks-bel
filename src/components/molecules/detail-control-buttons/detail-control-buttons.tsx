import { HandySvg } from "handy-svg";

import audioPlayButton from '../../../assets/images/icons/audio-play-button.svg';
import readBookButton from '../../../assets/images/icons/read-book-button.svg';

import './detail-control-buttons.css';

export const DetailControlButtons = () => (
    <div className="detail-page__control-buttons">
        <button type="button" className="detail-page__control-btn control-btn-play">
            <HandySvg
                src={audioPlayButton}
                className="detail-page__control-btn-icon"
                width="20"
                height="20"
            />
            Play Audio
        </button>
        <button type="button" className="detail-page__control-btn control-btn-read">
            <HandySvg
                src={readBookButton}
                className="detail-page__control-btn-icon"
                width="20"
                height="20"
            />
            Read Book
        </button>
    </div>
)