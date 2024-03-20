import styles from "./page.module.css";

export default function Personalization() {
  return (
    <div className={styles.personalization}>
      <div className={styles.container}>
        <h3 className={styles.heading}>Пэрсаналізацыя</h3>
        <p>
          Абярыце пажаданыя жанры, мы будзем часьцей прапаноўваць Вам кнігі ў іх
        </p>
      </div>
    </div>
  );
}
