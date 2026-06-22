import { CompanyServicePort } from "../../application/ports/inbound/CompanyServicePort";
import { Company } from "../models/Company";
import { CompanyRepositoryPort } from "../../application/ports/outbound/CompanyRepositoryPort";
import { NotFoundError } from "../errors/NotFoundError";

export class CompanyService implements CompanyServicePort {
  constructor(private readonly repo: CompanyRepositoryPort) {}

  get(id: number): Company | undefined {
    const company = this.repo.find(id);
    if (!company) {
      throw new NotFoundError('Company not found');
    }
    return company;
  }
}