import { motion } from "framer-motion";
import { STORY_POINT_SET } from "helpers/Constants";
import React from "react";
import styles from "./Vote.module.scss";

const variants = {
  vote: {
    initial: { y: 100, opacity: 0 },
    end: { y: 0, opacity: 1 },
  },
  card: {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  },
};

const Vote = ({
  displayPoints,
  vote: { point, user },
}: {
  displayPoints: boolean;
  vote: { point: number; user: { firstName: string } };
}): JSX.Element => {
  return (
    <motion.div
      initial="initial"
      animate="end"
      variants={variants.vote}
      className="mr-2"
    >
      <motion.div
        initial="back"
        animate={displayPoints ? "front" : "back"}
        variants={variants.card}
        transition={{ duration: 1 }}
      >
        <div
          style={{
            backgroundImage: displayPoints
              ? "url(/img/white.png)"
              : "url(/img/cardback@2x.jpg)",
            backgroundSize: "cover",
          }}
          className={`${styles.card}`}
        >
          <h1 className="text-black" style={{ opacity: displayPoints ? 1 : 0 }}>
            {STORY_POINT_SET.find((i) => i.point === point).text}
          </h1>
        </div>
      </motion.div>
      <p className="block text-white">{user.firstName}</p>
    </motion.div>
  );
};
export default Vote;
