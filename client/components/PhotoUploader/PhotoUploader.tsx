import { ReactElement, useRef } from "react";

type PhotoUploaderProps = {
  setFile: Function;
  accept: string;
  children: ReactElement;
};

export const PhotoUploader = ({
  setFile,
  accept,
  children,
}: PhotoUploaderProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    e.target.files && setFile(e.target.files[0]);
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
