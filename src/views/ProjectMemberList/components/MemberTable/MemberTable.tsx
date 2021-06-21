import ProfileIcon from "components/ProfileIcon";
import APIKit from "helpers/APIKit";
import { PROJECT_MEMBER_ROLES } from "helpers/Constants";
import { SnackBarContext, UserContext } from "pages/_app";
import React, { useContext, useEffect, useState } from "react";

const MemberTable = ({ projectId }: { projectId: string }): JSX.Element => {
  const { user } = useContext(UserContext);
  const { handleError } = useContext(SnackBarContext);
  const [members, setMembers] = useState([]);

  const isOwner = () => {
    const myMember = members.find((member) => member.user.id === user?.id);
    return myMember?.role === 3;
  };

  const deleteMember = async (memberId: string) => {
    await APIKit.projects.members.deleteMember(projectId, memberId);
    fetchMembers();
  };

  const fetchMembers = async () => {
    try {
      const { data } = await APIKit.projects.members.getMembers(projectId);
      setMembers(data.results);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
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
  );
};
export default MemberTable;
