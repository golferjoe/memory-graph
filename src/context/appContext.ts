import { createContext } from "preact";
import { Dispatch, StateUpdater, useState } from "preact/hooks";
import { ContextMenuBase, CursorOffset, NodeBase, NodeLink } from "../types";

type ContextMenuType = ContextMenuBase | null;
type NodeUidType = string | null;

interface AppContextValues {
    contextMenu: ContextMenuType;
    setContextMenu: Dispatch<StateUpdater<ContextMenuType>>;

    nodes: NodeBase[];
    setNodes: Dispatch<StateUpdater<NodeBase[]>>;

    selectedNode: NodeUidType;
    setSelectedNode: Dispatch<StateUpdater<NodeUidType>>;

    links: NodeLink[];
    setLinks: Dispatch<StateUpdater<NodeLink[]>>;

    linkStart: NodeUidType;
    setLinkStart: Dispatch<StateUpdater<NodeUidType>>;

    cursorOffset: CursorOffset;
    setCursorOffset: Dispatch<StateUpdater<CursorOffset>>;
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
