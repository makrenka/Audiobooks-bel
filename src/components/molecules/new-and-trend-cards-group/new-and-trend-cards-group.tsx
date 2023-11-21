import { useSelector } from "react-redux";

import { RootState } from "../../../store";

import noImage from './assets/no-image.png';

import './new-and-trend-cards-group.css';


export const NewAndTrendCardsGroup = ({ section }: { section: string }) => {
    const books = useSelector((state: RootState) => state.books.bookList.data);

    return (
        <div className="new-and-trend-home__cards">
            {books?.filter((item) => item.section.includes(section))
                .map(({ cover, title, id }) =>
                    <div className="new-and-trend-home__card" key={id}>
                        <img src={cover.url ? cover.url : noImage} alt="Cover of the book" className="new-and-trend-home__card-img" />
                        <h3 className="new-and-trend-home__card-heading">{title}</h3>
                    </div>
                )}
        </div>
    )
}