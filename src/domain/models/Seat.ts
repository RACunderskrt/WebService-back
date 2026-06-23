export interface Seat { 
    id: number;
    flightId: number;
    label: string;
    clientName: string | null;  
    clientFirstname: string | null; 
}