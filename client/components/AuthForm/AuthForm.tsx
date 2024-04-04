import { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { forgot, login, registration } from "@/store/auth";

import styles from "./AuthForm.module.css";

type LoginForm = {
  email: string;
  password: string;
  name: string;
  remember: boolean;
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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const authErrorMessage = useAppSelector(
    (state) => state.auth.auth.errorMessage
  );
  const sendedEmail = useAppSelector((state) => state.auth.forgot.isSuccess);
  const sendedEmailError = useAppSelector(
    (state) => state.auth.forgot.errorMessage
  );

  useEffect(() => {
    isAuthenticated && router.push("/");
    sendedEmail && router.push("/auth/login");
  }, [isAuthenticated, sendedEmail]);

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    if (router.pathname === "/auth/login") {
      dispatch(login(data));
    }
    if (router.pathname === "/auth/registry") {
      dispatch(registration(data));
    }
    if (router.pathname === "/auth/forget") {
      dispatch(forgot(data.email));
    }
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
      {authErrorMessage && (
        <div className={styles.errorBox}>
          <p className={styles.errorText}>{authErrorMessage}</p>
        </div>
      )}
      {sendedEmailError && (
        <div className={styles.errorBox}>
          <p className={styles.errorText}>{sendedEmailError}</p>
        </div>
      )}
      {sendedEmail && (
        <p className={styles.sendedEmailText}>
          Пароль для ўваходу адпраўлены на Ваш email
        </p>
      )}
      {router.pathname === "/auth/registry" && (
        <>
          <input
            type="text"
            placeholder="Вашае імя"
            className={styles.inputText}
            {...register("name", {
              required: "Увядзіце вашае імя",
            })}
          />
          <div className={styles.errorBox}>
            {errors?.name && (
              <p className={styles.errorText}>{errors?.name.message}</p>
            )}
          </div>
        </>
      )}
      <input
        type="email"
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
          Калі ласка, увядзіце Ваш email, і мы адправім Вам пароль для ўваходу ў
          акаунт
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
                value: 4,
                message: "Мінімум 4 сымбалі",
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
      )}
      {router.pathname === "/auth/login" && (
        <label className={styles.labelCheckbox}>
          <input
            type="checkbox"
            className={styles.inputCheckbox}
            {...register("remember")}
          />
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
