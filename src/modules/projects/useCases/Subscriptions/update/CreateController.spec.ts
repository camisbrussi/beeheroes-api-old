import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Volunteer Controller', () => {
  let id;
  beforeAll(async () => {
    id = uuidV4();
    connection = await createdConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1' , 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO OCCUPATIONS_AREA(id, name, created_at, updated_at) 
      VALUES('${id}', 'Occupation Area', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO states(id, name, uf, created_at, updated_at) 
      VALUES('1', 'state', 'st', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO cities(id, name, state_id, created_at, updated_at) 
      VALUES('1', 'city', '1', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new volunteer ', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const response = await request(app).post('/volunteers').send({
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: id,
      user_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a volunteer with cpf exist', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const response = await request(app).post('/volunteers').send({
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: id,
      user_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(400);
  });

  it('should be able to create a new Volunteer with address', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const token = responseToken.body.token;

    const volunteers = await request(app).post('/volunteers').send({
      cpf: '222222',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: id,
      user_id: id,
      address: {
        street: 'Street Example',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const idVolunteers = JSON.parse(volunteers.text).id;

    const response = await request(app).get(`/volunteers/find?id=${idVolunteers}`).send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(volunteers.status).toBe(201);
    expect(response.body.address).not.toBeNull();
  });
});