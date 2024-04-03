import { Suspense, useState } from "react";
import Basketballs from "./components/Baskellballs/Basketballs";
import styles from "./App.module.scss";
import { MambaBrand } from "./components/MambaBrand/MambaBrand";
import { Slider } from "./components/Slider/Slider";
import { BottomLeft } from "./components/BottomLeft/BottomLeft";

export default function App() {
  const [speed, set] = useState(1);
  return (
    <>
      <Suspense fallback={null}>
        <Basketballs speed={speed} />
        <div className={styles.fade_in} />
      </Suspense>
      <div className={styles.title}>
        <p>
          <i>Mamba</i>
        </p>
        <p>Mentality</p>
        <p className={styles.subtitle}>
          In <i>React</i> & <i>Three</i>.js —
        </p>
      </div>
      <MambaBrand />
      <Slider speed={speed} setSpeed={set} />
      <BottomLeft />
    </>
  );
}
