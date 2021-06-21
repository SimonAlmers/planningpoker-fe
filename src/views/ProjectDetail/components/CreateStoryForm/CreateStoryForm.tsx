import APIKit from "helpers/APIKit";
import handleError from "helpers/ErrorKit";
import React, { useState } from "react";

const CreateStoryForm = ({
  projectId,
  onSubmitCallback,
}: {
  projectId: string;
  onSubmitCallback: () => void;
}): JSX.Element => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await APIKit.stories.createStory(projectId, { title, description });
      onSubmitCallback();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form
      className="bg-gray-800 rounded-md p-4 text-white"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl mb-4 font-bold">Create Story</h1>
      <fieldset className="mb-3">
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
      <button className="float-right btn bg-green-500">Save</button>
    </form>
  );
};
export default CreateStoryForm;
