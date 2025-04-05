import { UserList, UserManager } from "../components/lists";
import ExpenseManager from "../components/managers/ExpenseManager";
import ProductDashboard from "../components/managment/ProductDashboard";
import ProductManager from "../components/managment/ProductManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  return (
    <div className="flex flex-col items-center m-2">
      <ToastContainer position="top-center" />
      <h1>my dashboard</h1>
      <UserManager />
      <UserList />
      <ExpenseManager />
      <ProductDashboard />
      <ProductManager />
    </div>
  );
}

export default Dashboard;
