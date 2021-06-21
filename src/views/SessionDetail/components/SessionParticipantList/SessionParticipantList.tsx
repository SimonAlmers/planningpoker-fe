import ProfileIcon from "components/ProfileIcon";
import React from "react";
import styles from "../../SessionDetail.module.scss";

const StatusIndicator = ({ isOnline }: { isOnline: boolean }) => (
  <i
    className={`${styles.statusIndicator} ${
      isOnline ? styles.isOnline : styles.isOffline
    }`}
  />
);

export const isParticipantOnline = (lastSeen, lastExit) => {
  if (lastSeen === "None" && lastExit === "None") return false;
  if (lastSeen !== "None" && lastExit === "None") return true;
  return new Date(lastSeen) > new Date(lastExit);
};

const ParticipantListItem = ({
  participant: { user, lastSeen, lastExit },
}: {
  participant: {
    user: { id: string; firstName: string; lastName: string; initials: string };
    lastSeen: string;
    lastExit: string;
  };
}) => {
  return (
    <li className="flex items-center py-2">
      <ProfileIcon initials={user.initials} />
      <span className="ml-2 w-full">
        {user.firstName} {user.lastName}
      </span>
      <StatusIndicator isOnline={isParticipantOnline(lastSeen, lastExit)} />
    </li>
  );
};

const SessionParticipantList = ({
  participants,
}: {
  participants: [];
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
