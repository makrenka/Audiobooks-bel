import { HandySvg } from "handy-svg";
import { Link } from "react-router-dom";

import logo from '../../../assets/images/icons/logo.svg';
import settings from '../../../assets/images/icons/settings.svg';

import './header.css';

export const Header = () => (
    <header className="header">
        <div className="container">
            <div className="header__wrapper">
                <div className="header___logo">
                    <Link to="/">
                        <HandySvg
                            src={logo}
                            className="header___logo-icon"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="header__heading-link">
                        <h1 className="header__heading">
                            AudiBooks
                        </h1>
                    </Link>
                </div>
                <HandySvg
                    src={settings}
                    className="header__settings-icon"
                    width="24"
                    height="24"
                />
            </div>
        </div>
    </header>
)