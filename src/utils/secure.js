import { showModal } from '../components/modalService';

export function enableBasicSecurity() {
  // Disable right-click
  const handleContextMenu = (e) => {
    e.preventDefault();
    showModal("Right-click is disabled", "info");
  };
  // Disable dev tools shortcuts and print/screenshot
  const handleKeyDown = (e) => {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
      showModal("Opening developer tools is disabled", "error");
    }
    // Ctrl+Shift+I or Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) {
      e.preventDefault();
      showModal("Opening developer tools is disabled", "error");
    }
    // Ctrl+U
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
      e.preventDefault();
      showModal("Viewing source code is disabled", "info");
    }
    // Ctrl+P or Cmd+P (Print)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
      e.preventDefault();
      showModal("Printing is disabled", "error");
    }
    // PrtScn (Print Screen)
    if (e.key === "PrintScreen") {
      e.preventDefault();
      // Optionally, copy a blank value to clipboard
      try {
        navigator.clipboard.writeText("");
      } catch (error) {
        console.error("Failed to copy blank value to clipboard:", error);
      }
      showModal("Screenshots are disabled", "error");
    }
    // Cmd+Shift+4 (macOS screenshot)
    if (e.metaKey && e.shiftKey && e.key === "4") {
      e.preventDefault();
      showModal("Screenshots are disabled", "error");
    }
  };
  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("keydown", handleKeyDown);

  // Detect dev tools open and show warning
  let devtoolsOpen = false;
  const checkDevTools = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (
      widthThreshold ||
      heightThreshold ||
      (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized)
    ) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        // Show forced modal
        showModal(
          "Running code in the console is not supported or recommended on this site.",
          "error",
          true
        );
        console.log(
          "%cWarning! Please close the dev tools.",
          "color: #fff; background: red; font-size: 14px; font-weight: bold; padding: 4px; border-radius: 8px;"
        );
      }
    } else {
      devtoolsOpen = false;
    }
  };
  const devtoolsInterval = setInterval(checkDevTools, 500);

  // Block eval and Function constructor
  try {
    window.eval = function () {
      showModal("Running code in the console is not supported or recommended on this site.", "error");
      throw new Error("Not allowed: Console code execution is disabled.");
    };
    window.Function = function () {
      showModal("Running code in the console is not supported or recommended on this site.", "error");
      throw new Error("Not allowed: Console code execution is disabled.");
    };
  } catch (e) {
    // Some browsers may not allow overwriting
  }

  // Optionally, hijack console methods to show a warning
  const originalLog = console.log;
  console.log = function () {
    showModal("Running code in the console is not supported or recommended on this site.", "info");
    originalLog(
      "%cNot allowed: Running code in the console is not supported or recommended on this site.",
      "color: #fff; background: red; font-size: 14px; font-weight: bold; padding: 4px; border-radius: 8px;"
    );
    // Optionally, comment out the next line to suppress all logs
    // originalLog.apply(console, args);
  };

  // Return a cleanup function
  return () => {
    document.removeEventListener("contextmenu", handleContextMenu);
    document.removeEventListener("keydown", handleKeyDown);
    clearInterval(devtoolsInterval);
  };
}