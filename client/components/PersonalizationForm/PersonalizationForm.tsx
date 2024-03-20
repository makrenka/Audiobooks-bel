import styles from "./PersonalizationForm.module.css";

export const PersonalizationForm = () => {
  return (
    <form className={styles.persForm}>
      <input
        type="text"
        placeholder="Пошук жанраў"
        className={styles.searchInput}
      />
    </form>
  );
};
