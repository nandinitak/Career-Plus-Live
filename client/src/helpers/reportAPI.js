import { REPORT_API_URI } from "@/routes/route-api";
import axios from "axios";

export const listReport = async (userId) => {
	try {
		const config = {
			method: "get",
			maxBodyLength: Infinity,
			url: REPORT_API_URI.LIST_BY_ID(userId),
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		const response = await axios.request(config);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error("Error Listing Reports", error);
		throw error;
	}
};
