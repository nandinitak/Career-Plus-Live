const { z } = require("zod");

// Zod schema for Interviewer
const languageEnum = z.enum(["en_IN", "en_US"]);
const genderEnum = z.enum(["male", "female"]);

const createInterviewerSchema = z.object({
	name: z.string().min(3, { message: "Interviewer name too small" }),
	language: languageEnum,
	gender: genderEnum,
	personality: z.string(),
	age: z.number().min(18, { message: "Age must be greater than 18" }),
	bio: z.string(),
});

module.exports = {
	createInterviewerSchema,
};
