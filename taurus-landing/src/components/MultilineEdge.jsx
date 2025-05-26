// src/components/MultilineEdge.jsx
import React from "react";
import { getBezierPath } from "reactflow";

export default function MultilineEdge({ id, sourceX, sourceY, targetX, targetY, data, markerEnd }) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path id={id} d={edgePath} stroke="#00ffcc" strokeWidth={2} fill="none" markerEnd={markerEnd} />
      <foreignObject
        width={120}
        height={40}
        x={labelX - 60}
        y={labelY - 20}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div
          style={{
            fontSize: "10px",
            textAlign: "center",
            color: "#00ffcc",
            lineHeight: "1.2",
            fontFamily: "sans-serif",
          }}
        >
          Conjunction<br />(Risk &gt; T)
        </div>
      </foreignObject>
    </>
  );
}
