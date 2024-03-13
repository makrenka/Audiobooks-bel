import { useForm } from "react-hook-form";

import styles from "./AuthForm.module.css";

type LoginForm = {
  email: string;
  password: string;
};

export const AuthForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.heading}>Уваход у акаунт</h3>
      <input
        type="text"
        placeholder="Email"
        {...register("email", {
          required: "Увядзіце email",
        })}
      />
      <div>{errors?.email && <p>{errors?.email.message}</p>}</div>
      <input
        type="text"
        placeholder="Пароль"
        {...register("password", {
          required: "Увядзіце пароль",
          minLength: {
            value: 8,
            message: "Мінімум 8 сымбаляў",
          },
        })}
      />
      <div>{errors?.password && <p>{errors?.password.message}</p>}</div>
      <label className={styles.label}>
        <input type="checkbox" />
        Запомніць мяне
      </label>
      <button className={styles.btn}>Увайсьці</button>
    </form>
  );
};
