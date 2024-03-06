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
}: TrackProgressProps) => (
  <div>
    <input
      type="range"
      min={0}
      max={right}
      value={left}
      onChange={onChange}
      className={styles.indicator}
      style={{
        background: `linear-gradient(90deg, #4838d1 ${
          (left * 100) / right
        }%, #bbb1fa ${(left * 100) / right}%)`,
      }}
    />
    <div className={styles.times}>
      <span className={styles.time}>{leftLabel}</span>
      <span className={styles.time}>{rightLabel}</span>
    </div>
  </div>
);
