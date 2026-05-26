export interface RSVPResponse {
  id: string;
  name: string;
  attendance: 'yes' | 'couple' | 'no';
  timestamp: string;
}

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
