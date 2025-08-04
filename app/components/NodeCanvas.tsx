'use client';

import React, { useRef, useState, useCallback } from 'react';
import { DialogueNode, PlaytestState } from '../types/dialogue';
import { DialogueNodeComponent } from './DialogueNodeComponent';
// import { DialogueNodeComponent } from './DialogueNodeComponent';

interface NodeCanvasProps {
  nodes: DialogueNode[];
  selectedNodeId: string | null;
  playtestState: PlaytestState;
  onNodeSelect: (nodeId: string | null) => void;
  onNodeMove: (nodeId: string, updates: Partial<DialogueNode>) => void;
  onAddNode: (position: { x: number; y: number }) => void;
}

export function NodeCanvas({
  nodes,
  selectedNodeId,
  playtestState,
  onNodeSelect,
  onNodeMove,
  onAddNode,
}: NodeCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Get the currently active node (selected or playtest active)
  const activeNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : playtestState.isActive && playtestState.currentNodeId
    ? nodes.find((n) => n.id === playtestState.currentNodeId)
    : null;

  const handleCanvasDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === canvasRef.current) {
        onAddNode({ x: 400, y: 300 }); // Center the new node
      }
    },
    [onAddNode]
  );

  // Auto-collapse all nodes except selected/active ones when selection changes
  const handleNodeSelect = useCallback(
    (nodeId: string | null) => {
      onNodeSelect(nodeId);
    },
    [onNodeSelect]
  );

  const handleNodeMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation();

      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      setDragOffset({
        x: e.clientX - node.position.x,
        y: e.clientY - node.position.y,
      });
      setIsDragging(nodeId);
      handleNodeSelect(nodeId);
    },
    [nodes, handleNodeSelect]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        onNodeMove(isDragging, {
          position: { x: Math.max(0, newX), y: Math.max(0, newY) },
        });
      }
    },
    [isDragging, dragOffset, onNodeMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === canvasRef.current) {
        handleNodeSelect(null);
      }
    },
    [handleNodeSelect]
  );

  // Create connections between nodes
  const renderConnectionsFromActive = () => {
    if (!activeNode || activeNode.choices.length === 0) return null;

    return activeNode.choices.map((choice, choiceIndex) => {
      if (!choice.nextNodeId) return null;

      const targetNode = nodes.find((n) => n.id === choice.nextNodeId);
      if (!targetNode) return null;

      const startX = 400 + 150; // Active node position + half width
      const startY = 200 + 80 + choiceIndex * 30; // Choice button position
      const endX = 600; // Arrow pointing right
      const endY = startY;

      return (
        <g key={`${activeNode.id}-${choice.id}`}>
          <path
            d={`M ${startX} ${startY} L ${endX} ${endY}`}
            stroke="#F0BB78"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#F0BB78" />
            </marker>
          </defs>
          {/* Label for the connection */}
          <text x={endX + 10} y={endY + 5} className="text-xs fill-primary">
            → {targetNode.speaker}
          </text>
        </g>
      );
    });
  };

  return (
    <div
      ref={canvasRef}
      className="w-full h-full bg-background/30 relative overflow-hidden cursor-pointer"
      onDoubleClick={handleCanvasDoubleClick}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#543A14"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 pointer-events-none">
        {renderConnectionsFromActive()}
      </svg>

      {/* Nodes - Only show the active/selected node */}
      {activeNode && (
        <DialogueNodeComponent
          key={activeNode.id}
          node={{
            ...activeNode,
            position: { x: 400, y: 200 }, // Center the active node
          }}
          isSelected={selectedNodeId === activeNode.id}
          isActive={
            playtestState.isActive &&
            playtestState.currentNodeId === activeNode.id
          }
          isVisited={playtestState.history.includes(activeNode.id)}
          isCollapsed={false} // Always expanded when active
          onMouseDown={(e) => handleNodeMouseDown(e, activeNode.id)}
          onToggleCollapse={() => {}} // No collapse when active
        />
      )}

      {/* Instructions overlay when empty */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-secondary/60">
            <div className="text-6xl mb-4">🎭</div>
            <div className="text-xl font-semibold mb-2">
              Start Creating Your Dialogue
            </div>
            <div className="text-sm">
              Double-click anywhere to add your first dialogue node
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
