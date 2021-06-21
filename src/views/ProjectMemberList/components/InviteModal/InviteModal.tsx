import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import APIKit from "helpers/APIKit";
import RouteKit from "helpers/RouteKit";
import handleError from "helpers/ErrorKit";

const InviteModal = ({
  isOpen,
  toggle,
  projectId,
}: {
  isOpen: boolean;
  toggle: () => void;
  projectId: string;
}) => {
  const [inviteLink, setInviteLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  const fetchInviteLink = async () => {
    try {
      const { data } = await APIKit.projects.invites.getInviteCode(projectId);
      setInviteLink(RouteKit.project.join(data.id).as);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchInviteLink();
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
            value={`${fullUrl}${inviteLink}`}
          />
          <CopyToClipboard
            text={`${fullUrl}${inviteLink}`}
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
export default InviteModal;
