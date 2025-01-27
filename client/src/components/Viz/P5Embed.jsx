import { useEffect } from "react";
// import "./style.css"; // Assuming style.css is in the same directory or specify path

function P5Embed({ src }) {
  useEffect(() => {
    // Load p5.js script
    const scriptP5 = document.createElement("script");
    scriptP5.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.0/p5.js";
    scriptP5.async = true;
    document.body.appendChild(scriptP5);

    // Load p5.sound script
    const scriptP5Sound = document.createElement("script");
    scriptP5Sound.src =
      "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.0/addons/p5.sound.min.js";
    scriptP5Sound.async = true;
    document.body.appendChild(scriptP5Sound);

    // Load your custom script after p5.js has loaded
    const scriptSketch = document.createElement("script");
    scriptSketch.src = src;
    scriptSketch.async = true;
    document.body.appendChild(scriptSketch);

    // Clean up scripts on component unmount
    return () => {
      document.body.removeChild(scriptP5);
      document.body.removeChild(scriptP5Sound);
      document.body.removeChild(scriptSketch);
    };
  }, [src]);

  return <main id="p5-canvas-container"></main>;
}

export default P5Embed;
