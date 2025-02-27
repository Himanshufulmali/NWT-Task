const { userLogin, registerUser } = require("../../controllers/user-controller");
const User = require("../../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../../models/user-model");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("User Controller", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("registerUser", () => {
        it("should register a new user successfully", async () => {
            req.body = {
                name: "Abc Def",
                email: "abc@gmail.com",
                password: "password123",
                worth: 100
            };

            User.findOne.mockResolvedValue(null);

            bcrypt.hash.mockResolvedValue("hashedPassword");

            const mockUser = { name: "Abc Def", email: "abc@gmail.com", save: jest.fn() };
            User.create.mockResolvedValue(mockUser);

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith("Abc Def registered successfully.");
        });

        it("should return 400 if email is already registered", async () => {
            req.body = {
                name: "Abc Def",
                email: "abc@gmail.com",
                password: "password123",
                worth: 100
            };

            User.findOne.mockResolvedValue({ email: "abc@gmail.com" });

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith("Email is already registered");
        });

        it("should return 500 if an error occurs during registration", async () => {
            req.body = {
                name: "Abc Def",
                email: "abc@gmail.com",
                password: "password123",
                worth: 100
            };

            User.findOne.mockRejectedValue(new Error("Database error"));

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith("Something went wrong.");
        });
    });

    describe("userLogin", () => {

        it("should log in a user and return a token", async () => {
            req.body = {
                email: "abc@gmail.com",
                password: "password123"
            };
        
            const mockUser = {
                name: "Abc Def",
                email: "abc@gmail.com",
                worth: 100 
            };
        
            User.findOne.mockReturnValue({
                select: jest.fn().mockResolvedValue(mockUser) // Simulate `select("-password")`
            });
        
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue("fakeToken");
        
            await userLogin(req, res);
        
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                User: { name: "Abc Def", email: "abc@gmail.com", worth: 100 }, // No `password`
                Token: "fakeToken"
            });
        });

        it("should return 400 if user is not registered", async () => {
            req.body = {
                email: "abc@gmail.com",
                password: "password123"
            };

            User.findOne.mockResolvedValue(null);

            await userLogin(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith("User is not registered.");
        });

        it("should return 400 if password is incorrect", async () => {
            req.body = {
                email: "abc@gmail.com",
                password: "wrongPassword"
            };

            const mockUser = {
                name: "Abc Def",
                email: "abc@gmail.com",
                password: "hashedPassword",
                worth: 100
            };
            User.findOne.mockResolvedValue(mockUser);

            bcrypt.compare.mockResolvedValue(false);

            await userLogin(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith("Incorrect password.");
        });

        it("should return 500 if an error occurs during login", async () => {
            req.body = {
                email: "abc@gmail.com",
                password: "password123"
            };

            User.findOne.mockRejectedValue(new Error("Database error"));

            await userLogin(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith("Something went wrong.");
        });
    });
});