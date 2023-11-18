import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { audiobooks } from "../../../constants/audiobooks";
import { DetailCard } from "../../molecules/detail-card";
import { HeaderDetail } from "../../molecules/header-detail";
import { CategoryDetailBtnGroup } from "../../molecules/category-detail-btn-group";
import { BottomBar } from "../../molecules/bottom-bar";

import './detail-page.css';
import { DetailControlButtons } from "../../molecules/detail-control-buttons";
import { DetailSummary } from "../../molecules/detail-summary";
import { DetailReviews } from "../../organisms/detail-reviews";

// type Params = {
//     id?: string,
// }

// class DetailPage extends Component<{ params: Params }> {

//     state = {
//         book: {},
//     }

//     getBook = () => {
//         const bookId = this.props.params.id;
//         const book = audiobooks.filter((item) => item.id == bookId);
//         this.setState({ book });
//     }

//     componentDidMount() {
//         this.getBook();
//     }

//     render(): ReactNode {
//         console.log(this.state.book)
//         return (
//             <>
//                 {/* <HeaderDetail title={title} /> */}
//                 <main className="detail-page__main">
//                     <div className="container">
//                         {/* <DetailCard cover={cover} /> */}
//                     </div>
//                 </main>
//             </>
//         )
//     }
// };

// export default WithRouter(DetailPage);

interface Reviews {
    reviews: [] | undefined
};

const reviewsDefault = {
    reviews: undefined,
};

export const ReviewsContext = createContext<Reviews>(reviewsDefault);

export const DetailPage = () => {
    const params = useParams();
    const bookId = params.id;

    const [book, setBook] = useState([{}]);

    useEffect(() => {
        const book = audiobooks.filter((item) => item.id == bookId);
        setBook(book);
    }, []);

    type Props = {
        title?: string,
        cover?: string,
        author?: string,
        rating?: string,
        ratingNumber?: number,
        category?: [],
        summary?: string,
        reviews?: [],
    };

    const { title, cover, author, rating, ratingNumber, category, summary, reviews }: Props = book[0];

    return (
        <>
            <HeaderDetail title={title} />
            <main className="detail-page__main">
                <div className="container">
                    <DetailCard
                        cover={cover}
                        title={title}
                        author={author}
                        rating={rating}
                        ratingNumber={ratingNumber}
                    />
                    <CategoryDetailBtnGroup
                        category={category}
                    />
                    <DetailControlButtons />
                    <DetailSummary
                        summary={summary}
                    />
                    <ReviewsContext.Provider
                        value={{ reviews }}
                    >
                        <DetailReviews />
                    </ReviewsContext.Provider>

                </div>
            </main>
            <BottomBar />
        </>
    )
}