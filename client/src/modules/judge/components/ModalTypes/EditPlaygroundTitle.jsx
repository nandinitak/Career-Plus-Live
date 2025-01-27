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

const EditPlaygroundTitle = () => {
  const { isOpenModal, closeModal } = useContext(ModalContext);
  const { editPlaygroundTitle, folders } = useContext(PlaygroundContext);

  const { folderId, cardId } = isOpenModal.identifiers;
  const [playgroundTitle, setPlaygroundTitle] = useState(
    folders[folderId].playgrounds[cardId].title
  );

  return (
    <Dialog open={isOpenModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Playground Title</DialogTitle>
          <DialogClose asChild onClick={() => closeModal()}></DialogClose>
        </DialogHeader>
        <div className="flex flex-row space-x-4">
          <Input
            value={playgroundTitle}
            onChange={(e) => setPlaygroundTitle(e.target.value)}
            placeholder="Enter playground title"
            className="w-full mt-1"
          />
          <Button
            variant="shine"
            onClick={() => {
              editPlaygroundTitle(folderId, cardId, playgroundTitle);
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

export default EditPlaygroundTitle;
