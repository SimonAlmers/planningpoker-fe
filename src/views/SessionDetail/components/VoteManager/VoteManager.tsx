import RealTimeKit, { objectToArray } from "helpers/RealTimeKit";
import { UserContext } from "pages/_app";
import React, { useContext, useEffect, useState } from "react";
import FocusedStory from "../FocusedStory";
import CardContainer from "./components/CardContainer";
import VoteContainer from "./components/VoteContainer";

const VoteManager = ({
  focusedStory,
  projectId,
  activeParticipants,
}: {
  focusedStory: Story;
  projectId: string;
  activeParticipants: number;
}): JSX.Element => {
  const [votes, setVotes] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    setVotes({});
    const storyVoteConnection = RealTimeKit.story.votes(
      projectId,
      focusedStory.id
    );
    storyVoteConnection.onChildAdded((snapshot) => {
      const vote = snapshot.val();
      setVotes((prev) => ({ ...prev, [vote.id]: vote }));
    });
    storyVoteConnection.onChildChanges((snapshot) => {
      const vote = snapshot.val();
      setVotes((prev) => ({ ...prev, [vote.id]: vote }));
    });

    return () => {
      storyVoteConnection.off();
    };
  }, [projectId, focusedStory]);
  return (
    <>
      <FocusedStory story={focusedStory} />
      <VoteContainer
        votes={objectToArray(votes)}
        activeParticipants={activeParticipants}
      />
      <CardContainer
        story={focusedStory}
        myVote={objectToArray(votes).find(
          (vote: Vote) => vote.user.id === user.id
        )}
      />
    </>
  );
};
export default VoteManager;
