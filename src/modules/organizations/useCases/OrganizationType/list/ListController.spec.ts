import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('List Organization Type Controller', () => {
  beforeAll(async () => {
    connection = await createdConnection();
    await connection.runMigrations();

    const id = uuidV4();
    
    await connection.query(
      `INSERT INTO USER_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'User Type', 'xxxxxx', 'now()', 'now()')`,
    );

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, user_type_id, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '${id}', '1' , 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });
    const { refresh_token } = responseToken.body;

    await request(app).post('/organizationtypes').send({
      name: 'Organization Type Supertest',
      description: 'Organization Supertest',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });


    const response = await request(app).get('/organizationtypes').set({
      Authorization: `Bearer ${refresh_token}`,
    });;

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Organization Type Supertest');
  });
});
