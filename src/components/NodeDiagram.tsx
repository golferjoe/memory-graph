import { Node } from "./Node";
import { Arrow } from "./Arrow";
import { useContext } from "preact/hooks";
import { AppContext } from "../context/appContext";

export function NodeDiagram() {
    const context = useContext(AppContext);

    const mouseMove = (e: MouseEvent) => {
        if (context.selectedNode !== null) {
            context.setNodes(
                context.nodes.map((node) =>
                    node.uid === context.selectedNode
                        ? {
                              ...node,
                              x: e.clientX - context.cursorOffset.x,
                              y: e.clientY - context.cursorOffset.y,
                          }
                        : node
                )
            );
        }
    };

    const closeContextMenu = () => {
        context.setContextMenu(null);
    };

    return (
        <div
            className="node-diagram"
            onMouseMove={mouseMove}
            onMouseUp={() => context.setSelectedNode(null)}
            onClick={closeContextMenu}
        >
            {context.nodes.map(node => (
                <Node
                    key={node.uid}
                    {...node}
                />
            ))}

            {context.links.map(({ fromUid, toUid }, index) => (
                <Arrow
                    key={index}
                    from={context.nodes.find(n => n.uid === fromUid)}
                    to={context.nodes.find(n => n.uid === toUid)}
                />
            ))}
        </div>
    );
}