import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Update Volunteer Controller', () => {
  const id = uuidV4();
  beforeAll(async () => {
    connection = await createdConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO USER_TYPES(name, description, created_at, updated_at) 
      VALUES('User Type', 'xxxxxx', 'now()', 'now()')`,
    );

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, user_type_id, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1', '1' , 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO OCCUPATION_AREA(id, name, created_at, updated_at) 
      VALUES('${id}', 'Volunteer Type', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to edit a volunteer', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    const volunteer = await request(app).post('/volunteers').send({
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
      avatar: 'xxxx',
      occupation_area_id: id,
      user_id: id,
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const volunteerId = JSON.parse(volunteer.text).id;

    await request(app).put(`/volunteers?id=${volunteerId}`).send({
      profession: 'Profession Edited',
      description: 'description edited',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app).get(`/volunteers/find/?id=${volunteerId}`).send().set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.body.profession).toEqual('Profession Edited');
    expect(response.body.description).toEqual('description edited');
  });
});