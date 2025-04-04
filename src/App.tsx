import "./App.css";
import { UserList, UserManager } from "./components/lists";

function App() {
  return (
    <div className="flex flex-col items-center m-2">
      <h1>Happy new year</h1>
      <UserManager />
      <UserList/>
    </div>
  );
}

export default App;
