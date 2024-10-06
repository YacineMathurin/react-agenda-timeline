import React, { ReactNode } from "react";
import Button from "./views/button";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./application/slices/counter-slice";
import { RootState } from "./application/store";
import Iframe from "./views/iframe";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./views/my-document";

const demos = {
  soundcloud:
    '<iframe width="100%" height="166" scrolling="yes" frameborder="no" allow="autoplay" src="http://localhost:3000/"></iframe>',

  plotly:
    '<iframe src="https://codesandbox.io/embed/q7jmjyplvq?fontsize=14" title="Plotly All Graph Types" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>',
};

const App = () => {
  const count = useSelector((state: RootState) => state.counterReducer.value);
  const dispatch = useDispatch();

  return (
    <main style={styles.main}>
      {/* <h1>Starting the count</h1>
      <h2>{count}</h2>
      <Button text="+1" onClick={() => dispatch(increment())} />
      <Button text="-1" onClick={() => dispatch(decrement())} />
      <Iframe iframe={demos["soundcloud"]} allow="autoplay" />, */}
      <button>Retour</button>

      <PDFViewer>
        <MyDocument />
      </PDFViewer>

      {/* <PDFDownloadLink document={<MyDocument />} fileName="fee_acceptance.pdf">
        {(data: { loading: boolean }): ReactNode => {
          return data.loading ? "Loading document..." : "Download now!";
        }}
      </PDFDownloadLink> */}
    </main>
  );
};

export default App;

const styles = {
  main: {
    display: "flex",
    flexDirection: "column" as "column",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
};
