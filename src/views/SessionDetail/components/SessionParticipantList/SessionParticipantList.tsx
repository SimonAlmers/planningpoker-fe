import React from "react";
import styles from "../../SessionDetail.module.scss";
import ParticipantListItem from "./components/ParticipantListItem";

const SessionParticipantList = ({
  participants,
}: {
  participants: SessionParticipant[];
}): JSX.Element => {
  return (
    <div className={`${styles.participants} bg-gray-800 p-3`}>
      <h1 className="font-bold text-xl">Participants</h1>
      <ul>
        {participants.map((participant) => (
          <ParticipantListItem key={participant.id} participant={participant} />
        ))}
      </ul>
    </div>
  );
};
export default SessionParticipantList;
