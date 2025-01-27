const mongoose = require("mongoose");

const interviewerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: ["male", "female"],
			default: "male",
		},
		personality: {
			type: String,
		},
		age: {
			type: Number,
			required: [true, "Age is required"],
			min: [18, "age must be atleast 18 Years"],
		},
		bio: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Interviewer = mongoose.model("Interviewer", interviewerSchema);

module.exports = Interviewer;
