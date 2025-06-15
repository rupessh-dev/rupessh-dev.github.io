import "./App.css";
import Home from "./components/Home/Home";
import data from "./data/data";
import { useState, useEffect } from "react";
import GradientLoader from "./utils/loader";
import { enableBasicSecurity } from "./utils/secure";
import { HashRouter, Routes, Route } from "react-router-dom";
import ComingSoon from "./components/ComingSoon";
import ToolsMenu from "./components/ToolsMenu";
import PregnancyCalculator from "./components/Tools/PregnancyCalculator/PregnancyCalculator";
import BmiCalculator from "./components/Tools/BmiCalculator/BmiCalculator";
import AgeCalculator from "./components/Tools/AgeCalculator/AgeCalculator";
import PasswordGenerator from "./components/Tools/PasswordGenerator/PasswordGenerator";
import MarkdownEditor from "./components/Tools/MarkdownEditor/MarkdownEditor";
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
      <HashRouter>
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
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/labs" element={<ToolsMenu />} />
              <Route path="/labs/pregnancy-calculator" element={<PregnancyCalculator />} />
              <Route path="/labs/bmi-calculator" element={<BmiCalculator />} />
              <Route path="/labs/age-calculator" element={<AgeCalculator />} />
              <Route path="/labs/password-generator" element={<PasswordGenerator />} />
              <Route path="/labs/markdown-editor" element={<MarkdownEditor />} />
            </Routes>
          )}
        </div>
      </HashRouter>
    </ModalProvider>
  );
}
export default App;
