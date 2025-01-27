import { useState } from "react";
import ReactFlow, { Controls, Background } from "react-flow-renderer";
import Select from "react-select";

const SkillTaxonomy = () => {
  // Initial nodes and edges
  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Skill: JavaScript" },
      position: { x: 250, y: 0 },
      style: { background: "#cce5ff", borderRadius: "8px", padding: "5px" },
    },
    {
      id: "2",
      data: { label: "Job: Frontend Developer" },
      position: { x: 100, y: 150 },
      style: { background: "#d4edda", borderRadius: "8px", padding: "5px" },
    },
    {
      id: "3",
      data: { label: "Domain: IT" },
      position: { x: 400, y: 150 },
      style: { background: "#f8d7da", borderRadius: "8px", padding: "5px" },
    },
  ];

  const initialEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      label: "Required For",
      animated: true,
    },
    { id: "e1-3", source: "1", target: "3", label: "Part of Domain" },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [filter, setFilter] = useState(null);

  // Filter domains dynamically
  const domainOptions = [
    { value: "All", label: "All" },
    { value: "IT", label: "IT" },
    { value: "Frontend Developer", label: "Frontend Developer" },
  ];

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption?.value || "All");

    if (selectedOption.value === "IT") {
      setNodes((prevNodes) =>
        prevNodes.filter((node) => node.data.label.includes("IT"))
      );
    } else if (selectedOption.value === "Frontend Developer") {
      setNodes((prevNodes) =>
        prevNodes.filter((node) => node.data.label.includes("Frontend"))
      );
    } else {
      setNodes(initialNodes); // Reset to all nodes
    }
  };

  // Add a new node dynamically
  const addNode = () => {
    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      data: { label: `Skill: React.js` },
      position: { x: 300, y: 300 },
      style: { background: "#fff3cd", borderRadius: "8px", padding: "5px" },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `e${newNodeId}-2`,
        source: newNodeId,
        target: "2",
        label: "Required For",
        animated: true,
      },
    ]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Filter Panel */}
      <div
        style={{
          width: "20%",
          background: "#f8f8f8",
          padding: "10px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h3>Filter Panel</h3>
        <Select
          options={domainOptions}
          onChange={handleFilterChange}
          placeholder="Filter by Domain or Job"
        />
        <button
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={addNode}
        >
          Add Node
        </button>
      </div>

      {/* React Flow Graph */}
      <div style={{ flex: 1 }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default SkillTaxonomy;
