import { HandySvg } from "handy-svg";

import businessIcon from "../assets/images/icons/search-categories-icons/business-icon.svg";
import personalIcon from "../assets/images/icons/search-categories-icons/personal-icon.svg";
import musicIcon from "../assets/images/icons/search-categories-icons/music-icon.svg";
import photographyIcon from "../assets/images/icons/search-categories-icons/photography-icon.svg";

export const searchRecommendedCategories = [
  {
    icon: (
      <HandySvg
        src={businessIcon}
        className="search-page__categories-buttons-btn-icon"
        width="24"
        height="24"
      />
    ),
    name: "Бізнэс",
  },
  {
    icon: (
      <HandySvg
        src={personalIcon}
        className="search-page__categories-buttons-btn-icon"
        width="24"
        height="24"
      />
    ),
    name: "Людзі",
  },
  {
    icon: (
      <HandySvg
        src={musicIcon}
        className="search-page__categories-buttons-btn-icon"
        width="24"
        height="24"
      />
    ),
    name: "Музыка",
  },
  {
    icon: (
      <HandySvg
        src={photographyIcon}
        className="search-page__categories-buttons-btn-icon"
        width="24"
        height="24"
      />
    ),
    name: "Фатаграфія",
  },
];
