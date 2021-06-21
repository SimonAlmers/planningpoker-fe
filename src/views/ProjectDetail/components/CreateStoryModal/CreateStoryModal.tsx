import React from "react";
import { Modal } from "reactstrap";
import CreateStoryForm from "../CreateStoryForm/CreateStoryForm";

const CreateStoryModal = ({
  displayCreateStoryModal,
  toggleCreateStoryModal,
  onCreateCallback,
  projectId,
}: {
  onCreateCallback;
  projectId: string;
  displayCreateStoryModal: boolean;
  toggleCreateStoryModal: () => void;
}): JSX.Element => (
  <Modal
    isOpen={displayCreateStoryModal}
    toggle={toggleCreateStoryModal}
    contentClassName="bg-transparent"
  >
    <CreateStoryForm
      projectId={projectId}
      onSubmitCallback={onCreateCallback}
    />
  </Modal>
);
export default CreateStoryModal;
