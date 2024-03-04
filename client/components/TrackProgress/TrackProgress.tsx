import styles from "./TrackProgress.module.css";

type TrackProgressProps = {
  left: number;
  right: number;
  onChange: (e: any) => void;
};

export const TrackProgress = ({
  left,
  right,
  onChange,
}: TrackProgressProps) => {
  return (
    <div>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
        className={styles.indicator}
      />
      <div className={styles.times}>
        <span className={styles.time}>{left}</span>
        <span className={styles.time}>{right}</span>
      </div>
    </div>
  );
};
