import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", form);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error ❌");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        <input
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit" style={styles.button}>
          Register
        </button>

        <p style={styles.text}>
          I already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={styles.link}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  heading: {
    textAlign: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "blue",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Register;