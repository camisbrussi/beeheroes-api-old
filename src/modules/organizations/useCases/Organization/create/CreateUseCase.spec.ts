import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateOrganizationUseCase } from './CreateUseCase';


let createOrganizationUseCase: CreateOrganizationUseCase;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

beforeEach(() => {
  organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
  createOrganizationUseCase = new CreateOrganizationUseCase(organizationsRepositoryInMemory);
});


describe('Create Organization ', () => {
  it('should be able to create a new organization ', async() => {
    const organization = {
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    };

    await createOrganizationUseCase.execute(organization);

    const organizationCreated = await organizationsRepositoryInMemory.findByEmail(organization.email);
    expect(organizationCreated).toHaveProperty('id');
  });

  it('should not be able to create a new  with email exists', async () => {
    const organization = {
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    };

    await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    await expect(
      createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    }),
    ).rejects.toEqual(new AppError(`Organization ${organization.email} already exists`));
  });

  it('should not be able to create a organization truetruewith status await by default', async () =>{
     const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    expect(organization.status).toBe(Number(process.env.ORGANIZATION_STATUS_AWAIT));
  })
})