import { useContext } from "preact/hooks";
import { NodeBase, NodeLink } from "../types";
import { AppContext } from "../context/appContext";

export function Node({ uid, x, y }: NodeBase) {
    const context = useContext(AppContext);

   const mouseDown = (e: MouseEvent) => {
       if (e.ctrlKey) {
           // remove node and all links
           context.setLinks(context.links.filter(link => link.fromUid !== uid && link.toUid !== uid));
           context.setNodes(context.nodes.filter(node => node.uid !== uid));
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
           const node = context.nodes.find(n => n.uid === uid);
           if (node) {
               context.setCursorOffset({ x: e.clientX - node.x, y: e.clientY - node.y });
               context.setSelectedNode(uid);
           }
       }
   }

    return (
        <div className="node" style={{ left: x, top: y }} onMouseDown={mouseDown}>
            <p className="node-title">entity_list</p>
            <p className="node-value">0xABCDEFGH</p>
        </div>
    );
}
