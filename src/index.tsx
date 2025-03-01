import { render } from "preact";
import "normalize.css";
import "./style.css";
import { AppContext, createAppContext } from "./context/appContext";
import { App } from "./App";

function Index() {
    return (
        <AppContext.Provider value={createAppContext()}>
            <App/>
        </AppContext.Provider>
    );
}

render(<Index/>, document.getElementById("app"));
