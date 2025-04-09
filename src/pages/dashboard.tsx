import { UserList, UserManager } from "../components/lists";
import ExpenseManager from "../components/managers/ExpenseManager";
import ProductDashboard from "../components/managment/ProductDashboard";
import ProductManager from "../components/managment/ProductManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function Dashboard() {
  const role: "admin" | "user" | null = useSelector(
    (state: RootState) => state.auth.user?.position || null,
  );

  return (
    <div className="flex flex-col items-center m-2">
      <ToastContainer position="top-center" />
      <h1>My Dashboard</h1>

      {role === "admin" ? (
        <>
          <h2>Admin Panel</h2>
          <UserManager />
          <UserList />
          <ExpenseManager />
          <ProductDashboard />
          <ProductManager />
        </>
      ) : role === "user" ? (
        <>
          <h2>User Panel</h2>
          <ProductDashboard />
          <ExpenseManager />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
