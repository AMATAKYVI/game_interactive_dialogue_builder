'use client';

import React, { useRef, useState, useCallback } from 'react';
import { DialogueNode, PlaytestState } from '../types/dialogue';
import { DialogueNodeComponent } from './DialogueNodeComponent';

interface NodeCanvasProps {
  nodes: DialogueNode[];
  selectedNodeId: string | null;
  playtestState: PlaytestState;
  onNodeSelect: (nodeId: string | null) => void;
  onNodeMove: (nodeId: string, updates: Partial<DialogueNode>) => void;
  onAddNode: (position: { x: number; y: number }) => void;
  onCollapseAll?: () => void;
  onExpandAll?: () => void;
}

export function NodeCanvasSimple({
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
      onNodeSelect(nodeId);
    },
    [nodes, onNodeSelect]
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
        onNodeSelect(null);
      }
    },
    [onNodeSelect]
  );

  // Render connection lines from the active node to its choices
  const renderConnections = () => {
    if (!activeNode || activeNode.choices.length === 0) return null;

    const connections: React.ReactElement[] = [];

    activeNode.choices.forEach((choice, choiceIndex) => {
      if (choice.nextNodeId) {
        const targetNode = nodes.find((n) => n.id === choice.nextNodeId);
        if (targetNode) {
          const startX = activeNode.position.x + 150; // Half node width
          const startY = activeNode.position.y + 80 + choiceIndex * 30; // Choice button position
          const endX = 600; // Right side of canvas
          const endY = 100 + choiceIndex * 50; // Spread out the connections

          connections.push(
            <g key={`${activeNode.id}-${choice.id}`}>
              <path
                d={`M ${startX} ${startY} Q ${
                  startX + 100
                } ${startY} ${endX} ${endY}`}
                stroke="#F0BB78"
                strokeWidth="2"
                fill="none"
                className="transition-colors"
              />
              {/* Arrow head */}
              <polygon
                points={`${endX - 8},${endY - 4} ${endX},${endY} ${endX - 8},${
                  endY + 4
                }`}
                fill="#F0BB78"
              />
              {/* Target node label */}
              <foreignObject
                x={endX + 10}
                y={endY - 10}
                width="200"
                height="20"
              >
                <div className="text-xs text-primary bg-background/80 px-2 py-1 rounded border border-primary/30">
                  → {targetNode.speaker}
                </div>
              </foreignObject>
            </g>
          );
        }
      }
    });

    return connections;
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
      {activeNode && (
        <svg className="absolute inset-0 pointer-events-none">
          {renderConnections()}
        </svg>
      )}

      {/* Active Node */}
      {activeNode ? (
        <DialogueNodeComponent
          key={activeNode.id}
          node={activeNode}
          isSelected={selectedNodeId === activeNode.id}
          isActive={
            playtestState.isActive &&
            playtestState.currentNodeId === activeNode.id
          }
          isVisited={playtestState.history.includes(activeNode.id)}
          isCollapsed={false} // Always expanded when active
          onMouseDown={(e) => handleNodeMouseDown(e, activeNode.id)}
        />
      ) : (
        /* Instructions overlay when no active node */
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-secondary/60">
            <div className="text-6xl mb-4">🎭</div>
            <div className="text-xl font-semibold mb-2">
              {nodes.length === 0
                ? 'Start Creating Your Dialogue'
                : 'Select a Node to Edit'}
            </div>
            <div className="text-sm">
              {nodes.length === 0
                ? 'Double-click anywhere to add your first dialogue node'
                : 'Choose a node from the list on the right to view and edit it here'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
