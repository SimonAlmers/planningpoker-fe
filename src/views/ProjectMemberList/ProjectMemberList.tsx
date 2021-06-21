import APIKit from "helpers/APIKit";
import RouteKit from "helpers/RouteKit";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SnackBarContext, UserContext } from "pages/_app";
import { PROJECT_MEMBER_ROLES } from "helpers/Constants";
import ProfileIcon from "components/ProfileIcon";

const InviteModal = ({
  isOpen,
  toggle,
  link,
}: {
  isOpen: boolean;
  toggle: () => void;
  link: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    setFullUrl(
      window?.location.protocol +
        "//" +
        window?.location.hostname +
        (window?.location.port ? ":" + window?.location.port : "")
    );
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        toggle();
        setIsCopied(false);
      }}
      contentClassName="bg-transparent"
    >
      <div className="bg-gray-700 px-4 py-10 rounded-lg text-white mt-48">
        <h1 className="text-3xl font-bold">Invite Members</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          aut ullam tenetur explicabo?
        </p>
        <fieldset className="mt-3 flex flex-wrap">
          <label className="font-bold mb-0 w-full" htmlFor="">
            Invite Link
          </label>
          <input
            className="bg-gray-600 p-2 flex-fill rounded-l-sm"
            type="text"
            value={`${fullUrl}${link}`}
          />
          <CopyToClipboard
            text={`${fullUrl}${link}`}
            onCopy={() => setIsCopied(true)}
          >
            <button className="bg-yellow-400 text-black rounded-r-sm px-3 font-bold">
              Copy
            </button>
          </CopyToClipboard>
        </fieldset>
        {isCopied && <p>Copied to your clipboard!</p>}
      </div>
    </Modal>
  );
};

const ProjectMemberListView = (): JSX.Element => {
  const { handleError } = useContext(SnackBarContext);
  const { user } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [displayInviteModal, setDisplayInviteModal] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const router = useRouter();
  const projectId = router.query.projectId?.toString();

  const isOwner = () => {
    const myMember = members.find((member) => member.user.id === user?.id);
    return myMember?.role === 3;
  };

  const toggleInviteModal = () => {
    setDisplayInviteModal((prev) => !prev);
  };

  const fetchInviteLink = async () => {
    try {
      const { data } = await APIKit.projects.invites.getInviteCode(projectId);
      setInviteLink(RouteKit.project.join(data.id).as);
      setDisplayInviteModal(true);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchMembers = async () => {
    try {
      const { data } = await APIKit.projects.members.getMembers(projectId);
      setMembers(data.results);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteMember = async (memberId: string) => {
    await APIKit.projects.members.deleteMember(projectId, memberId);
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, [router]);

  return (
    <div className="pt-48 bg-gray-900 h-screen flex flex-wrap justify-center items-start text-white">
      <InviteModal
        isOpen={displayInviteModal}
        toggle={toggleInviteModal}
        link={inviteLink}
      />
      <div className="max-w-7xl w-full">
        <div className=" flex justify-between items-start">
          <h1 className="text-xl font-bold">Project Members</h1>
          <button
            onClick={fetchInviteLink}
            className="btn bg-yellow-400 text-black font-bold"
          >
            <i className="fas fa-user-plus mr-2" /> Invite members
          </button>
        </div>
        <table className="w-full mt-12">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-4 pl-4">Member</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-gray-700">
                <td className="p-4 font-bold flex items-center">
                  <ProfileIcon initials={member.user.initials} size="lg" />
                  <span className="ml-4">
                    {member.user.firstName} {member.user.lastName}
                  </span>
                </td>
                <td>{PROJECT_MEMBER_ROLES[member.role]}</td>
                <td className="text-right pr-4">
                  {isOwner() && (
                    <button
                      onClick={() => deleteMember(member.id)}
                      className="btn bg-red-900 font-bold"
                    >
                      {member.user.id === user.id ? "Leave Project" : "Remove"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProjectMemberListView;
