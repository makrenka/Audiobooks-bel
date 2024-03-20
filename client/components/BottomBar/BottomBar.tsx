import { HomeIndicator } from "../HomeIndicator/HomeIndicator";
import { Navigation } from "../Navigation/Navigation";

import styles from "./BottomBar.module.css";

const navItems = [
  {
    label: "Галоўная",
    href: "/",
    imgSrcActive: "/icons/bottom-bar/home-icon-active.svg",
    imgSrcUnactive: "/icons/bottom-bar/home-icon-unactive.svg",
  },
  {
    label: "Пошук",
    href: "/search",
    imgSrcActive: "/icons/bottom-bar/search-icon-active.svg",
    imgSrcUnactive: "/icons/bottom-bar/search-icon-unactive.svg",
  },
  {
    label: "Бібліятэка",
    href: "/library",
    imgSrcActive: "/icons/bottom-bar/library-icon-active.svg",
    imgSrcUnactive: "/icons/bottom-bar/library-icon-unactive.svg",
  },
];

export const BottomBar = () => (
  <>
    <footer className={styles.footer}>
      <div className={styles.tabBar}>
        <Navigation navLinks={navItems} />
      </div>
    </footer>
    <HomeIndicator />
  </>
);
