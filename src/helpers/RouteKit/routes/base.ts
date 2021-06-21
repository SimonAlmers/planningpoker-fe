const BaseRoutes = {
  home: {
    href: "/",
    as: "/",
  },
  register: (next?: string) => ({
    href: `/signup${
      next !== undefined ? `?next=${encodeURIComponent(next)}` : ""
    }`,
    as: `/signup${
      next !== undefined ? `?next=${encodeURIComponent(next)}` : ""
    }`,
  }),
  settings: {
    href: "/settings",
    as: `/settings`,
  },
  login: (next?: string) => ({
    href: `/login${
      next !== undefined ? `?next=${encodeURIComponent(next)}` : ""
    }`,
    as: `/login${
      next !== undefined ? `?next=${encodeURIComponent(next)}` : ""
    }`,
  }),
  logout: {
    href: "/logout",
    as: `/logout`,
  },
};

export default BaseRoutes;
