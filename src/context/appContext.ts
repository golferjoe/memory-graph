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
    const [contextMenu, setContextMenu] = useState<ContextMenuType>(null);
    const [nodes, setNodes] = useState<NodeBase[]>([]);
    const [selectedNode, setSelectedNode] = useState<NodeUidType>(null);
    const [links, setLinks] = useState<NodeLink[]>([]);
    const [linkStart, setLinkStart] = useState<NodeUidType>(null);
    const [cursorOffset, setCursorOffset] = useState<CursorOffset>({
        x: 0,
        y: 0,
    });

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
