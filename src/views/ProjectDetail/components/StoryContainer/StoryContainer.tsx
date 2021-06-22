import StoryListItem from "components/StoryListItem";
import RouteKit from "helpers/RouteKit";
import Link from "next/link";
import React from "react";

const StoryContainer = ({
  title,
  button,
  stories,
  projectId,
}: {
  title: string;
  stories: Story[];
  projectId: string;
  button?: { label: string; onClick: () => void };
}) => (
  <div className="bg-gray-800 p-2 rounded-sm">
    <div className="flex justify-between items-center  mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {button && (
        <button
          onClick={button.onClick}
          className="btn border-2 border-yellow-400 text-yellow-400 font-bold"
        >
          {button.label}
        </button>
      )}
    </div>
    <ul>
      {stories.map((story) => {
        const storyDetailRoute = RouteKit.project.story(projectId, story.id);
        return (
          <Link
            key={story.id}
            href={storyDetailRoute.href}
            as={storyDetailRoute.as}
          >
            <a>
              <StoryListItem
                story={story}
                highlighted={false}
                className="mb-2"
              />
            </a>
          </Link>
        );
      })}
    </ul>
  </div>
);

export default StoryContainer;
