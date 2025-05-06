const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const dotenv = require('dotenv');


dotenv.config({ path: './.env' });


const User = require('../models/User');
const authRoutes = require('../routes/auth');
const taskRoutes = require('../routes/tasks');

let mongoServer;
let app;


const setupTestApp = () => {
    const testApp = express();
    testApp.use(express.json());
    testApp.use('/api', authRoutes);

    return testApp;
};


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.MONGO_URI_TEST = mongoUri;


    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error('Failed to connect to in-memory MongoDB', err);
        process.exit(1);
    }

    app = setupTestApp();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

describe('Auth API Endpoints', () => {
    describe('POST /api/register', () => {
        it('should register a new user successfully', async () => {
            const newUser = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            };

            const res = await request(app)
                .post('/api/register')
                .send(newUser);

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');

            const userInDb = await User.findOne({ email: newUser.email });
            expect(userInDb).not.toBeNull();
            expect(userInDb.username).toBe(newUser.username);
        });

        it('should return 400 if user already exists', async () => {
            const existingUser = {
                username: 'existinguser',
                email: 'existing@example.com',
                password: 'password123',
            };
            await request(app).post('/api/register').send(existingUser);

            const res = await request(app)
                .post('/api/register')
                .send(existingUser);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error', 'User already exists');
        });

        it('should return 500 if there is a server error (e.g., missing fields)', async () => {
            const incompleteUser = {
                email: 'fail@example.com',
            };

            const res = await request(app)
                .post('/api/register')
                .send(incompleteUser);


            expect(res.statusCode).toBe(500);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('POST /api/login', () => {
        beforeEach(async () => {
            // Setup a user to login with
            const userCredentials = {
                username: 'loginuser',
                email: 'login@example.com',
                password: 'password123',
            };
            await request(app).post('/api/register').send(userCredentials);
        });

        it('should login an existing user successfully', async () => {
            const loginCredentials = {
                email: 'login@example.com',
                password: 'password123',
            };

            const res = await request(app)
                .post('/api/login')
                .send(loginCredentials);

            expect(res.statusCode).toEqual(200); // Assuming 200 for successful login
            expect(res.body).toHaveProperty('token');
        });

        it('should return 400 for non-existent email', async () => {
            const loginCredentials = {
                email: 'wrong@example.com',
                password: 'password123',
            };

            const res = await request(app)
                .post('/api/login')
                .send(loginCredentials);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error', 'Invalid credentials');
        });

        it('should return 400 for incorrect password', async () => {
            const loginCredentials = {
                email: 'login@example.com',
                password: 'wrongpassword',
            };

            const res = await request(app)
                .post('/api/login')
                .send(loginCredentials);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error', 'Invalid credentials');
        });
    });
});
