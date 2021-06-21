import Head from "next/head";
import React, { useEffect, useState } from "react";
import APIKit from "helpers/APIKit";
import { useRouter } from "next/dist/client/router";
import SessionChat from "./components/SessionChat";
import StoryList from "./components/StoryList";
import VoteManager from "./components/VoteManager/VoteManager";
import styles from "./SessionDetail.module.scss";
import RealTimeKit, { objectToArray } from "helpers/RealTimeKit";
import BreadCrumbs from "components/BreadCrumbs";
import RouteKit from "helpers/RouteKit";
import handleError from "helpers/ErrorKit";
import SessionParticipantList from "./components/SessionParticipantList";
import { isParticipantOnline } from "./components/SessionParticipantList/SessionParticipantList";

type Session = {
  id: string;
  focusedStory: Story | null;
  stories: Story[];
};

const SessionDetailView = (): JSX.Element => {
  const router = useRouter();
  const [focusedStory, setFocusedStory] =
    useState<{
      description: string;
      id: string;
      projectId: string;
      title: string;
    }>();
  const [session, setSession] = useState<Session | null>(null);
  const projectId = router.query.projectId?.toString();
  const sessionId = router.query.sessionId?.toString();

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

  const [projectTitle, setProjectTitle] = useState("");
  const fetchProjectTitle = async () => {
    try {
      const { data } = await APIKit.projects.getProject(projectId);
      setProjectTitle(data.title);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProjectTitle();
  }, []);

  const sendHeartBeat = async () => {
    await APIKit.planningsessions.participant.heartbeat(projectId, sessionId);
  };
  const leaveSession = async () => {
    await APIKit.planningsessions.participant.exit(projectId, sessionId);
  };

  useEffect(() => {
    sendHeartBeat();
    return () => {
      leaveSession();
    };
  }, [projectId, sessionId]);

  return (
    <div className="bg-gray-900 text-white pt-32 h-screen ">
      <Head>
        <title>Poker Session | Planning Poker</title>
      </Head>
      <div className="mb-4">
        <BreadCrumbs
          links={[
            { label: "Projects", url: RouteKit.project.list },
            {
              label: projectTitle,
              url: RouteKit.project.detail(projectId),
            },
            { label: "Planning Session", url: { href: "", as: "" } },
          ]}
        />
      </div>
      {session && (
        <div className={styles.sesssionGrid}>
          <StoryList
            stories={session.stories}
            focusedStoryId={focusedStory?.id}
            projectId={projectId}
            sessionId={sessionId}
          />
          <SessionParticipantList participants={objectToArray(participants)} />
          {focusedStory && (
            <VoteManager
              projectId={projectId}
              focusedStory={focusedStory}
              activeParticipants={
                objectToArray(participants).filter((participant) => {
                  return isParticipantOnline(
                    participant.lastSeen,
                    participant.lastExit
                  );
                }).length
              }
            />
          )}
          <SessionChat projectId={projectId} sessionId={sessionId} />
        </div>
      )}
    </div>
  );
};
export default SessionDetailView;
