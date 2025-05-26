import React, { useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

export default function DataFlowDiagram() {
  const { laidOutNodes, laidOutEdges } = useMemo(() => {
    const nodeBase = {
      style: {
        fontSize: 12,
        color: "#fff",
        borderRadius: 6,
        padding: 10,
        borderWidth: 1,
        borderStyle: "solid",
        textAlign: "center",
        minWidth: 140,
      },
    };

    const colours = {
      source: "#1f9aff",
      process: "#9147ff",
      deliver: "#00cba4",
      consumer: "#ffca28",
    };

    const rawNodes = [
      {
        id: "sat_ingest",
        data: { label: "TLE Ingest" },
        type: "input",
        ...nodeBase,
        style: { ...nodeBase.style, borderColor: colours.source, background: "#163070" },
      },
      {
        id: "collision",
        data: { label: "Collision Engine" },
        ...nodeBase,
        style: { ...nodeBase.style, borderColor: colours.process, background: "#2d1761" },
      },
      {
        id: "maneuver",
        data: { label: "Maneuver Engine" },
        ...nodeBase,
        style: { ...nodeBase.style, borderColor: colours.process, background: "#2d1761" },
      },
      {
        id: "api",
        data: { label: "REST / WebSocket\nFeeds API" },
        ...nodeBase,
        style: { ...nodeBase.style, borderColor: colours.deliver, background: "#055a52" },
      },
      {
        id: "exports",
        data: { label: "CSV / XML / CMF\nBatch Exports" },
        ...nodeBase,
        style: { ...nodeBase.style, borderColor: colours.deliver, background: "#055a52" },
      },
      {
        id: "consumer",
        data: { label: "External Consumer" },
        type: "output",
        ...nodeBase,
        style: { ...nodeBase.style, borderColor: colours.consumer, background: "#5d4f00" },
      },
    ];

    const rawEdges = [
      { id: "e1", source: "sat_ingest", target: "collision", label: "TLE", animated: true },
      { id: "e2", source: "collision", target: "maneuver", label: "Conjunction", animated: true, style: { strokeDasharray: "6 4" } },
      { id: "e3", source: "maneuver", target: "api", label: "ΔV Advice (JSON)", animated: true },
      { id: "e4", source: "api", target: "consumer", label: "REST + Socket.IO", animated: true, style: { strokeDasharray: "6 4" } },
      { id: "e5", source: "maneuver", target: "exports", label: "Daily Batch", animated: true },
      { id: "e6", source: "exports", target: "consumer", label: "CSV / XML / CMF", animated: true },
    ];

    const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: "LR", nodesep: 60, ranksep: 90 });
    rawNodes.forEach((n) => g.setNode(n.id, { width: 150, height: 70 }));
    rawEdges.forEach((e) => g.setEdge(e.source, e.target));
    dagre.layout(g);

    const laidOutNodes = rawNodes.map((n) => {
      let position = { x: g.node(n.id).x, y: g.node(n.id).y };

      // Manually override the position of the Collision Engine
      if (n.id === "collision") {
        position = { x: 315, y: 150 }; // Customize these values as needed
      }

      return {
        ...n,
        position,
        sourcePosition: "right",
        targetPosition: "left",
      };
    });

    const laidOutEdges = rawEdges.map((e) => ({
      ...e,
      markerEnd: { type: "arrowclosed" },
      style: { strokeWidth: 2, stroke: "#00ffcc", ...e.style },
    }));

    return { laidOutNodes, laidOutEdges };
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(laidOutNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(laidOutEdges);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.05 }}
        panOnDrag
        zoomOnScroll={false}
        className="bg-[#0f172a]"
      >
        <Controls showZoom={false} position="bottom-left" />
        <Background gap={20} size={1.5} color="#ffffff" variant="dots" />
      </ReactFlow>
    </div>
  );
}
