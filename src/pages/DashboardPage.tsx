import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { bookingService } from "../services/bookingService";
import { Booking } from "../components/types";
import "../styles/Dashboard.css"; 
import Loading from "../components/common/Loading";

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      if (user?.id) {
        try {
          const userBookings = await bookingService.getUserBookings(user.id);
          setBookings(userBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [isAuthenticated, navigate, user]);

  if (loading) return <Loading message="Fetching your bookings..." />; 

  if (!user) return null;

  const handleCancelBooking = (bookingId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    // Handle cancel booking action
    console.log("Cancel booking:", bookingId);
    // Update the booking status to "cancelled" in the state
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
      )
    );
    // Change button appearance
    const button = event.currentTarget;
    button.classList.add("cancelled-button");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
      <h1>Welcome! {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!!!</h1>
        <div className="user-profile">
          <img
            src={user.image}
            alt={`${user.firstName}'s profile`}
            className="profile-image"
          />
          <div className="user-info">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
          </div>
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Account Status</h4>
                <p>Active</p>
              </div>
              <div className="stat-card">
                <h4>Membership</h4>
                <p>Regular</p>
              </div>
              {/* Add more stat cards as needed */}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="bookings-section">
          <h2>Upcoming Booked Classes</h2>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Instructor</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.classDetails?.name}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>{booking.classDetails?.time}</td>
                  <td>{booking.classDetails?.instructor}</td>
                  <td className={`status ${booking.status}`}>
                    {booking.status.toUpperCase()}
                  </td>
                  <td>
                    <button
                      className="action-button"
                      onClick={(event) => handleCancelBooking(booking.id, event)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;