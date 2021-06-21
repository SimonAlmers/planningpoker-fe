import { motion } from "framer-motion";
import React from "react";
import styles from "./HeroBanner.module.scss";

const HeroBanner = (): JSX.Element => (
  <div className={styles.heroBanner}>
    <motion.h1
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${styles.heroTitle} text-center text-8xl md:text-9xl`}
    >
      Planning Poker
    </motion.h1>
  </div>
);
export default HeroBanner;
