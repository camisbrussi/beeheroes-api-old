import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Find Project Controller', () => {
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
      `INSERT INTO ORGANIZATION_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'Project Type', 'xxxxxx', 'now()', 'now()')`,
    );

    await connection.query(
      `INSERT INTO ORGANIZATIONS(id, name, description, cnpj, email, status, organization_type_id, created_at, updated_at) 
      VALUES('${id}', 'Project Type', 'xxxxxx', '123456', 'organization@beeheroes.com', '1', '${id}', 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to find a project', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { token } = responseToken.body;

    const responseProject = await request(app).post('/projects').send({
      name: 'Project Name',
      description: 'Teste Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: id,
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const projectId = JSON.parse(responseProject.text).id;

    const response = await request(app).get(`/projects/find?id=${projectId}`).send().set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body.id).toEqual(projectId);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual('Project Name');
  });
});
