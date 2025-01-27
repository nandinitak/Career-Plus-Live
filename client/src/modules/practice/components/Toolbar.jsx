import { Button } from "@/components/ui/button";
import styles from "./Toolbar.module.css";
import { Copy, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export function Toolbar({ editor }) {
  const reactNavigator = useNavigate();
  function leaveRoom() {
    reactNavigator("/practice");
  }

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(localStorage.getItem("roomId"));
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  return (
    <div className={styles.toolbar}>
      <Button
        variant="outline"
        onClick={() => editor.trigger("", "undo", null)}
        aria-label="undo"
      >
        {" "}
        <UndoIcon />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.trigger("", "redo", null)}
        aria-label="undo"
      >
        {" "}
        <RedoIcon />
      </Button>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center text-black border-black"
        onClick={copyRoomId} // Implement copyRoomId function
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy Room ID
      </Button>
      <Button
        variant="destructive"
        className="w-full flex items-center justify-center text-white bg-black"
        onClick={leaveRoom} // Implement leaveRoom function
      >
        <LogOut className="w-4 h-4 mr-2" />
        Leave Room
      </Button>
    </div>
  );
}

export function UndoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8.91"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M5.5 3.5 3 6l2.5 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function RedoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6H6a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h1.09"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M10.5 3.5 13 6l-2.5 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
