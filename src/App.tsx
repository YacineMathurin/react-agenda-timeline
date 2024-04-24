import React from "react";
import { useEffect, useState } from "react";
import { useWindowWidth } from "./hooks/window-width";

import { eventsTimelineFn } from "./lib";

type OutputProps = {
  id: number;
  start: number;
  end: number;
  width: number;
  height: number;
  xOrigin: number;
  yOrigin: number;
}[];

const App = () => {
  const [output, setOutput] = useState<OutputProps>([]);
  // windowWidth is used to react to the resize of the window
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const res = eventsTimelineFn();
    setOutput(res);
  }, [windowWidth]);

  return (
    <main style={styles.main}>
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
    </main>
  );
};

export default App;

const styles = {
  main: {
    width: "100%",
    height: "100vh",
  },
};
