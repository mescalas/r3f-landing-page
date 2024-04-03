import styles from "./BottomLeft.module.scss";
import { motion } from "framer-motion";

export const BottomLeft = () => (
  <div className={styles.bottom_left_container}>
    <div className={styles.animation_container}>
      <motion.p
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
          transition: { delay: 2.5, duration: 0.8 },
        }}
      >
        <i>Inspiration</i> and ideas
      </motion.p>
    </div>
    <div className={styles.animation_container}>
      <motion.p
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
          transition: { delay: 2.6, duration: 0.8 },
        }}
      >
        <i>Fundamentals</i>
      </motion.p>
    </div>
    <div className={styles.animation_container}>
      <motion.p
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
          transition: { delay: 2.7, duration: 0.8 },
        }}
      >
        <i>Finding</i> models
      </motion.p>
    </div>
    <div className={styles.animation_container}>
      <motion.p
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
          transition: { delay: 2.8, duration: 0.8 },
        }}
      >
        <i>Preparing</i> them for the web
      </motion.p>
    </div>
    <div className={styles.animation_container}>
      <motion.p
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
          transition: { delay: 2.9, duration: 0.8 },
        }}
      >
        <i>Displaying</i> and changing models
      </motion.p>
    </div>
    <div className={styles.animation_container}>
      <motion.p
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
          transition: { delay: 3, duration: 0.8 },
        }}
      >
        <i>Animation</i> fundamentals
      </motion.p>
    </div>
    <div className={styles.animation_container}>
      <motion.p
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
          transition: { delay: 3.1, duration: 0.8 },
        }}
      >
        <i>Effects</i> and making things look good
      </motion.p>
    </div>
    <div className={styles.animation_container}>
      <motion.p
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
          transition: { delay: 3.2, duration: 0.8 },
        }}
      >
        Preparing for <i>performance</i> and time to load
      </motion.p>
    </div>
  </div>
);
