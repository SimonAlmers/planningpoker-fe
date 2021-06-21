import RealTimeKit, { objectToArray } from "helpers/RealTimeKit";
import React, { useEffect, useState } from "react";
import styles from "../../../../SessionDetail.module.scss";
import Vote from "../Vote/Vote";

const VoteContainer = ({
  votes,
  activeParticipants,
}: {
  votes: Vote[];
  activeParticipants: number;
}): JSX.Element => {
  const [displayVotes, setDisplayVotes] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplayVotes(objectToArray(votes).length >= activeParticipants);
    }, 500);
  }, [votes]);

  return (
    <div className={`${styles.votes} bg-gray-800 rounded-lg p-5 `}>
      <button
        onClick={() => setDisplayVotes((prev) => !prev)}
        className="float-right btn bg-gray-600 font-bold"
      >
        {displayVotes ? (
          <span>
            <i className="fas fa-eye-slash mr-2" />
            Hide Votes
          </span>
        ) : (
          <span>
            <i className="fas fa-eye mr-2" />
            Show Votes
          </span>
        )}
      </button>
      <div className="flex justify-start">
        {votes.map((vote) => (
          <Vote key={vote.id} displayPoints={displayVotes} vote={vote} />
        ))}
      </div>
    </div>
  );
};
export default VoteContainer;
