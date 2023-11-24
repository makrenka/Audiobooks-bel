import { ChangeEvent, useState } from "react";

import "./search-panel.css";

type SearchPanelProps = {
  onValueChange: (value: string) => void;
};

export const SearchPanel = ({ onValueChange }: SearchPanelProps) => {
  const [value, setValue] = useState("");

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onValueChange(value);
  };

  return (
    <div className="container">
      <form className="search-page__search-panel">
        <label htmlFor="search" className="search-page__search-panel-label">
          Шукаць
        </label>
        <input
          id="search"
          type="text"
          placeholder="Пошук кніг альбо аўтара..."
          className="search-page__search-panel-input"
          onChange={changeValue}
          value={value}
        />
      </form>
    </div>
  );
};
