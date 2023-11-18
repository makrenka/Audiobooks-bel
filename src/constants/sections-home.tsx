import { RecommendedCardGroup } from "../components/molecules/recommended-card-group";
import { CategoryHomeBtnGroup } from "../components/molecules/category-home-btn-group";
import { BestSellerCardsGroup } from "../components/molecules/best-seller-cards-group";
import { NewAndTrendCardsGroup } from "../components/molecules/new-and-trend-cards-group";

export const sections = [
  { name: "Катэгорыі", content: <CategoryHomeBtnGroup />, url: "categories" },
  {
    name: "Рэкамэндавана для вас",
    content: <RecommendedCardGroup />,
    url: "recommended",
  },
  {
    name: "Лідары продажу",
    content: <BestSellerCardsGroup section="best" />,
    url: "best",
  },
  {
    name: "Навінкі",
    content: <NewAndTrendCardsGroup section="new" />,
    url: "new",
  },
  {
    name: "Папулярнае",
    content: <NewAndTrendCardsGroup section="trending" />,
    url: "trending",
  },
];
