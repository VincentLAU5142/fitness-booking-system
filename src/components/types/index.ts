export interface Class {
  id: number;
  name: string;
  time: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  description: string;
  image: string;
}

export interface Booking {
  id: number;
  userId: number;
  classId: number;
  bookingDate: string;
  status: "pending" | "confirmed" | "cancelled";
  classDetails?: Class;
}
