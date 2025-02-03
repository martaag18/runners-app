export interface Runner {
    name: string;
    age: number;
    bestTime: number;
    totalDistance: number;
    eventsParticipated: string[];
  }

export interface AgeGroupStats {
    totalBestTime: number;
    totalDistance: number;
    count: number;
}
