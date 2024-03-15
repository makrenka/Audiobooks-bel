import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import styles from "./AuthForm.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

type LoginForm = {
  email: string;
  password: string;
  dateBirth: Date;
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
  const [inputType, setInputType] = useState("text");

  const router = useRouter();

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
      {router.pathname === "/auth/forget" && (
        <p className={styles.forgetText}>
          Калі ласка, увядзіце Ваш email, і мы адправім Вам спасылку для ўваходу
          ў акаунт
        </p>
      )}
      {router.pathname === "/auth/login" ||
      router.pathname === "/auth/registry" ? (
        <>
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
        </>
      ) : null}
      {router.pathname === "/auth/registry" && (
        <>
          <input
            type={inputType}
            placeholder="Дата нараджэньня"
            onFocus={() => setInputType("date")}
            className={styles.inputText}
            {...register("dateBirth", {
              required: "Увядзіце дату нараджэньня",
            })}
          />
          <div className={styles.errorBox}>
            {errors?.dateBirth && (
              <p className={styles.errorText}>{errors?.dateBirth.message}</p>
            )}
          </div>
          <p className={styles.registry}>
            Зарэгістраваўшыся, вы пагаджаецеся з нашымі{" "}
            <Link href={"/auth/registry"} className={styles.formLink}>
              Правіламі
            </Link>{" "}
            і{" "}
            <Link href={"/auth/registry"} className={styles.formLink}>
              Палітыкай Cookies
            </Link>{" "}
          </p>
        </>
      )}
      {router.pathname === "/auth/login" && (
        <label className={styles.labelCheckbox}>
          <input type="checkbox" className={styles.inputCheckbox} />
          <span>Запомніць мяне</span>
        </label>
      )}
      <button className={styles.btn} disabled={!isValid}>
        {router.pathname === "/auth/login"
          ? "Увайсьці"
          : router.pathname === "/auth/registry"
          ? "Зарэгістравацца"
          : "Адправіць"}
      </button>
      {router.pathname !== "/auth/login" && (
        <Link href={"/auth/login"}>
          <button className={styles.cancelBtn}>Адмяніць</button>
        </Link>
      )}
    </form>
  );
};
