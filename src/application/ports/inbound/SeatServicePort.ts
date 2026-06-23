import { Seat } from "../../../domain/models/Seat";

export interface SeatServicePort {
  getAll(): Seat[];
  bookSeat(bookedSeat:Seat): void;
  unbookSeat(id: number): void;
}
