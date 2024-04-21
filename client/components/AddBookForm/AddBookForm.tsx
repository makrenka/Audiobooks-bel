import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { FileUpload } from "../FileUpload/FileUpload";
import { useInput } from "@/hooks/useInput";
import { useTextArea } from "@/hooks/useTextArea";

import styles from "./AddBookForm.module.css";

export const AddBookForm = () => {
  const [cover, setCover] = useState<File | null>(null);
  const [coverBigSize, setCoverBigSize] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const title = useInput("");
  const author = useInput("");
  const summary = useTextArea("");

  const router = useRouter();

  let token: string;
  let cookie: string;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") as string;
    cookie = Cookies.get("access_token") as string;
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title.value);
    formdata.append("author", author.value);
    formdata.append("summary", summary.value);
    formdata.append("cover", cover as File);
    formdata.append("coverBigSize", coverBigSize as File);
    formdata.append("audio", audio as File);
    axios
      .post("http://localhost:5000/books", formdata, {
        headers: { Authorization: `Bearer ${token ? token : cookie}` },
      })
      .then((resp) => router.push("/admin"))
      .catch((e) => console.log(e));
  };

  return (
    <form className={styles.form}>
      <input
        type="text"
        placeholder="Назва кнігі"
        className={styles.inputText}
        {...title}
      />
      <input
        type="text"
        placeholder="Аўтар"
        className={styles.inputText}
        {...author}
      />
      <textarea
        placeholder="Апісаньне"
        className={styles.areaText}
        rows={10}
        {...summary}
      />
      <div className={styles.upload}>
        <FileUpload setFile={setCover} accept="image/*">
          <button type="button" className={styles.uploadBtn}>
            Загрузіць вокладку 160x160
          </button>
        </FileUpload>
        {cover && <p className={styles.filename}>{cover?.name}</p>}
      </div>
      <div className={styles.upload}>
        <FileUpload setFile={setCoverBigSize} accept="image/*">
          <button type="button" className={styles.uploadBtn}>
            Загрузіць вокладку 200x300
          </button>
        </FileUpload>
        {coverBigSize && (
          <p className={styles.filename}>{coverBigSize?.name}</p>
        )}
      </div>
      <div className={styles.upload}>
        <FileUpload setFile={setAudio} accept="audio/*">
          <button type="button" className={styles.uploadBtn}>
            Загрузіць аўдыё
          </button>
        </FileUpload>
        {audio && <p className={styles.filename}>{audio?.name}</p>}
      </div>

      <button className={styles.btn} onClick={onSubmit}>
        Дадаць кнігу
      </button>
      <button
        type="button"
        className={styles.cancelBtn}
        onClick={() => router.push("/admin")}
      >
        Скасаваць
      </button>
    </form>
  );
};
