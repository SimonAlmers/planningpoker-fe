const BaseRoutes = {
  home: {
    href: "/",
    as: "/",
  },
  register: (next?: string) => ({
    href: "/register",
    as: `/register${next !== undefined ? `?next=${next}` : ""}`,
  }),
  login: (next?: string) => ({
    href: "/login",
    as: `/login${next !== undefined ? `?next=${next}` : ""}`,
  }),
};

export default BaseRoutes;
