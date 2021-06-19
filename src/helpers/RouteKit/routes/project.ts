const ProjectRoutes = {
  list: {
    href: "/projects",
    as: "/projects",
  },
  detail: (id: string) => ({
    href: "/projects/[projectId]",
    as: `/projects/${id}`,
  }),
};

export default ProjectRoutes;
