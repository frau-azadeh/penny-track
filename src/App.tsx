import "./App.css";
import { UserManager } from "./components/lists";

function App() {
  return (
    <div className="flex flex-col items-center m-2">
      <h1>Happy new year</h1>
      <UserManager />
    </div>
  );
}

export default App;
