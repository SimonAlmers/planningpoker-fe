import Head from "next/head";
import EmptyState from "components/EmptyState";
import APIKit from "helpers/APIKit";

import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";

import React from "react";
import handleError from "helpers/ErrorKit";

const JoinProjectView = (): JSX.Element => {
  const router = useRouter();
  const inviteCode = router.query.inviteCode?.toString();

  const joinProject = async () => {
    try {
      const { data } = await APIKit.projects.invites.acceptInvite(inviteCode);
      const projectRoute = RouteKit.project.detail(data.projectId);
      router.push(projectRoute.href, projectRoute.as);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="pt-32 bg-gray-900 h-screen flex justify-center text-white">
      <Head>
        <title>Join Project | Planning Poker</title>
      </Head>
      <div className="max-w-7xl w-full">
        <EmptyState
          img="/img/illustrations/project_join.svg"
          title="Join this project?"
          bodyCopy="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dicta pariatur corporis aspernatur sunt? Officia iste magni, libero quibusdam quam ullam eum quia asperiores quae non vitae hic exercitationem excepturi. "
          button={{ label: "Join Project", onClick: joinProject }}
        />
      </div>
    </div>
  );
};
export default JoinProjectView;
