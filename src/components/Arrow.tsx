import { ArrowBase, NodeBase } from "../types";

function calculateAnchorPoint(from: NodeBase, to: NodeBase) {
    const xDistance = Math.abs(from.x - to.x);
    const yDistance = Math.abs(from.y - to.y);

    const calculateX = () => {
        if (xDistance <= from.width && xDistance > 0) {
            return from.x + from.width / 2;
        } else if (from.x < to.x) {
            return from.x + from.width;
        } else {
            return from.x;
        }
    };

    const calculateY = () => {
        if (yDistance <= from.height && yDistance >= 0) {
            // nodes on the same height
            return from.y + from.height / 2; // middle
        } else if (from.y < to.y) {
            // target node is below
            return from.y + from.height; // bottom
        } else {
            // target node is above
            return from.y; // top
        }
    };

    return {
        x: calculateX(),
        y: calculateY(),
    };
}

export function Arrow({ from, to }: ArrowBase) {
    const start = calculateAnchorPoint(from, to);
    const end = calculateAnchorPoint(to, from);

    const dX = end.x - start.x;
    const dY = end.y - start.y;
    const length = Math.sqrt(dX * dX + dY * dY);
    const angle = Math.atan2(dY, dX) * (180 / Math.PI);

    return (
        <>
            <div
                className="arrow"
                style={{
                    left: start.x,
                    top: start.y,
                    width: length,
                    transform: `rotate(${angle}deg)`,
                }}
            />
            <div
                className="arrow-head"
                style={{
                    left: end.x - 6,
                    top: end.y - 6,
                    transform: `rotate(${angle - 90}deg)`,
                }}
            />
        </>
    );
}
