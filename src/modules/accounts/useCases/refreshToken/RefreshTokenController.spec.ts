import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;


describe('Refresh Token Controller', () => {
  let id;
  const tokenInvalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDQ5NjgwMjMsImV4cCI6MTY0NDk2ODkyMywic3ViIjoiMzIyYTc4ZTUtYmIwNy00MTQxLTlkM2MtODFiYTNkNmNhNDI5In0.DHGUA7K1rOEio3wP2rtfzOYp1IZGattnAnBD_C4WmuM'

  beforeAll(async () => {
  id = uuidV4();

  connection = await createdConnection();
  await connection.runMigrations();

  await connection.query(
    `INSERT INTO USER_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'Entity Type', 'xxxxxx', 'now()', 'now()')`,
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

  it('should be able to refresh token in body', async () => {

    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
    });

    const token = responseToken.body.refresh_token;
   
    const response = await request(app).post('/refresh-token').send({token});

    expect(response.status).toBe(200);
  });

  it('should be able to refresh token in headers', async () => {

    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
    });

    const token = responseToken.body.refresh_token;

    const response = await request(app).post('/refresh-token').send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(200);
  });

  it('should not be able to refresh token invalid', async () => {

    const response = await request(app).post('/refresh-token').send({tokenInvalid});

    expect(response.status).toBe(400);
  });
});