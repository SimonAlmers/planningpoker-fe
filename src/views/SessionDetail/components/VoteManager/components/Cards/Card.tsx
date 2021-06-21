import { motion } from "framer-motion";
import React from "react";
import styles from "./Card.module.scss";

const cardVariants = {
  start: { scale: 0, rotate: -90, y: 500 },
  end: { scale: 1, rotate: 0, y: 0 },
  selected: { scale: 1, rotate: 0, y: -120 },
};

const Card = ({
  points,
  selected,
  onClick,
}: {
  points: string;
  selected: boolean;
  onClick: () => void;
}): JSX.Element => {
  return (
    <motion.button
      key={`card-${points}`}
      style={{ outline: "none" }}
      className=""
      initial="start"
      animate={selected ? "selected" : "end"}
      transition={{ duration: 0.5 }}
      variants={cardVariants}
      onClick={onClick}
    >
      <div className={styles.card}>
        <h1 className="text-black">{points}</h1>
      </div>
    </motion.button>
  );
};
export default Card;
