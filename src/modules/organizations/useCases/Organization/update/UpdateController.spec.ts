import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createdConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Update Organization Controller', () => {
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
      `INSERT INTO ORGANIZATION_TYPES(id, name, description, created_at, updated_at) 
      VALUES('${id}', 'Organization Type', 'xxxxxx', 'now()', 'now()')`,
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

  it('should be able to edit a organization', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    const organization = await request(app).post('/organizations').send({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: id,
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const organizationId = JSON.parse(organization.text).id;

    await request(app).put(`/organizations?id=${organizationId}`).send({
      name: 'Organization Name Editado',
      email: 'editado@beeheroes.com',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app).get(`/organizations/find/?id=${organizationId}`).send().set({
      Authorization: `Bearer ${refresh_token}`,
    });

    expect(response.body.organization.name).toEqual('Organization Name Editado');
    expect(response.body.organization.email).toEqual('editado@beeheroes.com');
  });

  it('should be able to edit a organization and add address', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    const organization = await request(app).post('/organizations').send({
      name: 'Organization Name',
      email: 'organization1@beeheroes.com',
      cnpj: '000000000001',
      description: 'Description Organization',
      organization_type_id: id,
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const organizationId = JSON.parse(organization.text).id;

    await request(app).put(`/organizations?id=${organizationId}`).send({
      address: {
        street: 'Street Example',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app)
      .get(`/organizations/find/?id=${organizationId}`).send().set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.body.organization.address).not.toBeNull();
    expect(response.body.organization.address.street).toEqual('Street Example');
  });

  it('should be able to edit a organization and edit address', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    const organization = await request(app).post('/organizations').send({
      name: 'Organization Name',
      email: 'organization2@beeheroes.com',
      cnpj: '000000000002',
      description: 'Description Organization',
      organization_type_id: id,
      address: {
        street: 'Street Example 2',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const organizationId = JSON.parse(organization.text).id;
    const AddressId = JSON.parse(organization.text).address_id;

    await request(app).put(`/organizations?id=${organizationId}`).send({
      address_id: AddressId,
      address: {
        street: 'Street Example edited',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app)
      .get(`/organizations/find/?id=${organizationId}`).send().set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.body.organization.address).not.toBeNull();
    expect(response.body.organization.address.street).toEqual('Street Example edited');
  });

  it('should be able to edit a organization and add phones', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    const organization = await request(app).post('/organizations').send({
      name: 'Organization Name',
      email: 'organization3@beeheroes.com',
      cnpj: '000000000003',
      description: 'Description Organization',
      organization_type_id: id,
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const organizationId = JSON.parse(organization.text).id;

    await request(app).put(`/organizations?id=${organizationId}`).send({
      phones: [
        {
          number: '123',
          is_whatsapp: true,
        },
        {
          number: '321',
          is_whatsapp: true,
        },
      ],
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app)
      .get(`/organizations/find/?id=${organizationId}`).send().set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.body.phones).not.toBeNull();
    expect(response.body.phones[0].number).toBe('123');
  });

  it('should be able to edit a organization and edit phones', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'admin@beeheroes.com',
        password: 'admin',
      });

    const { refresh_token } = responseToken.body;

    const organization = await request(app).post('/organizations').send({
      name: 'Organization Name',
      email: 'organization4@beeheroes.com',
      cnpj: '000000000004',
      description: 'Description Organization',
      organization_type_id: id,
      phones: [
        {
          number: '123',
          is_whatsapp: true,
        },
        {
          number: '321',
          is_whatsapp: true,
        },
      ],
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const organizationId = JSON.parse(organization.text).id;

    await request(app).put(`/organizations?id=${organizationId}`).send({
      phones: [
        {
          number: '789',
          is_whatsapp: true,
        },
      ],
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app)
      .get(`/organizations/find/?id=${organizationId}`).send().set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.body.phones).not.toBeNull();
    expect(response.body.phones[0].number).toBe('789');
  });
});
