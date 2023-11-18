import { Component, ReactNode } from "react";

import { BottomBar } from "../../molecules/bottom-bar";
import { CategorySearchBtnGroup } from "../../molecules/category-search-btn-group";
import { Header } from "../../molecules/header";
import { LatestSearchCardsGroup } from "../../molecules/latest-search-cards-group";
import { SearchPanel } from "../../molecules/search-panel";
import { audiobooks } from "../../../constants/audiobooks";

import "./search-page.css";
import { SearchResults } from "../../molecules/search-results";

export class SearchPage extends Component<
  {},
  {
    value: string;
    onSubmit: boolean;
    data: Array<{ cover: string; title: string; author: string; id: string }>;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: "",
      onSubmit: false,
      data: [],
    };
  }

  onValueChange = (value: string) => {
    this.setState({ value });
  };

  onSubmit = (onSubmit: boolean) => {
    this.setState({ onSubmit });
    this.setState({
      data: audiobooks.filter(
        (item) =>
          item.title.toLowerCase().includes(this.state.value.toLowerCase()) ||
          item.author.toLowerCase().includes(this.state.value.toLowerCase())
      ),
    });
  };

  render(): ReactNode {
    return (
      <>
        <Header />
        <main className="search-page__main">
          <SearchPanel
            onValueChange={this.onValueChange}
            onSubmit={this.onSubmit}
          />
          {!this.state.onSubmit ? (
            <>
              <CategorySearchBtnGroup />
              <LatestSearchCardsGroup />
            </>
          ) : (
            <SearchResults searchBooks={this.state.data} />
          )}
        </main>
        <BottomBar />
      </>
    );
  }
}
