import APIKit from "helpers/APIKit";
import { STORY_POINT_SET } from "helpers/Constants";
import { SnackBarContext } from "pages/_app";
import React, { useContext } from "react";
import styles from "../../../../SessionDetail.module.scss";
import Card from "../Cards";

const CardContainer = ({
  story: { id, projectId },
  myVote,
}: {
  story: {
    id: string;
    projectId: string;
  };
  myVote: Vote;
}): JSX.Element => {
  const { handleError } = useContext(SnackBarContext);
  const { castVote, updateVote } = APIKit.planningsessions.vote;

  const vote = async (point: number) => {
    try {
      if (myVote) {
        await updateVote(projectId, id, myVote.id, point);
      } else {
        await castVote(projectId, id, point);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div
      className={`${styles.cardContainer} bg-green-800 rounded-t-lg p-5 flex justify-around`}
    >
      {STORY_POINT_SET.map(({ point, text }) => (
        <Card
          key={`card-${point}`}
          selected={myVote?.point === point}
          onClick={() => vote(point)}
          points={text}
        />
      ))}
    </div>
  );
};
export default CardContainer;
