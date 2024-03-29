import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import styles from "./ChangePasswordForm.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePassword, fetchUser } from "@/store/users";
import { useEffect } from "react";
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
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ChangePasswordForm>({
    mode: "onBlur",
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user.data);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { id } = jwtDecode(token || "") as JwtPayload;
    dispatch(fetchUser(id));
  }, []);

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
    dispatch(changePassword({ ...data, userId: user?._id }));
    reset();
    router.push("/profile");
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
          //   pattern: {
          //     value:
          //   }
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
