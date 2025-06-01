import "./App.css";
import Home from "./components/Home/Home";
import data from "./data/data";
import { useState, useEffect } from "react";
import GradientLoader from "./utils/loader";
import { enableBasicSecurity } from "./utils/secure";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    enableBasicSecurity();
    setLoading(false);
  }, []);
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {loading && <GradientLoader />}
      {!loading && (
        <>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Home data={data} />
        </div>
        </>
      )}
    </div>
  );
}
export default App;
