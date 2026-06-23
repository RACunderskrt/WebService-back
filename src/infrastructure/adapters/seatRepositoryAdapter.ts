import { SeatRepositoryPort } from "../../application/ports/outbound/SeatRepositoryPort";
import { Seat } from "../../domain/models/Seat";

export class SeatRepositoryAdapter implements SeatRepositoryPort {
  seats: Seat[] = [
    // Vol 101 — 3 booked out of 6
    { id: 1,  flightId: 101, label: '1A', clientName: 'Martin',  clientFirstname: 'Paul'   },
    { id: 2,  flightId: 101, label: '1B', clientName: null,      clientFirstname: null      },
    { id: 3,  flightId: 101, label: '2A', clientName: 'Dubois',  clientFirstname: 'Léa'    },
    { id: 4,  flightId: 101, label: '2B', clientName: null,      clientFirstname: null      },
    { id: 5,  flightId: 101, label: '3A', clientName: 'Bernard', clientFirstname: 'Marc'   },
    { id: 6,  flightId: 101, label: '3B', clientName: null,      clientFirstname: null      },
    // Vol 102 — fully booked
    { id: 7,  flightId: 102, label: '1A', clientName: 'Petit',   clientFirstname: 'Alice'  },
    { id: 8,  flightId: 102, label: '1B', clientName: 'Robert',  clientFirstname: 'Jean'   },
    { id: 9,  flightId: 102, label: '2A', clientName: 'Moreau',  clientFirstname: 'Sophie' },
    { id: 10, flightId: 102, label: '2B', clientName: 'Simon',   clientFirstname: 'Hugo'   },
    // Vol 103 — mostly free
    { id: 11, flightId: 103, label: '1A', clientName: 'Laurent', clientFirstname: 'Eva'    },
    { id: 12, flightId: 103, label: '1B', clientName: null,      clientFirstname: null      },
    { id: 13, flightId: 103, label: '2A', clientName: null,      clientFirstname: null      },
    { id: 14, flightId: 103, label: '2B', clientName: null,      clientFirstname: null      },
    { id: 15, flightId: 103, label: '3A', clientName: null,      clientFirstname: null      },
    { id: 16, flightId: 103, label: '3B', clientName: null,      clientFirstname: null      },
    // Vol 104 — half booked
    { id: 17, flightId: 104, label: '1A', clientName: 'Garnier', clientFirstname: 'Nora'   },
    { id: 18, flightId: 104, label: '1B', clientName: null,      clientFirstname: null      },
    { id: 19, flightId: 104, label: '2A', clientName: 'Faure',   clientFirstname: 'Tom'    },
    { id: 20, flightId: 104, label: '2B', clientName: null,      clientFirstname: null      }
  ];

  findAll(): Seat[] {
    return this.seats;
  }

  insert(bookedSeat:Seat): void {
    this.seats = this.seats.map( item => {
      if(item.id === bookedSeat.id){
        item.clientFirstname = bookedSeat.clientFirstname;
        item.clientName = bookedSeat.clientName;
      }
      return item;
    });
  }

  delete(id:number): void {
    this.seats = this.seats.map( item => {
      if(item.id === id){
        item.clientFirstname = null;
        item.clientName = null;
      }
      return item;
    });
  }
}