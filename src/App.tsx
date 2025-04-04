import "./App.css";
import { UserList, UserManager } from "./components/lists";
import ExpenseManager from "./components/managers/ExpenseManager";

function App() {
  return (
    <div className="flex flex-col items-center m-2">
      <h1>Happy new year</h1>
      <UserManager />
      <UserList />
      <ExpenseManager />
    </div>
  );
}

export default App;
