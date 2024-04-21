import React, { useState } from "react";

export const useTextArea = (initValue: string) => {
  const [value, setValue] = useState(initValue);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};
