import express from 'express';
import session from 'express-session';
import { CompanyRepositoryAdapter } from "../infrastructure/adapters/companyRepositoryAdapter";
import { CompanyService } from "../domain/services/CompanyService";
import { CompanyController } from "../presentation/controllers/companyController";
import { errorHandler } from "./errorHandling";
import { AuthController } from '../presentation/controllers/authController';
import { keycloak, memoryStore } from '../../keycloak-init';
import { FlightRepositoryAdapter } from '../infrastructure/adapters/flightRepositoryAdapter';
import { FlightService } from '../domain/services/FlightService';
import { FlightController } from '../presentation/controllers/flightController';
import { SeatRepositoryAdapter } from '../infrastructure/adapters/seatRepositoryAdapter';
import { SeatService } from '../domain/services/SeatService';
import { SeatController } from '../presentation/controllers/seatController';
import cors from 'cors'

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}))

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

const flightRepo = new FlightRepositoryAdapter();
const flightService = new FlightService(flightRepo);
const flightController = new FlightController(flightService);
flightController.registerRoutes(app);

const seatRepo = new SeatRepositoryAdapter();
const seatService = new SeatService(seatRepo);
const seatController = new SeatController(seatService);
seatController.registerRoutes(app);

const authController = new AuthController();
authController.registerRoutes(app);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
