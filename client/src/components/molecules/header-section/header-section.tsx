import { HandySvg } from "handy-svg";
import { Link } from "react-router-dom";

import arrowHeader from '../../../assets/images/icons/arrow-header-section.svg';

import './header-section.css';

export const HeaderSection = ({ heading }: { heading: string }) => (
    <header className="header-section">
        <div className="container">
            <div className="header-section__wrapper">
                <Link to="/">
                    <HandySvg
                        src={arrowHeader}
                        className="header-section___arrow-icon"
                        width="24"
                        height="24"
                    />
                </Link>
                <h2 className="header-section___heading">
                    {heading}
                </h2>
            </div>
        </div>
    </header>
)