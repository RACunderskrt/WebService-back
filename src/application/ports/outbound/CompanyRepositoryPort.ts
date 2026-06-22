import { Company } from "../../../domain/models/Company";

export interface CompanyRepositoryPort {
  find(id: number): Company | undefined;
}