import { HandySvg } from "handy-svg";
import { Link } from "react-router-dom";

import arrowHeader from '../../../assets/images/icons/arrow-header-section.svg';
import moreHeader from '../../../assets/images/icons/more-header-detail.svg';

import './header-detail.css';

export const HeaderDetail = ({ title }: { title: string | undefined }) => (
    <header className="header-detail">
        <div className="container">
            <div className="header-detail__wrapper">
                <Link to="/">
                    <HandySvg
                        src={arrowHeader}
                        className="header-detail___arrow-icon"
                        width="24"
                        height="24"
                    />
                </Link>
                <h2 className="header-detail__heading">
                    {title}
                </h2>
                <HandySvg
                    src={moreHeader}
                    className="header-detail___more-icon"
                    width="24"
                    height="24"
                />
            </div>
        </div>
    </header>
)