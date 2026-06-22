import { CompanyServicePort } from "../../application/ports/inbound/CompanyServicePort";
import { Express, Response, Request } from "express";

import {Company} from "../../domain/models/Company";

export class CompanyController {
  constructor(private companyService: CompanyServicePort) {}

  registerRoutes(app: Express) {
    app.get('/company/:id', this.getCompanyById.bind(this));
  }

  getCompanyById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const company = this.companyService.get(id);
    if (company) {
      res.status(200).send(company);
    } else {
      res.status(404).send({ message: "Company not found" });
    }
  }
}