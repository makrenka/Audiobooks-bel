import { HandySvg } from 'handy-svg';

import homeIndicator from "../../../assets/images/home-indicator.svg";

import './home-indicator.css';

export const HomeIndicator = () => (
    <div className="home-indicator">
        <HandySvg
            src={homeIndicator}
            className="home-indicator__img"
            width="134"
            height="5"
        />
    </div>
)