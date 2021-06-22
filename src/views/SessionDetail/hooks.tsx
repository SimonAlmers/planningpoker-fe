import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import RealTimeKit from "helpers/RealTimeKit";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export const useParticipants = (projectId: string, sessionId: string) => {
  const [participants, setParticipants] = useState({});

  const handleSnapshot = (snapshot) => {
    const participant = snapshot.val();
    setParticipants((prev) => ({ ...prev, [participant.id]: participant }));
  };

  useEffect(() => {
    const participantConnection = RealTimeKit.session.participants(
      projectId,
      sessionId
    );

    participantConnection.onChildAdded(handleSnapshot);
    participantConnection.onChildChanges(handleSnapshot);

    return () => {
      participantConnection.off();
    };
  }, [projectId, sessionId]);

  return participants;
};

type Session = {
  id: string;
  focusedStory: Story | null;
  stories: Story[];
};

export const useRealtimeSession = (projectId: string, sessionId: string) => {
  const router = useRouter();
  const [focusedStory, setFocusedStory] = useState<Story>();
  const [session, setSession] = useState<Session | null>(null);

  const fetchSession = async () => {
    try {
      const { data } = await APIKit.planningsessions.getSession(
        projectId,
        sessionId
      );
      setSession(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchSession();

    const ref = RealTimeKit.session.focusedStory(projectId, sessionId);
    ref.onValue((snapshot) => setFocusedStory(snapshot.val()));

    return () => {
      ref.off();
    };
  }, [router]);

  return { focusedStory, session };
};

export const useHeartBeat = (projectId: string, sessionId: string) => {
  const { heartbeat, exit } = APIKit.planningsessions.participant;

  const sendHeartBeat = () =>
    heartbeat(projectId, sessionId).catch(handleError);

  const leaveSession = () => exit(projectId, sessionId).catch(handleError);

  useEffect(() => {
    sendHeartBeat();
    return () => {
      leaveSession();
    };
  }, [projectId, sessionId]);
};
