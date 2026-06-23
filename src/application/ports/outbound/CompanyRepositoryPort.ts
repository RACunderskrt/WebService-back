import { Company } from "../../../domain/models/Company";

export interface CompanyRepositoryPort {
  findAll(): Company[];
  find(id: number): Company | undefined;
}