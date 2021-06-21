import HTTPKit from "helpers/HTTPKit";

const PlanningSessionEndpoints = {
  createSession: (projectId: string, stories: string[]) => {
    const url = `/api/v1/projects/${projectId}/sessions/`;
    return HTTPKit.post(url, { stories });
  },
  getSession: (projectId: string, sessionId: string) => {
    const url = `/api/v1/projects/${projectId}/sessions/${sessionId}/`;
    return HTTPKit.get(url);
  },
  updateSession: (projectId: string, sessionId: string, payload: object) => {
    const url = `/api/v1/projects/${projectId}/sessions/${sessionId}/`;
    return HTTPKit.patch(url, payload);
  },
  addParticipants: (projectId: string, sessionId: string, userId: string) => {
    const url = `/api/v1/projects/${projectId}/sessions/${sessionId}/`;
    return HTTPKit.post(url, { userId });
  },
  participant: {
    heartbeat: (projectId: string, sessionId: string) => {
      const url = `/api/v1/projects/${projectId}/sessions/${sessionId}/participants/heartbeat/`;
      return HTTPKit.post(url, {});
    },
    exit: (projectId: string, sessionId: string) => {
      const url = `/api/v1/projects/${projectId}/sessions/${sessionId}/participants/exit/`;
      return HTTPKit.post(url, {});
    },
  },
  chat: {
    postMessage: (
      projectId: string,
      sessionId: string,
      payload: { text: string; parent?: string }
    ) => {
      const url = `/api/v1/projects/${projectId}/sessions/${sessionId}/comments/`;
      return HTTPKit.post(url, payload);
    },
  },
  vote: {
    getVotes: (projectId: string, storyId: string) => {
      const url = `/api/v1/projects/${projectId}/stories/${storyId}/votes/`;
      return HTTPKit.get(url);
    },
    castVote: (projectId: string, storyId: string, point: number) => {
      const url = `/api/v1/projects/${projectId}/stories/${storyId}/votes/`;
      return HTTPKit.post(url, { point });
    },
    updateVote: (
      projectId: string,
      storyId: string,
      voteId: string,
      point: number
    ) => {
      const url = `/api/v1/projects/${projectId}/stories/${storyId}/votes/${voteId}/`;
      return HTTPKit.patch(url, { point });
    },
  },
};

export default PlanningSessionEndpoints;
