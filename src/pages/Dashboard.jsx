
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ AUTH CHECK (using cookies)
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // const res = await API.get("/auth/dashboard", {
        //   withCredentials: true, // 🍪 important
        // });
        const res = await API.get("/auth/dashboard", {
  withCredentials: true, // 🍪 important
});

        setUser(res.data.user);
      } catch (err) {
        console.log(err.response?.data);

        // ❌ Not logged in → redirect
        navigate("/login");
      }
    };

    fetchDashboard();
  }, [navigate]);

  // ✅ LOGOUT (cookie clear)
  const handleLogout = async () => {
    try {
      await API.post(
        "/auth/logout",
        {},
        {
          withCredentials: true, // 🍪 important
        }
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // ⏳ Loading
  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading... 🔐
      </h2>
    );
  }

  // Dummy bookings
  const bookings = [
    { id: 1, car: "Toyota Corolla", date: "2026-03-21", status: "Confirmed" },
    { id: 2, car: "Honda Civic", date: "2026-03-25", status: "Pending" },
    { id: 3, car: "BMW X5", date: "2026-04-01", status: "Completed" },
  ];

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Dashboard 🔐</h1>
        <p>
          Welcome, <strong>{user.name}</strong> ({user.email})
        </p>
      </header>

      {/* Buttons */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <button style={{ margin: "0 10px", padding: "10px 20px" }}>
          Profile
        </button>

        <button style={{ margin: "0 10px", padding: "10px 20px" }}>
          Bookings
        </button>

        <button
          style={{
            margin: "0 10px",
            padding: "10px 20px",
            background: "red",
            color: "white",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Bookings */}
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Your Bookings
        </h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Car</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
                  {b.id}
                </td>

                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {b.car}
                </td>

                <td style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
                  {b.date}
                </td>

                <td style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
                  {b.status === "Confirmed" ? (
                    <span style={{ color: "green" }}>{b.status}</span>
                  ) : b.status === "Pending" ? (
                    <span style={{ color: "orange" }}>{b.status}</span>
                  ) : (
                    <span style={{ color: "gray" }}>{b.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
