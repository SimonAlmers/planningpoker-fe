type SessionParticipant = {
  id: string;
  user: { id: string; firstName: string; lastName: string; initials: string };
  lastSeen: string;
  lastExit: string;
};
