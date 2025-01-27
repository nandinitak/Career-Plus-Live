import React, { useContext, useState } from "react";
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

const NewFolder = () => {
  const { closeModal } = useContext(ModalContext);
  const { addFolder } = useContext(PlaygroundContext);
  const [folderTitle, setFolderTitle] = useState("");

  return (
    <Dialog open={true} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
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
              addFolder(folderTitle);
              closeModal();
            }}
            className="w-fit"
          >
            Create Folder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewFolder;
