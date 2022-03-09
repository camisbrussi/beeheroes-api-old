import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Project Controller', () => {
  let id;
  beforeAll(async () => {
    id = uuidV4();
    connection = await createdConnection();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO USER_TYPES(name, description, created_at, updated_at) 
      VALUES('user Type', 'xxxxxx', 'now()', 'now()')`,
    );

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, user_type_id, status, created_at, updated_at) 
      VALUES('${id}', 'Admin', 'admin@beeheroes.com', '${password}', '1', '1' , 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO ORGANIZATION_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'Project Type', 'xxxxxx', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO ORGANIZATIONS(id, name, description, cnpj, email, status, organization_type_id, created_at, updated_at) 
      VALUES('${id}', 'Project Type', 'xxxxxx', '123456', 'organization@beeheroes.com', '1', '${id}', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO PROJECTS(id, name, start, status, organization_id, created_at, updated_at) 
      VALUES('${id}', 'Name Project','now()', '1', '${id}', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO OCCUPATIONS_AREA(id, name, created_at, updated_at) 
      VALUES('${id}', 'Occupation Area', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO VOLUNTEERS(id, cpf, profession, user_id, occupation_area_id, created_at, updated_at) 
      VALUES('${id}', '123456', 'xxxxxx', '${id}', '${id}', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO SUBSCRIPTIONS(id, registration_date, status, volunteer_id, project_id, created_at, updated_at) 
      VALUES('${id}', 'now()', '1', '${id}', '${id}', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new project ', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const token = responseToken.body.refresh_token;

    const response = await request(app).post('/evaluations').send({
      score: 5,
      description: 'xxx',
      subscription_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(201);
  });
});
