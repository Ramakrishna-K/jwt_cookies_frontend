// // src/components/PrivateRoute.jsx
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;


// // src/components/PrivateRoute.jsx
// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import API from "../api/api";

// const PrivateRoute = ({ children }) => {
//   const [isAuth, setIsAuth] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await API.get("/auth/dashboard", {
//           withCredentials: true,
//         });
//         setIsAuth(true);
//       } catch (err) {
//         setIsAuth(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (isAuth === null) return <h2>Checking auth...</h2>;

//   return isAuth ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;




import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/api";

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/dashboard"); // ✅ clean
        setIsAuth(true);
      } catch (err) {
        console.log("Auth error:", err.response?.data); // 🔍 debug
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <h2 style={{ textAlign: "center" }}>Checking auth... 🔐</h2>;
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
