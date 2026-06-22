import { Flight } from "../../../domain/models/Flight";

export interface FlightServicePort {
  getAll(): Flight[];
  get(id: number): Flight | undefined;
}
