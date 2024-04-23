import { useEffect, useState } from "react";
import { useWindowWidth } from "./hooks/window-width";

import { eventsTimelineFn } from "./lib";

const App = () => {
  const [output, setOutput] = useState([]);
  // windowSize is used to react to the resize of the window
  const windowSize = useWindowWidth();

  useEffect(() => {
    const res = eventsTimelineFn();
    setOutput(res);
  }, [windowSize]);

  return (
    <div style={styles.main}>
      {output.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid white",
            backgroundColor: "goldenrod",
            width: item.width,
            height: item.height,
            position: "absolute",
            top: item.yOrigin,
            left: item.xOrigin,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: ".3em",
          }}
        >
          {item.id}
        </div>
      ))}
    </div>
  );
};

export default App;

const styles = {
  main: {
    width: "100%",
    height: "100vh",
  },
};
