import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Filer User Controller', () => {
  const id = uuidV4();
  beforeAll(async() => {
    connection = await createdConnection();
    await connection.runMigrations();
    
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

  it('should be able to filter a user for name', async() => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    await request(app).post(`/users`).send({
      name: "Admin Admin",
      email: 'admin2@beeheroes.com',
      password: 'admin',
      user_type_id: id
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });


    const response = await request(app).get(`/users/filter`).send({
      name: "Admin"
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.body.length).toEqual(2);
  });

    it('should be able to filter a user for name and user type', async() => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app).get(`/users/filter`).send({
      name: "Admin",
      user_type_id: id
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.body.length).toEqual(2);
  });
})