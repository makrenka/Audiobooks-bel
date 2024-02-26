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
        min={left}
        max={right}
        value={left}
        onChange={onChange}
        className={styles.indicator}
      />
      <div className={styles.times}>
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
};
