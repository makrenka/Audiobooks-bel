import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./AddBookForm.module.css";
import { FileUpload } from "../FileUpload/FileUpload";

type AddBookForm = {
  title: string;
  author: string;
  summary: string;
  cover: string;
  audio: string;
};

export const AddBookForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<AddBookForm>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<AddBookForm> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Назва кнігі"
        className={styles.inputText}
        {...register("title", { required: "Увядзіце назву кнігі" })}
      />
      <div className={styles.errorBox}>
        {errors?.title && (
          <p className={styles.errorText}>{errors?.title.message}</p>
        )}
      </div>
      <input
        type="text"
        placeholder="Аўтар"
        className={styles.inputText}
        {...register("author", { required: "Увядзіце імя аўтара" })}
      />
      <div className={styles.errorBox}>
        {errors?.author && (
          <p className={styles.errorText}>{errors?.author.message}</p>
        )}
      </div>
      <textarea
        placeholder="Апісаньне"
        className={styles.areaText}
        {...register("summary")}
        rows={10}
      />
      <FileUpload setFile={() => {}} accept="image/*" {...register("cover")}>
        <button>Загрузіць вокладку</button>
      </FileUpload>
      <FileUpload setFile={() => {}} accept="audio/*" {...register("audio")}>
        <button>Загрузіць аўдыё</button>
      </FileUpload>
    </form>
  );
};
