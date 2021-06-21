import Head from "next/head";
import React from "react";
import { useRouter } from "next/dist/client/router";
import SessionChat from "./components/SessionChat";
import StoryList from "./components/StoryList";
import VoteManager from "./components/VoteManager/VoteManager";
import styles from "./SessionDetail.module.scss";
import { objectToArray } from "helpers/RealTimeKit";
import BreadCrumbs from "components/BreadCrumbs";
import RouteKit from "helpers/RouteKit";
import SessionParticipantList from "./components/SessionParticipantList";
import isParticipantOnline from "./components/SessionParticipantList/isParticipantOnline";
import { useHeartBeat, useParticipants, useRealtimeSession } from "./hooks";
import { useProjectTitle } from "helpers/hooks";

const SessionDetailView = (): JSX.Element => {
  const router = useRouter();
  const projectId = router.query.projectId?.toString();
  const sessionId = router.query.sessionId?.toString();
  const { session, focusedStory } = useRealtimeSession(projectId, sessionId);
  const participants = useParticipants(projectId, sessionId);
  const projectTitle = useProjectTitle(projectId);
  useHeartBeat(projectId, sessionId);

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
