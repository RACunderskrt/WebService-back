import { Company } from "../../../domain/models/Company";

export interface CompanyServicePort {
  get(id: number): Company | undefined;

}
