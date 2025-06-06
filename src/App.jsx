import "./App.css";
import Home from "./components/Home/Home";
import data from "./data/data";
import { useState, useEffect } from "react";
import GradientLoader from "./utils/loader";
import { enableBasicSecurity } from "./utils/secure";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComingSoon from "./components/ComingSoon";
import { ModalProvider } from "./components/ModalProvider";
import { OfflineAlert } from "./components/OfflineAlert";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    enableBasicSecurity();
    setLoading(false);
  }, []);
  return (
    <ModalProvider>
      <BrowserRouter>
        <div style={{ position: "relative", minHeight: "100vh" }}>
          <OfflineAlert />
          {loading && <GradientLoader />}
          {!loading && (
            <Routes>
              <Route path="/" element={
                <div style={{ position: "relative", zIndex: 1 }}>
                  <Home data={data} />
                </div>
              } />
              <Route path="/dev-tools" element={<ComingSoon />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </ModalProvider>
  );
}
export default App;
