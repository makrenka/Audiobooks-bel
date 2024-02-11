import Link from "next/link";

export const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header___logo">
          <Link href={"/"}>
            <img src="/icons/logo.svg" alt="logo" />
          </Link>
          <Link href={"/"} className="header__heading-link">
            <h1 className="header__heading">Аўдыёкнігі</h1>
          </Link>
        </div>
        <img src="/icons/settings.svg" alt="settings" />
      </div>
    </div>
  </header>
);
