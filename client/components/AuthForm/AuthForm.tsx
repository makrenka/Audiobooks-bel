import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import styles from "./AuthForm.module.css";
import { useRouter } from "next/router";

type LoginForm = {
  email: string;
  password: string;
};

export const AuthForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<LoginForm>({
    mode: "onBlur",
  });
  const router = useRouter();
  console.log(router);

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
    reset();
  };

  const onError: SubmitErrorHandler<LoginForm> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
      <h3 className={styles.heading}>
        {router.pathname === "/auth/login"
          ? "Уваход у акаунт"
          : router.pathname === "/auth/registry"
          ? "Рэгістрацыя"
          : "Забылі пароль?"}
      </h3>
      <input
        type="text"
        placeholder="Email"
        className={styles.inputText}
        {...register("email", {
          required: "Увядзіце email",
          pattern: {
            value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/,
            message: "Ня правільны email",
          },
        })}
      />
      <div className={styles.errorBox}>
        {errors?.email && (
          <p className={styles.errorText}>{errors?.email.message}</p>
        )}
      </div>
      <input
        type="text"
        placeholder="Пароль"
        className={styles.inputText}
        {...register("password", {
          required: "Увядзіце пароль",
          minLength: {
            value: 8,
            message: "Мінімум 8 сымбаляў",
          },
        })}
      />
      <div className={styles.errorBox}>
        {errors?.password && (
          <p className={styles.errorText}>{errors?.password.message}</p>
        )}
      </div>
      <label className={styles.labelCheckbox}>
        <input type="checkbox" className={styles.inputCheckbox} />
        <span>Запомніць мяне</span>
      </label>
      <button className={styles.btn} disabled={!isValid}>
        Увайсьці
      </button>
    </form>
  );
};
