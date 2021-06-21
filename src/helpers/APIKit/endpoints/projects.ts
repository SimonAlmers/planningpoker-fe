import HTTPKit from "helpers/HTTPKit";

const ProjectEndpoints = {
  createProject: (payload: { title: string; description?: string }) => {
    const url = "/api/v1/projects/";
    return HTTPKit.post(url, payload);
  },
  getProjects: (search?: string) => {
    const url = "/api/v1/projects/";
    return HTTPKit.get(url, { search });
  },
  getProject: (id: string) => {
    const url = `/api/v1/projects/${id}/`;
    return HTTPKit.get(url);
  },
  updateProject: (id: string, newState: any) => {
    const url = `/api/v1/projects/${id}/`;
    return HTTPKit.patch(url, newState);
  },
  deleteProject: (id: string) => {
    const url = `/api/v1/projects/${id}/`;
    return HTTPKit.delete(url, {});
  },
  invites: {
    getInviteCode: (projectId: string) => {
      const url = `/api/v1/projects/${projectId}/invite_code/`;
      return HTTPKit.get(url);
    },
    acceptInvite: (inviteCode: string) => {
      const url = `/api/v1/projects/join/`;
      return HTTPKit.post(url, { inviteCode });
    },
  },
  members: {
    getMembers: (projectId: string) => {
      const url = `/api/v1/projects/${projectId}/members/`;
      return HTTPKit.get(url);
    },
    deleteMember: (projectId: string, memberId: string) => {
      const url = `/api/v1/projects/${projectId}/members/${memberId}/`;
      return HTTPKit.delete(url, {});
    },
  },
};

export default ProjectEndpoints;
