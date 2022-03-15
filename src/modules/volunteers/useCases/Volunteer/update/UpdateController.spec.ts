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

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1' , 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO OCCUPATIONS_AREA(id, name, created_at, updated_at) 
      VALUES('${id}', 'Volunteer Type', 'now()', 'now()')`,
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

  it('should be able to edit a volunteer', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const volunteer = await request(app).post('/volunteers').send({
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: id,
      user_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const volunteerId = JSON.parse(volunteer.text).id;

    await request(app).put(`/volunteers?id=${volunteerId}`).send({
      profession: 'Profession Edited',
      description: 'description edited',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const response = await request(app).get(`/volunteers/find/?id=${volunteerId}`).send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body.profession).toEqual('Profession Edited');
    expect(response.body.description).toEqual('description edited');
  });

  it('should be able to edit a volunteer and add address', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const volunteer = await request(app).post('/volunteers').send({
      cpf: '1111111',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: id,
      user_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const idVolunteers = JSON.parse(volunteer.text).id;

    const edited = await request(app).put(`/volunteers?id=${idVolunteers}`).send({
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

    const response = await request(app)
      .get(`/volunteers/find/?id=${idVolunteers}`).send().set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body.address).not.toBeNull();
    expect(response.body.address.street).toEqual('Street Example');
  });
});
