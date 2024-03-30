import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import styles from "./ChangePasswordForm.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePassword, fetchUser } from "@/store/users";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/pages/settings";
import { useRouter } from "next/navigation";

type ChangePasswordForm = {
  userId: string | undefined;
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export const ChangePasswordForm = () => {
  const [isError, setIsError] = useState(false);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    getValues,
  } = useForm<ChangePasswordForm>({
    mode: "onBlur",
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const changePasswordState = useAppSelector(
    (state) => state.user.changePassword
  );
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { id } = jwtDecode(token || "") as JwtPayload;
    dispatch(fetchUser(id));
  }, []);

  useEffect(() => {
    if (changePasswordState.error) {
      setIsError(true);
    }
    if (changePasswordState.data) {
      reset();
      router.push("/profile");
    }
  }, [changePasswordState.error, changePasswordState.data]);

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
    dispatch(changePassword({ ...data, userId: user.data?._id }));
  };

  const onError: SubmitErrorHandler<ChangePasswordForm> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
      <h3 className={styles.heading}>Зьмена паролю</h3>
      <input
        type="text"
        placeholder="Ваш стары пароль"
        className={styles.inputText}
        {...register("oldPassword", {
          required: "Увядзіце пароль",
        })}
      />
      <div className={styles.errorBox}>
        {errors?.oldPassword && (
          <p className={styles.errorText}>{errors?.oldPassword.message}</p>
        )}
      </div>
      {isError && (
        <div className={styles.errorBox}>
          <p className={styles.errorText}>Няправільны стары пароль</p>
        </div>
      )}
      <input
        type="text"
        placeholder="Новы пароль"
        className={styles.inputText}
        {...register("newPassword", {
          required: "Увядзіце пароль",
          minLength: {
            value: 4,
            message: "Мінімум 4 сымбалі",
          },
          validate: (match) => {
            const password = getValues("oldPassword");
            return (
              match !== password ||
              "Новы пароль павінен адрозьнівацца ад старога"
            );
          },
        })}
      />
      <div className={styles.errorBox}>
        {errors?.newPassword && (
          <p className={styles.errorText}>{errors?.newPassword.message}</p>
        )}
      </div>
      <input
        type="text"
        placeholder="Паўтарыце новы пароль"
        className={styles.inputText}
        {...register("newPasswordRepeat", {
          required: "Увядзіце пароль",
          minLength: {
            value: 4,
            message: "Мінімум 4 сымбалі",
          },
          validate: (match) => {
            const password = getValues("newPassword");
            return match === password || "Пароль павінен супадаць!";
          },
        })}
      />
      <div className={styles.errorBox}>
        {errors?.newPasswordRepeat && (
          <p className={styles.errorText}>
            {errors?.newPasswordRepeat.message}
          </p>
        )}
      </div>
      <button className={styles.btn} disabled={!isValid}>
        Зьмяніць пароль
      </button>
      <Link href={"/profile"}>
        <button className={styles.cancelBtn}>Адмяніць</button>
      </Link>
    </form>
  );
};
