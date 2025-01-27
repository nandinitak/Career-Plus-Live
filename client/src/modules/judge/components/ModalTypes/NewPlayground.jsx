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
import Select from "react-select";
import { IoCloseSharp } from "react-icons/io5";

const NewPlayground = () => {
  const { isOpenModal, closeModal } = useContext(ModalContext);
  const { addPlayground } = useContext(PlaygroundContext);

  const languageOptions = [
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  const { folderId } = isOpenModal.identifiers;
  const [cardTitle, setCardTitle] = useState("");
  const [language, setLanguage] = useState(languageOptions[0]);

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
  };

  return (
    <Dialog open={true} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Playground</DialogTitle>
          <DialogClose asChild onClick={() => closeModal()}></DialogClose>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          <Input
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            placeholder="Enter playground title"
            className="w-full"
          />
          <div className="w-full">
            <Select
              options={languageOptions}
              value={language}
              onChange={handleLanguageChange}
              className="w-full"
            />
          </div>
          <Button
            variant="shine"
            onClick={() => {
              addPlayground(folderId, cardTitle, language.value);
              closeModal();
            }}
            className="w-fit"
          >
            Create Playground
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewPlayground;
