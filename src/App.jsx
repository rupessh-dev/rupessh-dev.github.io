import "./App.css";
import Home from "./components/Home/Home";
import data from "./data/data";
import { useState, useEffect } from "react";
import GradientLoader from "./utils/loader";
import { enableBasicSecurity } from "./utils/secure";
import Aurora from "./components/Aurora/Aurora";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    enableBasicSecurity();
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {loading && <GradientLoader />}
      {!loading && (
        <>
        <div style={{ position: "relative", zIndex: 1 }}>
        <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
          <Home data={data} />
        </div>
        </>
      )}
    </div>
  );
}
export default App;
