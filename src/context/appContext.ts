import { createContext } from "preact";
import { useState } from "preact/hooks";
import { ContextMenuBase, CursorOffset, NodeBase, NodeLink } from "../types";

interface AppContextValues {
    contextMenu: ContextMenuBase | null;
    setContextMenu: (contextMenu: ContextMenuBase | null) => void;

    nodes: NodeBase[];
    setNodes: (nodes: NodeBase[]) => void;

    selectedNode: string | null;
    setSelectedNode: (node: string | null) => void;

    links: NodeLink[];
    setLinks: (links: NodeLink[]) => void;

    linkStart: string | null;
    setLinkStart: (linkStart: string | null) => void;

    cursorOffset: CursorOffset;
    setCursorOffset: (cursorOffset: CursorOffset) => void;
}

const AppContext = createContext<AppContextValues>(null);

function createAppContext(): AppContextValues {
    const [contextMenu, setContextMenu] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [links, setLinks] = useState([]);
    const [linkStart, setLinkStart] = useState(null);
    const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });

    return {
        contextMenu,
        setContextMenu,

        nodes,
        setNodes,

        selectedNode,
        setSelectedNode,

        links,
        setLinks,

        linkStart,
        setLinkStart,

        cursorOffset,
        setCursorOffset,
    };
}

export { AppContext, createAppContext };
