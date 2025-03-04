import { useContext } from "preact/hooks";
import { NodeBase, NodeLink } from "../types";
import { AppContext } from "../context/appContext";
import { EditableText } from "./EditableText";

export function Node({ uid, x, y }: NodeBase) {
    const context = useContext(AppContext);

    const mouseDown = (e: MouseEvent) => {
        if (e.ctrlKey && context.linkStart !== uid) {
            // remove node and all links
            context.setLinks(
                context.links.filter(
                    (link) => link.fromUid !== uid && link.toUid !== uid,
                ),
            );
            context.setNodes(context.nodes.filter((node) => node.uid !== uid));
        } else if (e.shiftKey) {
            if (context.linkStart === null) {
                // start linking
                context.setLinkStart(uid);
            } else if (context.linkStart !== uid) {
                // link to already selected node
                const newLink: NodeLink = {
                    fromUid: context.linkStart,
                    toUid: uid,
                };
                context.setLinks([...context.links, newLink]);
                context.setLinkStart(null);
            }
        } else {
            // move node
            const node = context.nodes.find((n) => n.uid === uid);
            if (node) {
                context.setCursorOffset({
                    x: e.clientX - node.x,
                    y: e.clientY - node.y,
                });
                context.setSelectedNode(uid);
            }
        }
    };

    const isSelected = context.selectedNode === uid; // is node grabbed
    const isLink = context.linkStart === uid; // whether the current node is being linked

    return (
        <div
            className="node"
            style={{
                left: x,
                top: y,
                ...(isSelected && {
                    borderColor: "var(--grab-color)",
                }),
                ...(isLink && {
                    borderColor: "var(--link-color)",
                    transform: "scale(1.1)",
                }),
            }}
            onMouseDown={mouseDown}
        >
            <EditableText className="node-title" initialValue="title" />
            <EditableText className="node-value" initialValue="value" />
        </div>
    );
}
