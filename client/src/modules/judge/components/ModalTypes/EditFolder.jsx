import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditFolder = () => {
  const { closeModal, isOpenModal } = useContext(ModalContext);
  const { editFolderTitle, folders } = useContext(PlaygroundContext);

  const folderId = isOpenModal.identifiers.folderId;
  const [folderTitle, setFolderTitle] = useState(folders[folderId].title);

  return (
    <Dialog open={isOpenModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Folder Title</DialogTitle>
          <DialogClose asChild onClick={() => closeModal()}></DialogClose>
        </DialogHeader>
        <div className="flex flex-row space-x-4">
          <Input
            value={folderTitle}
            onChange={(e) => setFolderTitle(e.target.value)}
            placeholder="Enter folder title"
            className="w-full mt-1"
          />
          <Button
            variant="shine"
            onClick={() => {
              editFolderTitle(folderId, folderTitle);
              closeModal();
            }}
            className="w-fit"
          >
            Update Title
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFolder;
