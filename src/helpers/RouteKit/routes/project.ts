const ProjectRoutes = {
  list: {
    href: "/projects",
    as: "/projects",
  },
  detail: (projectId: string) => ({
    href: "/projects/[projectId]",
    as: `/projects/${projectId}`,
  }),
  story: (projectId: string, storyId: string) => ({
    href: "/projects/[projectId]/stories/[storyId]",
    as: `/projects/${projectId}/stories/${storyId}`,
  }),
  members: (projectId: string) => ({
    href: "/projects/[projectId]/members",
    as: `/projects/${projectId}/members`,
  }),
  join: (inviteCode: string) => ({
    href: "/projects/join/[inviteCode]",
    as: `/projects/join/${inviteCode}`,
  }),
  settings: (projectId: string) => ({
    href: "/projects/[projectId]/settings",
    as: `/projects/${projectId}/settings`,
  }),
  sessions: {
    detail: (projectId: string, sessionId: string) => ({
      href: "/projects/[projectId]/sessions/[sessionId]",
      as: `/projects/${projectId}/sessions/${sessionId}`,
    }),
  },
};

export default ProjectRoutes;
