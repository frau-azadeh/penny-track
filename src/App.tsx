import "./App.css";
import {Button} from "./components/ui";

function App() {
  return (
    <div className="flex flex-col items-center m-2">
      <h1 >Happy new year</h1>
      <Button variant="primary" onClick={() => alert("happy new year")}>
        click me!
      </Button>
    </div>
  );
}

export default App;
