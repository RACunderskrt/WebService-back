import { keycloak } from "../../../keycloak-init";
import { FlightServicePort } from "../../application/ports/inbound/FlightServicePort";
import { Express, Response, Request } from "express";


export class FlightController {
  constructor(private flightService: FlightServicePort) {}

  registerRoutes(app: Express) {
    app.get('/flight',keycloak.protect({ bearerOnly: true }), this.getFlights.bind(this)); 
    app.get('/flight/:id', keycloak.protect({ bearerOnly: true }), this.getFlightById.bind(this));
  }

  getFlights(req: Request, res: Response) {
    const flights = this.flightService.getAll();
    if (flights.length > 0) {
      res.status(200).send(flights);
    } else {
      res.status(404).send({ message: "No flights" });
    }
  }

  getFlightById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const flight = this.flightService.get(id);
    if (flight) {
      res.status(200).send(flight);
    } else {
      res.status(404).send({ message: "Flight not found" });
    }
  }
}