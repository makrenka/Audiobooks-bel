import { RecommendedCardGroup } from "../components/molecules/recommended-card-group";
import { CategoryHomeBtnGroup } from "../components/molecules/category-home-btn-group";
import { BestSellerCardsGroup } from "../components/molecules/best-seller-cards-group";
import { NewAndTrendCardsGroup } from "../components/molecules/new-and-trend-cards-group";

export const sections = [
    { name: "Categories", content: <CategoryHomeBtnGroup />, url: "categories" },
    { name: "Recommended For You", content: <RecommendedCardGroup />, url: "recommended" },
    { name: "Best Seller", content: <BestSellerCardsGroup section="best" />, url: "best" },
    { name: "New Releases", content: <NewAndTrendCardsGroup section="new" />, url: "new" },
    { name: "Trending Now", content: <NewAndTrendCardsGroup section="trending" />, url: "trending" },
]