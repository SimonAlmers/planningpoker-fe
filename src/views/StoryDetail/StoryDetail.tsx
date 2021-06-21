import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import APIKit from "helpers/APIKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import { SnackBarContext } from "pages/_app";
import BreadCrumbs from "components/BreadCrumbs";

const StoryDetailView = (): JSX.Element => {
  const router = useRouter();
  const { handleError } = useContext(SnackBarContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const projectId = router.query.projectId?.toString();
  const storyId = router.query.storyId?.toString();

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

  const fetchStory = async () => {
    try {
      const { data } = await APIKit.stories.getStory(projectId, storyId);
      setTitle(data.title);
      setDescription(data.description);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (projectId && storyId) fetchStory();
  }, [router.query]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await APIKit.stories.updateStory(projectId, storyId, {
        title,
        description,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const deleteStory = async () => {
    try {
      await APIKit.stories.deleteStory(projectId, storyId);
      router.push(
        RouteKit.project.detail(projectId).href,
        RouteKit.project.detail(projectId).as
      );
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="bg-gray-900 h-screen text-white pt-48 text-white flex justify-center">
      <Head>
        <title>{title || "Story"} | Planning Poker</title>
      </Head>
      <form className="max-w-7xl w-full" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <BreadCrumbs
            links={[
              { label: "Projects", url: RouteKit.project.list },
              {
                label: projectTitle,
                url: RouteKit.project.detail(projectId),
              },
              { label: title, url: { href: "", as: "" } },
            ]}
          />

          <div>
            <button
              onClick={deleteStory}
              className="btn font-bold bg-red-700 mr-2"
            >
              Delete
            </button>
            <button type="submit" className="btn font-bold bg-green-500">
              Save
            </button>
          </div>
        </div>
        <fieldset className="mb-3 pt-12">
          <label className="block font-bold" htmlFor="title">
            Title
          </label>
          <input
            className="w-full rounded-sm bg-gray-700 py-2 px-3"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give the story a descriptive title"
          />
        </fieldset>
        <fieldset className="mb-3">
          <label className="block font-bold" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full rounded-sm bg-gray-700 py-2 px-3"
            id="description"
            name="description"
            value={description}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description"
          />
        </fieldset>
      </form>
    </div>
  );
};
export default StoryDetailView;
