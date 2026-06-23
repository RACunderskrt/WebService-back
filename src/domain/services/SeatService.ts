import { SeatServicePort } from "../../application/ports/inbound/SeatServicePort";
import { Seat } from "../models/Seat";
import { SeatRepositoryPort } from "../../application/ports/outbound/SeatRepositoryPort";
import { NotFoundError } from "../errors/NotFoundError";


export class SeatService implements SeatServicePort {
  constructor(private readonly repo: SeatRepositoryPort) {}

  getAll(): Seat[]{
    return this.repo.findAll();
  }

  bookSeat(bookedSeat: Seat): void {
    this.repo.insert(bookedSeat);
  }

  unbookSeat(id: number): void {
    this.repo.delete(id);
  }
}