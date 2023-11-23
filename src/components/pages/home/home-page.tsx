import { useEffect } from "react";

import { sections } from "../../../constants/sections-home";
import { useAppDispatch } from "../../../store";
import { fetchBooks } from "../../../store/books";
import { BottomBar } from "../../molecules/bottom-bar";
import { Header } from "../../molecules/header";
import { SectionHome } from "../../organisms/categories-home";

import './home-page.css';

export const HomePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <>
            <Header />
            <main className="home-page__main">
                {sections.map(({ name, content, url }) =>
                    <SectionHome key={name} name={name} content={content} url={url} />
                )}
            </main>
            <BottomBar />
        </>
    )
}