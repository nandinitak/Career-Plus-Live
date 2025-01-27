const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const projectId = process.env.GOOGLE_PROJECT_ID;
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const storage = new Storage({ projectId, keyFilename });

async function uploadFile(bucketName, username, role, insti, v, filePath) {
	const options = {
		destination: `${username}/${role}-${insti}-v${v}`,
	};

	await storage.bucket(bucketName).upload(filePath, options);
	console.log(`${filePath} uploaded to ${bucketName}`);
}
