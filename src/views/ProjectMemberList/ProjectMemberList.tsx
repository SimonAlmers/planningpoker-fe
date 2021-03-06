import Head from "next/head";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import BreadCrumbs from "components/BreadCrumbs";
import InviteModal from "./components/InviteModal";
import MemberTable from "./components/MemberTable/MemberTable";
import { useProjectTitle } from "helpers/hooks";

const ProjectMemberListView = (): JSX.Element => {
  const router = useRouter();
  const projectId = router.query.projectId?.toString();
  const projectTitle = useProjectTitle(projectId);
  const [displayInviteModal, setDisplayInviteModal] = useState(false);

  const toggleInviteModal = () => {
    setDisplayInviteModal((prev) => !prev);
  };

  return (
    <div className="pt-48 bg-gray-900 h-screen flex flex-wrap justify-center items-start text-white">
      <Head>
        <title>Project Members |┬áPlanning Poker</title>
      </Head>
      <InviteModal
        projectId={projectId}
        isOpen={displayInviteModal}
        toggle={toggleInviteModal}
      />
      <div className="max-w-7xl w-full">
        <div className=" flex justify-between items-start">
          <BreadCrumbs
            links={[
              { label: "Projects", url: RouteKit.project.list },
              {
                label: projectTitle,
                url: RouteKit.project.detail(projectId),
              },
              { label: "Project Members", url: RouteKit.project.list },
            ]}
          />
          <button
            onClick={() => setDisplayInviteModal(true)}
            className="btn bg-yellow-400 text-black font-bold"
          >
            <i className="fas fa-user-plus mr-2" /> Invite members
          </button>
        </div>
        <MemberTable projectId={projectId} />
      </div>
    </div>
  );
};
export default ProjectMemberListView;
