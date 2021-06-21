import ProfileIcon from "components/ProfileIcon";
import React from "react";
import isParticipantOnline from "../../isParticipantOnline";
import StatusIndicator from "../StatusIndicator";

const ParticipantListItem = ({
  participant: { user, lastSeen, lastExit },
}: {
  participant: SessionParticipant;
}): JSX.Element => {
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
export default ParticipantListItem;
