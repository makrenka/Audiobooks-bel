import { ChangeEvent, useState } from "react";

import "./search-panel.css";

type SearchPanelProps = {
  onValueChange: (value: string) => void;
  onSubmit: (onSubmit: boolean) => void;
}

export const SearchPanel = ({ onValueChange, onSubmit }: SearchPanelProps) => {
  const [value, setValue] = useState("");

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onValueChange(value);
  };

  const changeSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(true);
  };

  return (
    <div className="container">
      <form className="search-page__search-panel" onSubmit={changeSubmit}>
        <label htmlFor="search" className="search-page__search-panel-label">
          Explore
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search Books or Author..."
          className="search-page__search-panel-input"
          onChange={changeValue}
          value={value}
        />
      </form>
    </div>
  );
};

