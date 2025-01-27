import { ACHIEVEMENT_API_URI } from "@/routes/route-api";

import axios from "axios";

export const shareLinkedIn = async (message, imageUrl) => {
  try {
    const response = await axios.post(ACHIEVEMENT_API_URI.SHARE_TO_LINKEDIN, {
      message,
      imageUrl,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
