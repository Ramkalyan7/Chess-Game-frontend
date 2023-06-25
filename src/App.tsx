import "./App.css";
import ChessBoard from "./components/chess borad/ChessBoard";

const App: React.FC = () => {
  return (
    <div className="App bg-gray-300 min-h-screen">
      <ChessBoard />
    </div>
  );
};

export default App;
