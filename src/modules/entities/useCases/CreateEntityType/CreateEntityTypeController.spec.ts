import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Entity Type Controller', () => {
  beforeAll(async() => {
    connection = await createdConnection();
    await connection.runMigrations();
  });

    afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new entity type', async() => {
    const response = await request(app).post('/entitytypes').send({ 
      name: 'Entity Type Supertest',
      description: 'Entity Type Supertest',
    });
    expect(response.status).toBe(201);
  });

  it('should not be able to create a entity type with name exist', async () => {
    const response = await request(app).post('/entitytypes').send({
      name: 'Entity Type Supertest',
      description: 'Category Supertest',
    });

    expect(response.status).toBe(400);
  });
});