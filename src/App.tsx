import MainLayOut from "./components/LayOut/MainLayOut";
// import ProtectedRoute from "./components/LayOut/ProtectedRoute";
import ScrollToTop from "./components/HomeComponents/ScrollToTop";


const App = () => {
  return (
    <div>
      {/* <ProtectedRoute role={undefined}> */}
      <ScrollToTop />
      <MainLayOut />
      {/* </ProtectedRoute> */}
    </div>
  );
};

export default App;
