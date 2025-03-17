import { Class, Booking } from "../components/types/index";

export const bookingService = {
  // Fetch all classes
  async getClasses(): Promise<Class[]> {
    try {
      const response = await fetch("/data/classes.json"); // Use relative path
      if (!response.ok) throw new Error("Failed to fetch classes");
      return response.json();
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },

  // Fetch user's bookings
  async getUserBookings(userId: number): Promise<Booking[]> {
    try {
      const [bookingsResponse, classesResponse] = await Promise.all([
        fetch("/data/bookings.json"), // Use relative path
        fetch("/data/classes.json"), // Use relative path
      ]);

      if (!bookingsResponse.ok || !classesResponse.ok) {
        throw new Error("Failed to fetch bookings data");
      }

      const bookings: Booking[] = await bookingsResponse.json();
      const classes: Class[] = await classesResponse.json();

      // Filter bookings for the specific user and combine with class details
      const userBookings = bookings
        .filter((booking) => booking.userId === userId)
        .map((booking) => ({
          ...booking,
          classDetails: classes.find((c) => c.id === booking.classId),
        }));

      return userBookings;
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      throw error;
    }
  },

  // Book a class
  async bookClass(userId: number, classId: number): Promise<Booking> {
    // In a real API, this would be a POST request
    // For mock purposes, we'll simulate a successful booking
    const newBooking: Booking = {
      id: Date.now(), // Generate a unique ID
      userId,
      classId,
      bookingDate: new Date().toISOString(),
      status: "pending",
    };

    return newBooking;
  },
};
