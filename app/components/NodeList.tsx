'use client';

import React from 'react';
import { DialogueNode, PlaytestState } from '../types/dialogue';

interface NodeListProps {
  nodes: DialogueNode[];
  selectedNodeId: string | null;
  playtestState: PlaytestState;
  onNodeSelect: (nodeId: string) => void;
  onNodeDelete: (nodeId: string) => void;
}

export function NodeList({
  nodes,
  selectedNodeId,
  playtestState,
  onNodeSelect,
  onNodeDelete,
}: NodeListProps) {
  const getNodeStatus = (node: DialogueNode) => {
    if (playtestState.isActive && playtestState.currentNodeId === node.id) {
      return 'playtest-active';
    }
    if (selectedNodeId === node.id) {
      return 'selected';
    }
    if (playtestState.history.includes(node.id)) {
      return 'visited';
    }
    return 'default';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'playtest-active':
        return 'border-primary bg-primary/20 shadow-primary/30';
      case 'selected':
        return 'border-secondary bg-secondary/10';
      case 'visited':
        return 'border-primary/50 bg-primary/5';
      default:
        return 'border-secondary/20 hover:border-secondary/40';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'playtest-active':
        return '▶️';
      case 'selected':
        return '✏️';
      case 'visited':
        return '👁️';
      default:
        return '💬';
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Dialogue Nodes</h2>
        <span className="text-sm text-secondary bg-secondary/10 px-2 py-1 rounded">
          {nodes.length} nodes
        </span>
      </div>

      {nodes.length === 0 ? (
        <div className="text-center py-8 text-secondary/60">
          <div className="text-4xl mb-3">📝</div>
          <div className="text-sm">No nodes yet</div>
          <div className="text-xs">
            Double-click the canvas to create your first dialogue node
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {nodes.map((node, index) => {
            const status = getNodeStatus(node);
            return (
              <div
                key={node.id}
                className={`
                  border-2 rounded-lg p-3 cursor-pointer transition-all
                  ${getStatusColor(status)}
                  ${status === 'selected' ? 'ring-2 ring-secondary/30' : ''}
                `}
                onClick={() => onNodeSelect(node.id)}
              >
                {/* Node Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getStatusIcon(status)}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        {node.isStartNode && (
                          <span className="text-xs bg-primary text-foreground px-2 py-0.5 rounded-full font-bold">
                            START
                          </span>
                        )}
                        <span className="font-semibold text-foreground text-sm">
                          {node.speaker}
                        </span>
                      </div>
                      <div className="text-xs text-secondary/60">
                        Node #{index + 1}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNodeDelete(node.id);
                    }}
                    className="text-xs text-red-500/60 hover:text-red-500 transition-colors p-1"
                  >
                    🗑️
                  </button>
                </div>

                {/* Node Content Preview */}
                <div className="mb-2">
                  <p className="text-xs text-foreground/80 line-clamp-2 leading-relaxed">
                    {node.text.length > 80
                      ? `${node.text.slice(0, 80)}...`
                      : node.text}
                  </p>
                </div>

                {/* Node Stats */}
                <div className="flex items-center justify-between text-xs text-secondary/60">
                  <div className="flex items-center gap-3">
                    <span>
                      {node.choices.length} choice
                      {node.choices.length !== 1 ? 's' : ''}
                    </span>
                    {node.choices.length > 0 && (
                      <span className="flex items-center gap-1">
                        <span>→</span>
                        <span>
                          {node.choices.filter((c) => c.nextNodeId).length}{' '}
                          connected
                        </span>
                      </span>
                    )}
                  </div>

                  {status === 'selected' && (
                    <span className="text-secondary font-semibold">
                      EDITING
                    </span>
                  )}
                  {status === 'playtest-active' && (
                    <span className="text-primary font-semibold">ACTIVE</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Stats */}
      {nodes.length > 0 && (
        <div className="mt-6 p-3 bg-secondary/5 rounded-lg border border-secondary/10">
          <div className="text-xs font-semibold text-secondary mb-2">
            Quick Stats
          </div>
          <div className="space-y-1 text-xs text-secondary/80">
            <div>• Total Nodes: {nodes.length}</div>
            <div>
              • Start Node:{' '}
              {nodes.find((n) => n.isStartNode)?.speaker || 'None set'}
            </div>
            <div>
              • Total Choices:{' '}
              {nodes.reduce((sum, node) => sum + node.choices.length, 0)}
            </div>
            <div>
              • Connected Paths:{' '}
              {nodes.reduce(
                (sum, node) =>
                  sum + node.choices.filter((c) => c.nextNodeId).length,
                0
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
