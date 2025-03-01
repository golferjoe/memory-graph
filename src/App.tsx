import { useContext } from "preact/hooks";
import { NodeDiagram } from "./components/NodeDiagram";
import { KeyBinds } from "./components/KeyBinds";
import { ContextMenu } from "./components/ContextMenu";
import { AppContext } from "./context/appContext";

export function App() {
    const context = useContext(AppContext);

    const openContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        context.setContextMenu({ x: e.clientX, y: e.clientY });
    }

    const closeContextMenu = () => {
        context.setContextMenu(null);
    }

    return (
        <div
            className="main"
            onContextMenu={openContextMenu}
            onClick={closeContextMenu}
        >
            <NodeDiagram/>
            <KeyBinds/>
            <ContextMenu/>
        </div>
    );
}