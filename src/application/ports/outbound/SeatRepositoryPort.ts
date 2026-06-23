import { Seat } from "../../../domain/models/Seat";

export interface SeatRepositoryPort {
  findAll(): Seat[];
  insert(bookedSeat: Seat): void;
  delete(id: number): void;
}