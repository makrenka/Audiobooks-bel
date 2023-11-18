import { HandySvg } from "handy-svg";
import { NavLink } from "react-router-dom";

import { HomeIndicator } from "../../atoms/home-indicator";

import homeIconActive from "../../../assets/images/icons/bottom-bar/home-icon-active.svg";
import homeIconUnactive from "../../../assets/images/icons/bottom-bar/home-icon-unactive.svg";
import searchIconUnactive from "../../../assets/images/icons/bottom-bar/search-icon-unactive.svg";
import searchIconActive from "../../../assets/images/icons/bottom-bar/search-icon-active.svg";
import libraryIconActive from "../../../assets/images/icons/bottom-bar/library-icon-active.svg";
import libraryIconUnactive from "../../../assets/images/icons/bottom-bar/library-icon-unactive.svg";

import './bottom-bar.css';

export const BottomBar = () => (
    <footer className="bottom-bar">
        <div className="bottom-bar__tab-bar">
            <NavLink to="/" className="bottom-bar__tab-bar-link">
                <HandySvg
                    src={homeIconActive}
                    className="bottom-bar__tab-bar-link-icon-active"
                    width="25"
                    height="24"
                />
                <HandySvg
                    src={homeIconUnactive}
                    className="bottom-bar__tab-bar-link-icon-unactive"
                    width="25"
                    height="24"
                />
                <span>Home</span>
            </NavLink>
            <NavLink to="/search" className="bottom-bar__tab-bar-link">
                <HandySvg
                    src={searchIconActive}
                    className="bottom-bar__tab-bar-link-icon-active"
                    width="25"
                    height="24"
                />
                <HandySvg
                    src={searchIconUnactive}
                    className="bottom-bar__tab-bar-link-icon-unactive"
                    width="25"
                    height="24"
                />
                <span>Search</span>
            </NavLink>
            <NavLink to="/library" className="bottom-bar__tab-bar-link">
                <HandySvg
                    src={libraryIconActive}
                    className="bottom-bar__tab-bar-link-icon-active"
                    width="25"
                    height="24"
                />
                <HandySvg
                    src={libraryIconUnactive}
                    className="bottom-bar__tab-bar-link-icon-unactive"
                    width="25"
                    height="24"
                />
                <span>Library</span>
            </NavLink>
        </div>
        <HomeIndicator />
    </footer>
)