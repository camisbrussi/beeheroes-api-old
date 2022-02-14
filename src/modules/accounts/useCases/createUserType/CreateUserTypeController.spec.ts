import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create User Type Controller', () => {
  beforeAll(async() => {
    connection = await createdConnection();
    await connection.runMigrations();
  });

    afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user type', async() => {
    const response = await request(app).post('/usertypes').send({ 
      name: 'User Type Supertest',
      description: 'User Type Supertest',
    });
    expect(response.status).toBe(201);
  });

  it('should not be able to create a user type with name exist', async () => {
    const response = await request(app).post('/usertypes').send({
      name: 'User Type Supertest',
      description: 'User Supertest',
    });

    console.log(response);

    expect(response.status).toBe(400);
  });
});