import React, { ReactElement, useRef } from "react";

type FileUploadProps = {
  setFile: Function;
  accept: string;
  children: ReactElement;
};

export const FileUpload = ({ setFile, accept, children }: FileUploadProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0]);
  };

  return (
    <div onClick={() => ref.current?.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};
