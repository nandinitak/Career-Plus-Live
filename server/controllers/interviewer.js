const Interviewer = require("../models/interview/Interviewer");

const createInterviewer = async (req, res, next) => {
	try {
		console.log(req.body);
		const { name, language, gender, personality, age, bio } = req.body;

		const profile = new Interviewer({
			name: name,
			language: language,
			gender: gender,
			personality: personality,
			age: age,
			bio: bio,
		});
		console.log(profile);
		await profile.save();
		res.status(201).json(profile);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Server Error", code: "SRV_ERR", error: error });
		next(error);
	}
};

// Function to list all JobScenarios created by a specific user
const listInterviewers = async (req, res, next) => {
	const { userId } = req.query;
	try {
		// Use aggregation pipeline to find all JobScenarios by userId
		const uid = new mongoose.Types.ObjectId(userId);
		const profiles = await Interviewer.aggregate([
			{
				$match: {
					userId: uid,
				},
			},
		]);
		// Check if jobScenarios were found
		if (!profiles.length) {
			return res
				.status(404)
				.json({ message: "No Profiles found for this user." });
		}

		res.status(200).json(jobScenarios);
	} catch (error) {
		console.error(error);
		next(error);
		res.status(500).json({
			message: "An error occurred while retrieving Interviewer Profiles",
		});
	}
};

module.exports = {
	createInterviewer,
	listInterviewers,
};
