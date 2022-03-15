import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Refresh Token Controller', () => {
  let id;
  const tokenInvalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDQ5NjgwMjMsImV4cCI6MTY0NDk2ODkyMywic3ViIjoiMzIyYTc4ZTUtYmIwNy00MTQxLTlkM2MtODFiYTNkNmNhNDI5In0.DHGUA7K1rOEio3wP2rtfzOYp1IZGattnAnBD_C4WmuM';

  beforeAll(async () => {
    id = uuidV4();

    connection = await createdConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1' , 'now()', 'now()')`,
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

    const { token } = responseToken.body;
    const { refresh_token } = responseToken.body;

    const response = await request(app).post('/refreshtoken').send({ refresh_token }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(200);
  });

  it('should not be able to refresh token invalid', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const response = await request(app).post('/refreshtoken').send({ tokenInvalid }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(400);
  });
});
