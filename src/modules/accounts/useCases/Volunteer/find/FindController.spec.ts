import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Find Volunteer Controller', () => {
  const id = uuidV4();
  beforeAll(async () => {
    connection = await createdConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, status, is_volunteer, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1' , 'true', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO OCCUPATIONS_AREA(id, name, created_at, updated_at) 
      VALUES('${id}', 'Volunteer Type', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to find a volunteer', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const responseVolunteer = await request(app).post('/volunteers').send({
      description: 'xxxx',
      occupation_area_id: id,
      user_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const volunteerId = JSON.parse(responseVolunteer.text).id;

    const response = await request(app).get(`/volunteers/find?id=${volunteerId}`).send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body.id).toEqual(volunteerId);
    expect(response.body).toHaveProperty('id');
  });
});
