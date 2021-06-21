type Vote = {
  createdAt: string;
  id: string;
  point: number;
  story: string;
  updatedAt: string;
  user: {
    firstName: string;
    id: string;
    initials: string;
    lastName: string;
  };
};
