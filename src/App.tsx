import MainLayOut from "./components/LayOut/MainLayOut";
import ProtectedRoute from "./components/LayOut/ProtectedRoute";

const App = () => {
  return (
    <div>
      <ProtectedRoute role={undefined}>
        <MainLayOut />
      </ProtectedRoute>
    </div>
  );
};

export default App;
