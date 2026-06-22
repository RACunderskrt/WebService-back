import express from 'express';
import session from 'express-session';
import { CompanyRepositoryAdapter } from "../infrastructure/adapters/companyRepositoryAdapter";
import { CompanyService } from "../domain/services/CompanyService";
import { CompanyController } from "../presentation/controllers/companyController";
import { errorHandler } from "./errorHandling";
import { AuthController } from '../presentation/controllers/authController';
import { keycloak, memoryStore } from '../../keycloak-init';

const app = express();
app.use(express.json());

app.use(session({
  secret: 'some_secret_key',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

app.use(keycloak.middleware());

const companyRepo = new CompanyRepositoryAdapter();
const companyService = new CompanyService(companyRepo);
const companyController = new CompanyController(companyService);
companyController.registerRoutes(app);

const authController = new AuthController();
authController.registerRoutes(app);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
