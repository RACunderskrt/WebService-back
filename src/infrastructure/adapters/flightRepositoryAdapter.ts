import { FlightRepositoryPort } from "../../application/ports/outbound/FlightRepositoryPort";
import { Flight } from "../../domain/models/Flight";

export class FlightRepositoryAdapter implements FlightRepositoryPort {
  flights: Flight[] = [
    { id: 101, companyId: 1, departureAirport: 'CDG', departureDate: new Date('2026-07-10T08:30:00'), arrivalAirport: 'NCE', arrivalDate: new Date('2026-07-10T10:05:00') },
    { id: 103, companyId: 3, departureAirport: 'TLS', departureDate: new Date('2026-07-12T06:45:00'), arrivalAirport: 'ORY', arrivalDate: new Date('2026-07-12T08:10:00') },
    { id: 104, companyId: 1, departureAirport: 'MRS', departureDate: new Date('2026-07-13T17:55:00'), arrivalAirport: 'CDG', arrivalDate: new Date('2026-07-13T19:30:00') },
    { id: 102, companyId: 2, departureAirport: 'LYS', departureDate: new Date('2026-07-11T14:00:00'), arrivalAirport: 'MRS', arrivalDate: new Date('2026-07-11T15:20:00') }
  ];

  findAll(): Flight[] {
    return this.flights;
  }

  find(id:number): Flight | undefined {
    return this.flights.find((item) => item.id === id);
  }
}