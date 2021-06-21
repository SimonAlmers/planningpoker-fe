import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import RealTimeKit from "helpers/RealTimeKit";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export const useParticipants = (projectId: string, sessionId: string) => {
  const [participants, setParticipants] = useState({});

  useEffect(() => {
    const participantConnection = RealTimeKit.session.participants(
      projectId,
      sessionId
    );

    participantConnection.onChildAdded((snapshot) => {
      const participant = snapshot.val();
      setParticipants((prev) => ({ ...prev, [participant.id]: participant }));
    });

    participantConnection.onChildChanges((snapshot) => {
      const participant = snapshot.val();
      setParticipants((prev) => ({ ...prev, [participant.id]: participant }));
    });

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
    ref.onValue((snapshot) => {
      setFocusedStory(snapshot.val());
    });

    return () => {
      ref.off();
    };
  }, [router]);

  return { focusedStory, session };
};

export const useHeartBeat = (projectId: string, sessionId: string) => {
  const sendHeartBeat = async (projectId: string, sessionId: string) => {
    try {
      await APIKit.planningsessions.participant.heartbeat(projectId, sessionId);
    } catch (error) {
      handleError(error);
    }
  };
  const leaveSession = async (projectId: string, sessionId: string) => {
    try {
      await APIKit.planningsessions.participant.exit(projectId, sessionId);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    sendHeartBeat(projectId, sessionId);
    return () => {
      leaveSession(projectId, sessionId);
    };
  }, [projectId, sessionId]);
};
