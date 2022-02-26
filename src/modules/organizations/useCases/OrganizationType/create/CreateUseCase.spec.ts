
import { CreateOrganizationTypeUseCase } from './CreateUseCase'
import {AppError} from '@shared/errors/AppError'
import { OrganizationTypeRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationTypesRepositoryInMemory';


let createOrganizationTypeUseCase: CreateOrganizationTypeUseCase;
let organizationTypesRepositoryInMemory: OrganizationTypeRepositoryInMemory;

describe("Create Organization Type", () => {

  beforeEach(() =>{
    organizationTypesRepositoryInMemory = new OrganizationTypeRepositoryInMemory();
    createOrganizationTypeUseCase = new CreateOrganizationTypeUseCase(organizationTypesRepositoryInMemory);
  })
  it("should be able to create a new organization type", async () => {
    const organizationType = {
      name: "Organization Type name",
      description: "Organization type description" 
    }
    
    await createOrganizationTypeUseCase.execute(organizationType);

    const organizationTypeCreated = await organizationTypesRepositoryInMemory.findByName(organizationType.name);

    expect(organizationTypeCreated).toHaveProperty('id');
  });

  it("should not be able to create a organization type if exists name", async () => {
    await expect(async() => {
      await createOrganizationTypeUseCase.execute({
      name: "Organization Type",
      description: "Organization type description"
    });

      await createOrganizationTypeUseCase.execute({
      name: "Organization Type",
      description: "Organization type description"
    });
    }).rejects.toEqual(new AppError('Organization type already exists!'));
  })
})