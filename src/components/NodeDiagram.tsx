import { Node } from "./Node";
import { Arrow } from "./Arrow";
import { useContext, useEffect } from "preact/hooks";
import { AppContext } from "../context/appContext";
import { clampNumber } from "../utils/math";
import { NodeBase } from "../types";

function clampNodePosition(node: NodeBase): NodeBase {
    if (node.x + node.width > window.innerWidth) {
        node.x = window.innerWidth - node.width;
    }

    if (node.y + node.height > window.innerHeight) {
        node.y = window.innerHeight - node.height;
    }

    return node;
}

export function NodeDiagram() {
    const context = useContext(AppContext);

    useEffect(() => {
        const onResize = () => {
            // loop through all nodes and check if they are off-screen, if so then move them to the screen edge
            const updatedNodes = context.nodes.value.map((node) =>
                clampNodePosition(node),
            );
            context.nodes.value = updatedNodes;
        };

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, []);

    const mouseMove = (e: MouseEvent) => {
        if (context.selectedNode.value !== null) {
            const newNodes = context.nodes.value.map((node) =>
                node.uid === context.selectedNode.value
                    ? {
                          ...node,
                          x: clampNumber(
                              e.clientX - context.cursorOffset.value.x,
                              0,
                              window.innerWidth - node.width - 2,
                          ),
                          y: clampNumber(
                              e.clientY - context.cursorOffset.value.y,
                              0,
                              window.innerHeight - node.height - 3,
                          ),
                      }
                    : node,
            );
            context.nodes.value = newNodes;
        }
    };

    const closeContextMenu = () => {
        context.contextMenu.value = null;
    };

    return (
        <div
            className="node-diagram"
            onMouseMove={mouseMove}
            onMouseUp={() => (context.selectedNode.value = null)}
            onClick={closeContextMenu}
        >
            {context.nodes.value.map((node) => (
                <Node key={node.uid} {...node} />
            ))}

            {context.links.value.map(({ fromUid, toUid }, index) => (
                <Arrow
                    key={index}
                    from={context.nodes.value.find((n) => n.uid === fromUid)}
                    to={context.nodes.value.find((n) => n.uid === toUid)}
                />
            ))}
        </div>
    );
}
