import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import React, { useState } from "react";

const CreateProjectForm = ({
  projectCreateCallback,
}: {
  projectCreateCallback: (project: Project) => void;
}): JSX.Element => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    APIKit.projects
      .createProject({
        title,
        description,
      })
      .then(({ data }) => {
        projectCreateCallback(data);
        setTitle("");
        setDescription("");
      })
      .catch(handleError);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-700 p-4 rounded-lg text-white"
    >
      <h1 className="text-2xl font-bold">Create Project</h1>
      <fieldset className="mt-3">
        <label className="block font-bold mb-0" htmlFor="name">
          Project name
        </label>
        <input
          required
          className="bg-gray-600 py-2 px-3 rounded-sm w-full"
          type="text"
          name="name"
          id="name"
          value={title}
          onChange={handleTitleChange}
          placeholder="My Project"
        />
      </fieldset>
      <fieldset className="mt-3">
        <label className="block font-bold mb-0" htmlFor="description">
          Description
        </label>
        <textarea
          className="bg-gray-600 py-2 px-3 rounded-sm w-full"
          name="description"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="My Project"
        />
      </fieldset>
      <button className="bg-yellow-400 mt-3 text-black btn w-full font-bold">
        Create Project
      </button>
    </form>
  );
};
export default CreateProjectForm;
