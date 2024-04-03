import styles from "./Slider.module.scss";

export const Slider = ({
  speed,
  setSpeed,
}: {
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}) => (
  <div className={styles.slider_container}>
    <input
      type="range"
      min="0"
      max="10"
      value={speed}
      step="1"
      onChange={(e) => setSpeed(Number(e.target.value))}
    />
  </div>
);
