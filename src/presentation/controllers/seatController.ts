import { keycloak } from "../../../keycloak-init";
import { SeatServicePort } from "../../application/ports/inbound/SeatServicePort";
import { Express, Response, Request } from "express";
import { Seat } from "../../domain/models/Seat";



export class SeatController {
  constructor(private seatService: SeatServicePort) {}

  registerRoutes(app: Express) {
    app.get('/seat',keycloak.protect({ bearerOnly: true }), this.getSeats.bind(this)); 
    app.post('/seat', keycloak.protect({ bearerOnly: true }), this.bookSeat.bind(this)); 
    app.delete('/seat/:id', keycloak.protect({ bearerOnly: true }), this.unbookSeat.bind(this));
  }

  getSeats(req: Request, res: Response) {
    const seats = this.seatService.getAll();
    if (seats.length > 0) {
      res.status(200).send(seats);
    } else {
      res.status(404).send({ message: "No seats" });
    }
  }

  bookSeat(req: Request, res: Response) {
    try{
      const bookedSeat: Seat = req.body;
      this.seatService.bookSeat(bookedSeat);
      res.sendStatus(200);
    }catch(e){
      res.status(404).send({ message: "Error : invalid body" });
    }
  }

  unbookSeat(req: Request, res: Response) {
    try{
      const id: number = parseInt(req.params.id);
      this.seatService.unbookSeat(id);
      res.sendStatus(200);
    }catch(e){
      res.status(405).send({ message: "Error : invalid id" });
    }
  }
}