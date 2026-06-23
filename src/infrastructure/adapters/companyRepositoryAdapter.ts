import { CompanyRepositoryPort } from "../../application/ports/outbound/CompanyRepositoryPort";
import { Company } from "../../domain/models/Company";

export class CompanyRepositoryAdapter implements CompanyRepositoryPort {
  companies: Company[] = [
    { id: 1, name: 'Air Méditerranée', address: '', postalCode: '13001', city: 'Marseille', email: 'contact@airmed.fr', phone: '+33 4 91 00 00 01' },
    { id: 2, name: 'SkyLine Express', address: '', postalCode: '69002', city: 'Lyon',      email: 'info@skyline.fr',  phone: '+33 4 72 00 00 02' },
    { id: 3, name: 'OcciJet', address: '', postalCode: '31000', city: 'Toulouse',  email: 'ops@occijet.fr',   phone: '+33 5 61 00 00 03' },
  ];

  find(id:number): Company | undefined {
    return this.companies.find((item) => item.id === id);
  }

  findAll(): Company[] {
    return this.companies;
  }
}