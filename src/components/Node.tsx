import { useContext, useEffect, useRef } from "preact/hooks";
import { NodeBase, NodeLink } from "../types";
import { AppContext } from "../context/appContext";
import { EditableText } from "./EditableText";

export function Node({ uid, x, y, width, height }: NodeBase) {
    const context = useContext(AppContext);
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!nodeRef.current) {
            return;
        }

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;

                const newNodes = context.nodes.value.map((node) =>
                    node.uid === uid ? { ...node, width, height } : node,
                );
                context.nodes.value = newNodes;
            }
        });

        observer.observe(nodeRef.current);

        return () => observer.disconnect();
    }, []);

    // check if node is off-screen after dimensions have changed
    useEffect(() => {
        if (x + width > window.innerWidth) {
            x = window.innerWidth - width - 2;
        }

        if (y + height > window.innerHeight) {
            y = window.innerHeight - height - 3;
        }

        const newNodes = context.nodes.value.map((node) =>
            node.uid === uid ? { ...node, x, y } : node,
        );
        context.nodes.value = newNodes;
    }, [width, height]);

    const mouseDown = (e: MouseEvent) => {
        if (e.ctrlKey && context.linkStart.value !== uid) {
            const filteredLinks = context.links.value.filter(
                (link) => link.fromUid !== uid && link.toUid !== uid,
            );
            context.links.value = filteredLinks;

            const filteredNodes = context.nodes.value.filter(
                (node) => node.uid !== uid,
            );
            context.nodes.value = filteredNodes;
        } else if (e.shiftKey) {
            if (context.linkStart.value === null) {
                // start linking
                context.linkStart.value = uid;
            } else if (context.linkStart.value !== uid) {
                // check if the two nodes are already linked
                const alreadyLinked = context.links.value.some(
                    (link) =>
                        (link.fromUid === context.linkStart.value &&
                            link.toUid === uid) ||
                        (link.fromUid === uid &&
                            link.toUid === context.linkStart.value),
                );

                if (!alreadyLinked) {
                    // link to already selected node
                    const newLink: NodeLink = {
                        fromUid: context.linkStart.value,
                        toUid: uid,
                    };

                    context.links.value = [...context.links.value, newLink];
                }

                context.linkStart.value = null;
            }
        } else {
            // move node
            const node = context.nodes.value.find((n) => n.uid === uid);

            if (node) {
                context.cursorOffset.value = {
                    x: e.clientX - node.x,
                    y: e.clientY - node.y,
                };
                context.selectedNode.value = uid;
            }
        }
    };

    const isGrabbed = context.selectedNode.value === uid;
    const isLinking = context.linkStart.value === uid;

    return (
        <div
            ref={nodeRef}
            className={`node ${isGrabbed && "grab_node"} ${isLinking && "link_node"}`}
            style={{
                left: x,
                top: y,
            }}
            onMouseDown={mouseDown}
        >
            <EditableText className="node-title" initialValue="title" />
            <EditableText className="node-value" initialValue="value" />
        </div>
    );
}
