import { Flight } from "../../../domain/models/Flight";

export interface FlightRepositoryPort {
  findAll(): Flight[];
  find(id: number): Flight | undefined;
}