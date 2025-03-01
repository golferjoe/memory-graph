import { useContext } from "preact/hooks";
import { nanoid } from "nanoid";
import { AppContext } from "../context/appContext";
import { NodeBase } from "../types";

export function ContextMenu() {
    const context = useContext(AppContext);

    const addNode = () => {
        const newNode: NodeBase = {
            uid: nanoid(8),
            x: context.contextMenu.x,
            y: context.contextMenu.y,
        };

        context.setNodes([...context.nodes, newNode]);
        context.setContextMenu(null);
    };

    return context.contextMenu && (
        <div
            className="context-menu"
            style={{ left: context.contextMenu.x, top: context.contextMenu.y }}
            onClick={(e) => e.stopPropagation()} // Prevent the click event from bubbling up to the main div
        >
            <input
                onClick={addNode}
                className="context-menu_button"
                type="button"
                value="Add Node"
            />
        </div>
    );
}
