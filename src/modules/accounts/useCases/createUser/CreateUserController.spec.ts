import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create User Controller', () => {
  let id;
  beforeAll(async () => {
    id = uuidV4();
    connection = await createdConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO USER_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'Entity Type', 'xxxxxx', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user ', async () => {
    console.log('id', id)
    const response = await request(app).post('/users').send({
      name: 'Admin',
      email: 'supertest@beeheroes.com',
      password: '123456',
      user_type_id: id,
    });
    
    expect(response.status).toBe(201);
  });

  it('should not be able to create a user with email exist', async () => {
    const response = await request(app).post('/users').send({
      name: 'Admin2',
      email: 'supertest@beeheroes.com',
      password: '123456',
      user_type_id: id,
    });

    expect(response.status).toBe(400);
  });
})