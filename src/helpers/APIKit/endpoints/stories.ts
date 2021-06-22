import HTTPKit from "helpers/HTTPKit";

const StoryEndpoints = {
  createStory: (
    projectId: string,
    payload: { title: string; description?: string }
  ) => {
    const url = `/api/v1/projects/${projectId}/stories/`;
    return HTTPKit.post(url, payload);
  },
  getStory: (projectId: string, storyId: string) => {
    const url = `/api/v1/projects/${projectId}/stories/${storyId}/`;
    return HTTPKit.get(url);
  },
  updateStory: (projectId: string, storyId: string, newState) => {
    const url = `/api/v1/projects/${projectId}/stories/${storyId}/`;
    return HTTPKit.patch(url, newState);
  },
  deleteStory: (projectId: string, storyId: string) => {
    const url = `/api/v1/projects/${projectId}/stories/${storyId}/`;
    return HTTPKit.delete(url, {});
  },
  comments: {
    postComment: (
      projectId: string,
      storyId: string,
      payload: { text: string }
    ) => {
      const url = `/api/v1/projects/${projectId}/stories/${storyId}/comments/`;
      return HTTPKit.post(url, payload);
    },
  },
};

export default StoryEndpoints;
