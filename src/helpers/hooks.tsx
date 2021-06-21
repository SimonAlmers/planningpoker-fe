import { useEffect, useState } from "react";
import APIKit from "./APIKit";

export const useProjectTitle = (projectId: string) => {
  const [projectTitle, setProjectTitle] = useState("");
  const fetchProjectTitle = async () => {
    try {
      const { data } = await APIKit.projects.getProject(projectId);
      setProjectTitle(data.title);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProjectTitle();
  }, []);

  return projectTitle;
};
