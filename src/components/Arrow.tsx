import { ArrowBase, NodeBase } from "../types";

function calculateAnchorPoint(from: NodeBase, to: NodeBase) {
    const yDistance = Math.abs(from.y - to.y);

    if (yDistance < from.height && yDistance > 0) {
        const y = from.y + from.height / 2;
        if (from.x < to.x) {
            return { x: from.x + from.width, y };
        } else {
            return { x: from.x, y };
        }
    } else if (from.y < to.y) {
        return { x: from.x + from.width / 2, y: from.y + from.height };
    } else if (from.y > to.y) {
        return { x: from.x + from.width / 2, y: from.y };
    }
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
