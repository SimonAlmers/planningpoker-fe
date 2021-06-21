const isParticipantOnline = (lastSeen, lastExit) => {
  if (lastSeen === "None" && lastExit === "None") return false;
  if (lastSeen !== "None" && lastExit === "None") return true;
  return new Date(lastSeen) > new Date(lastExit);
};

export default isParticipantOnline;
