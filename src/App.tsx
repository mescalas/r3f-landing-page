import { Suspense, useState } from "react";
import Basketballs from "./components/Baskellballs/Basketballs";
import styles from "./App.module.scss";
import { MambaBrand } from "./components/MambaBrand/MambaBrand";
import { Slider } from "./components/Slider/Slider";
import { BottomLeft } from "./components/BottomLeft/BottomLeft";
import { motion } from "framer-motion";

export default function App() {
  const [speed, set] = useState(1);

  return (
    <>
      <Suspense fallback={null}>
        <Basketballs speed={speed} />
        <div className={styles.fade_in} />
      </Suspense>
      <div className={styles.title}>
        <div
          style={{
            overflow: "hidden",
            height: "65px",
            padding: "2px",
            width: "100%",
          }}
        >
          <motion.p
            initial={{
              y: 100,
            }}
            animate={{
              y: 0,
              transition: { delay: 1.5, duration: 1 },
            }}
          >
            <i>Mamba</i>
          </motion.p>
        </div>
        <div style={{ overflow: "hidden", height: "82px", padding: "2px" }}>
          <motion.p
            initial={{
              y: 100,
            }}
            animate={{
              y: 0,
              transition: { delay: 1.7, duration: 1 },
            }}
          >
            Mentality
          </motion.p>
        </div>
        <div className={styles.subtitle}>
          <motion.p
            initial={{
              y: 100,
            }}
            animate={{
              y: 0,
              transition: { delay: 1.9, duration: 1 },
            }}
          >
            In <i>React</i> & <i>Three</i>.js
          </motion.p>
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: "30px",
              transition: { delay: 2, duration: 1.5 },
            }}
            className={styles.line}
          />
        </div>
      </div>
      <MambaBrand />
      <Slider speed={speed} setSpeed={set} />
      <BottomLeft />
    </>
  );
}
