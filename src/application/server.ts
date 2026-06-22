import express from 'express';

import { CompanyRepositoryAdapter } from "../infrastructure/adapters/companyRepositoryAdapter";
import { CompanyService } from "../domain/services/CompanyService";
import { CompanyController } from "../presentation/controllers/companyController";
import { errorHandler } from "./errorHandling";


const app = express();
app.use(express.json());

const companyRepo = new CompanyRepositoryAdapter();
const companyService = new CompanyService(companyRepo);
const companyController = new CompanyController(companyService);
companyController.registerRoutes(app);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
