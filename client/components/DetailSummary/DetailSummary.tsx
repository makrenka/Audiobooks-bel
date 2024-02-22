import styles from "./DetailSummary.module.css";

export const DetailSummary = ({ summary }: { summary: string }) => (
  <div className={styles.summary}>
    <h3 className={styles.heading}>Summary</h3>
    <p className={styles.text}>{summary}</p>
  </div>
);
