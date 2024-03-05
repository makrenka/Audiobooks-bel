import styles from "./TrackProgress.module.css";

type TrackProgressProps = {
  left: number;
  right: number;
  leftLabel?: string;
  rightLabel?: string;
  onChange: (e: any) => void;
};

export const TrackProgress = ({
  left,
  right,
  leftLabel,
  rightLabel,
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
        <span className={styles.time}>{leftLabel}</span>
        <span className={styles.time}>{rightLabel}</span>
      </div>
    </div>
  );
};
