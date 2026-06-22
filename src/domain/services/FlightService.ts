import { FlightServicePort } from "../../application/ports/inbound/FlightServicePort";
import { Flight } from "../models/Flight";
import { FlightRepositoryPort } from "../../application/ports/outbound/FlightRepositoryPort";
import { NotFoundError } from "../errors/NotFoundError";


export class FlightService implements FlightServicePort {
  constructor(private readonly repo: FlightRepositoryPort) {}

  getAll(): Flight[]{
    return []
  }

  get(id: number): Flight | undefined {
    const flight = this.repo.find(id);
    if (!flight) {
      throw new NotFoundError('Flight not found');
    }
    return flight;
  }
}