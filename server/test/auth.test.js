const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");
const { fakerEN_IN } = require("@faker-js/faker");
require("dotenv").config({ path: "../.env.test" });

describe("POST /auth/login", () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.MONGODB_URI, {});
	});

	afterAll((done) => {
		// Closing the DB connection allows Jest to exit successfully.
		mongoose.connection.close();
		mongoose.disconnect();
		done();
	});

	it("should return 200 for valid credentials", async () => {
		const username = fakerEN_IN.internet.userName();
		const password = fakerEN_IN.internet.password();
		const email = fakerEN_IN.internet.email();
		const firstName = fakerEN_IN.person.firstName();
		const lastName = fakerEN_IN.person.lastName();

		// Create a user with the generated credentials
		await User.create({
			username,
			password,
			email,
			firstName,
			lastName,
			isVerified: true,
		});

		const response = await request(app)
			.post("/auth/login")
			.send({ username, password });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("token");
	});

	it("should return 400 for invalid username format", async () => {
		const invalidUsernames = [
			"ab", // Too short
			"abcdefghijklmn", // Too long
			"abc$def", // Special character
			"ABCdef", // Uppercase letters
			"user_name", // Underscore not allowed
			"user.name", // Dot not allowed
			"user!name", // Exclamation mark not allowed
			"user name", // Space not allowed
		];

		const password = fakerEN_IN.internet.password();
		const email = fakerEN_IN.internet.email();
		const firstName = fakerEN_IN.person.firstName();
		const lastName = fakerEN_IN.person.lastName();

		for (const username of invalidUsernames) {
			const response = await request(app)
				.post("/auth/register")
				.send({ firstName, lastName, username, email, password });

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("message");
		}
	});

	it("should return 401 for incorrect password", async () => {
		const username = fakerEN_IN.internet.userName();
		const password = fakerEN_IN.internet.password();
		const email = fakerEN_IN.internet.email();
		const firstName = fakerEN_IN.person.firstName();
		const lastName = fakerEN_IN.person.lastName();

		// Create a user with the generated credentials
		await User.create({
			username,
			password,
			email,
			firstName,
			lastName,
			isVerified: true,
		});

		const response = await request(app)
			.post("/auth/login")
			.send({ username, password: "wrongPassword" });

		expect(response.statusCode).toBe(401);
		expect(response.body).toHaveProperty("code", "PWD_INVALID");
	});

	it("should return 404 for non-existent user", async () => {
		const username = fakerEN_IN.internet.userName();
		const password = fakerEN_IN.internet.password();

		const response = await request(app)
			.post("/auth/login")
			.send({ username, password });

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("code", "USR_NOT_FOUND");
	});

	it("should return 403 for unverified user", async () => {
		const username = fakerEN_IN.internet.userName();
		const password = fakerEN_IN.internet.password();
		const email = fakerEN_IN.internet.email();
		const firstName = fakerEN_IN.person.firstName();
		const lastName = fakerEN_IN.person.lastName();

		// Create a user with the generated credentials
		await User.create({
			username,
			password,
			email,
			firstName,
			lastName,
			isVerified: false,
		});

		const response = await request(app)
			.post("/auth/login")
			.send({ username, password });

		expect(response.statusCode).toBe(403);
		expect(response.body).toHaveProperty("code", "USR_NOT_VERIFY");
	});

	it("should return 500 for server errors", async () => {
		jest.spyOn(User, "findOne").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const username = fakerEN_IN.internet.userName();
		const password = fakerEN_IN.internet.password();

		const response = await request(app)
			.post("/auth/login")
			.send({ username, password });

		expect(response.statusCode).toBe(500);
	});
});

describe("POST /auth/register", () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.MONGODB_URI, {});
	});

	afterAll((done) => {
		mongoose.connection.close();
		mongoose.disconnect();
		done();
	});

	it("should return 201 for successful registration", async () => {
		const username = fakerEN_IN.helpers.fromRegExp("[a-z0-9-]{3,12}");
		const password = fakerEN_IN.internet.password();
		const email = fakerEN_IN.internet.email();
		const firstName = fakerEN_IN.person.firstName();
		const lastName = fakerEN_IN.person.lastName();

		const response = await request(app)
			.post("/auth/register")
			.send({ firstName, lastName, username, email, password });

		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty("username", username);
	});

	it("should return 409 for duplicate username", async () => {
		const username = fakerEN_IN.helpers.fromRegExp("[a-z0-9-]{3,12}");
		const password = fakerEN_IN.internet.password();
		const email = fakerEN_IN.internet.email();
		const firstName = fakerEN_IN.person.firstName();
		const lastName = fakerEN_IN.person.lastName();

		// Create a user with the generated credentials
		await User.create({
			username,
			password,
			email,
			firstName,
			lastName,
			isVerified: true,
		});

		const response = await request(app).post("/auth/register").send({
			firstName,
			lastName,
			username,
			email: fakerEN_IN.internet.email(),
			password,
		});

		expect(response.statusCode).toBe(409);
		expect(response.body).toHaveProperty(
			"message",
			"Username or email already in use"
		);
	});

	it("should return 409 for duplicate email", async () => {
		const username = fakerEN_IN.helpers.fromRegExp("[a-z0-9-]{3,12}");
		const password = fakerEN_IN.internet.password();
		const email = fakerEN_IN.internet.email();
		const firstName = fakerEN_IN.person.firstName();
		const lastName = fakerEN_IN.person.lastName();

		// Create a user with the generated credentials
		await User.create({
			username: fakerEN_IN.internet.userName(),
			password,
			email,
			firstName,
			lastName,
			isVerified: true,
		});

		const response = await request(app)
			.post("/auth/register")
			.send({ firstName, lastName, username, email, password });

		expect(response.statusCode).toBe(409);
		expect(response.body).toHaveProperty(
			"message",
			"Username or email already in use"
		);
	});

	it("should return 400 for invalid email", async () => {
		const username = fakerEN_IN.helpers.fromRegExp("[a-z0-9-]{3,12}");
		const password = fakerEN_IN.internet.password();
		const firstName = fakerEN_IN.person.firstName();
		const lastName = fakerEN_IN.person.lastName();
		const email = "invalidEmail";

		const response = await request(app)
			.post("/auth/register")
			.send({ firstName, lastName, username, email, password });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("message");
	});

	it("should return 400 for missing fields", async () => {
		const username = fakerEN_IN.helpers.fromRegExp("[a-z0-9-]{3,12}");
		const password = fakerEN_IN.internet.password();
		const email = fakerEN_IN.internet.email();

		const response = await request(app)
			.post("/auth/register")
			.send({ username, email, password });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("message");
	});

	it("should return 500 for server errors", async () => {
		jest.spyOn(User.prototype, "save").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const username = fakerEN_IN.helpers.fromRegExp("[a-z0-9-]{3,12}");
		const password = fakerEN_IN.internet.password();
		const email = fakerEN_IN.internet.email();
		const firstName = fakerEN_IN.person.firstName();
		const lastName = fakerEN_IN.person.lastName();

		const response = await request(app)
			.post("/auth/register")
			.send({ firstName, lastName, username, email, password });

		expect(response.statusCode).toBe(500);
		expect(response.body).toHaveProperty("message");
	});
});
