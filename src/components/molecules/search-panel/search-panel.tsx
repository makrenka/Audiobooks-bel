import { ChangeEvent, Component, ReactNode } from "react";
import "./search-panel.css";

interface Props {
  onValueChange: (value: string) => void;
  onSubmit: (onSubmit: boolean) => void;
}

export class SearchPanel extends Component<
  Props,
  { value: string; onSubmit: boolean }
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: "",
      onSubmit: true,
    };
  }

  onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ value });
    this.props.onValueChange(value);
  };

  onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSubmit(this.state.onSubmit);
  };

  render(): ReactNode {
    return (
      <div className="container">
        <form className="search-page__search-panel" onSubmit={this.onSubmit}>
          <label htmlFor="search" className="search-page__search-panel-label">
            Explore
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search Books or Author..."
            className="search-page__search-panel-input"
            onChange={this.onValueChange}
            value={this.state.value}
          />
        </form>
      </div>
    );
  }
}
