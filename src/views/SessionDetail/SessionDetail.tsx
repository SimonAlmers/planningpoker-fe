import React, { useContext, useEffect, useState } from "react";
import APIKit from "helpers/APIKit";
import { useRouter } from "next/dist/client/router";
import { SnackBarContext } from "pages/_app";
import SessionChat from "./components/SessionChat";
import StoryList from "./components/StoryList";
import VoteManager from "./components/VoteManager/VoteManager";
import styles from "./SessionDetail.module.scss";
import RealTimeKit from "helpers/RealTimeKit";

type Session = {
  id: string;
  focusedStory: Story | null;
  stories: Story[];
};

const SessionDetailView = (): JSX.Element => {
  const { handleError } = useContext(SnackBarContext);
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
      console.log({ snap: snapshot.val() });
      setFocusedStory(snapshot.val());
    });

    return () => {
      ref.off();
    };
  }, [router]);

  return (
    <div className="bg-gray-900 text-white pt-32 h-screen ">
      {session && (
        <div className={styles.sesssionGrid}>
          <StoryList
            stories={session.stories}
            focusedStoryId={focusedStory?.id}
            projectId={projectId}
            sessionId={sessionId}
          />
          {focusedStory && (
            <VoteManager projectId={projectId} focusedStory={focusedStory} />
          )}
          <SessionChat projectId={projectId} sessionId={sessionId} />
        </div>
      )}
    </div>
  );
};
export default SessionDetailView;
