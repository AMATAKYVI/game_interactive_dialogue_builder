'use client';

import React from 'react';
import { DialogueNode } from '../types/dialogue';

interface DialogueNodeComponentProps {
  node: DialogueNode;
  isSelected: boolean;
  isActive: boolean;
  isVisited: boolean;
  isCollapsed: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onToggleCollapse?: () => void;
}

export function DialogueNodeComponent({
  node,
  isSelected,
  isActive,
  isVisited,
  isCollapsed,
  onMouseDown,
  onToggleCollapse,
}: DialogueNodeComponentProps) {
  const getNodeStyle = () => {
    let baseClass =
      'absolute bg-background border-2 rounded-lg cursor-move shadow-lg transition-all ';

    // Size based on collapse state
    if (isCollapsed && !isSelected && !isActive) {
      baseClass += 'p-2 min-w-[180px] max-w-[200px] ';
    } else {
      baseClass += 'p-3 min-w-[300px] ';
    }

    if (isActive) {
      baseClass += 'border-primary shadow-primary/50 shadow-xl scale-105 ';
    } else if (isSelected) {
      baseClass += 'border-secondary shadow-secondary/30 ';
    } else if (isVisited) {
      baseClass += 'border-primary/50 bg-primary/5 ';
    } else {
      baseClass += 'border-secondary/30 hover:border-secondary/60 ';
    }

    if (node.isStartNode) {
      baseClass += 'ring-2 ring-primary/30 ';
    }

    return baseClass;
  };

  const isExpanded = !isCollapsed || isSelected || isActive;

  return (
    <div
      className={getNodeStyle()}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
      onMouseDown={onMouseDown}
    >
      {/* Node Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-secondary">
            {node.isStartNode ? '🎬 START' : '💬'}
          </span>
          <span
            className={`font-semibold ${isExpanded ? 'text-sm' : 'text-xs'} ${
              node.speaker ? 'text-foreground' : 'text-secondary/60 italic'
            }`}
          >
            {node.speaker || 'Unnamed Character'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {isActive && (
            <span className="text-xs bg-primary text-foreground px-2 py-1 rounded-full">
              ACTIVE
            </span>
          )}

          {/* Toggle button - only show if not active/selected */}
          {!isActive && !isSelected && onToggleCollapse && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse();
              }}
              className="text-xs text-secondary hover:text-foreground transition-colors p-1"
            >
              {isCollapsed ? '⬜' : '⬛'}
            </button>
          )}
        </div>
      </div>

      {isExpanded ? (
        /* Full expanded view */
        <>
          {/* Dialogue Text */}
          <div className="mb-3 p-2 bg-secondary/5 rounded border-l-2 border-primary/50">
            <p
              className={`text-sm leading-relaxed ${
                node.text ? 'text-foreground' : 'text-secondary/60 italic'
              }`}
            >
              {node.text || 'Click to edit dialogue...'}
            </p>
          </div>

          {/* Choices */}
          {node.choices.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-secondary mb-1">
                Player Choices:
              </div>
              {node.choices.map((choice, index) => (
                <div
                  key={choice.id}
                  className="flex items-center gap-2 p-2 bg-primary/10 rounded text-xs border border-primary/20"
                >
                  <span className="w-5 h-5 bg-primary text-foreground rounded-full flex items-center justify-center font-bold text-xs">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-foreground">
                    {choice.text || 'Choice text...'}
                  </span>
                  {choice.nextNodeId && (
                    <span className="text-secondary">→</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* No choices indicator */}
          {node.choices.length === 0 && (
            <div className="text-xs text-secondary/60 italic">
              No choices (conversation ends)
            </div>
          )}

          {/* Node ID for debugging */}
          <div className="text-xs text-secondary/40 mt-2 font-mono">
            ID: {node.id.split('_')[1]}
          </div>
        </>
      ) : (
        /* Collapsed view */
        <div className="space-y-1">
          <div className="text-xs text-foreground/80 line-clamp-2 leading-tight">
            {node.text.length > 60 ? `${node.text.slice(0, 60)}...` : node.text}
          </div>

          {node.choices.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-secondary/60">
              <span>{node.choices.length}</span>
              <span>choice{node.choices.length !== 1 ? 's' : ''}</span>
              <span>→</span>
            </div>
          )}

          <div className="text-xs text-secondary/40 font-mono">
            #{node.id.split('_')[1]}
          </div>
        </div>
      )}
    </div>
  );
}
