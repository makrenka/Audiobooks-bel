import { AllBooksCardsGroup } from "@/components/AllBooksCardsGroup/AllBooksCardsGroup";
import { BestSellerCardsGroup } from "@/components/BestSellerCardsGroup/BestSellerCardsGroup";
import { CategoriesHomeBtnGroup } from "@/components/CategoriesHomeBtnGroup/CategoriesHomeBtnGroup";
import { NewAndTrendCardsGroup } from "@/components/NewAndTrendCardsGroup/NewAndTrendCardsGroup";
import { RecommendedCardGroup } from "@/components/RecommendedCardGroup/RecommendedCardGroup";

export const sections = [
  { name: "Катэгорыі", content: <CategoriesHomeBtnGroup />, url: "categories" },
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
  {
    name: "Усе кнігі",
    content: <AllBooksCardsGroup section="all" />,
    url: "all-books",
  },
];
