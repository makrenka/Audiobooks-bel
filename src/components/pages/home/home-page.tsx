import { sections } from "../../../constants/sections-home";
import { BottomBar } from "../../molecules/bottom-bar";
import { Header } from "../../molecules/header";
import { SectionHome } from "../../organisms/categories-home";

import './home-page.css';

export const HomePage = () => (
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