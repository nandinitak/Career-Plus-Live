import { useParams, useLocation, Navigate } from "react-router-dom";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { CollaborativeEditor } from "./CollaborativeEditor";
import axios from "axios";
import { Loading } from "./Loading";
// import { createClient } from "@liveblocks/client";
function EditorPageLayout() {
  const location = useLocation();
  const { roomId } = useParams();
  localStorage.setItem("roomId", roomId);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  // const client = createClient({
  //   authEndpoint:
  // });

  return (
    <LiveblocksProvider
      authEndpoint={async (room) => {
        const headers = {
          "Content-Type": "application/json",
        };

        const body = {
          token: localStorage.getItem("_id"),
          room,
        };

        try {
          const response = await axios.post(
            `http://localhost:8080/liveblocks/auth`,
            body,
            { headers }
          );
          return response.data;
        } catch (error) {
          console.error("Error authenticating with Liveblocks:", error);
          throw error;
        }
      }}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<Loading />}>
          <CollaborativeEditor />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default EditorPageLayout;
