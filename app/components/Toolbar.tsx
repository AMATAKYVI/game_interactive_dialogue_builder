'use client';

import React from 'react';
import { DialogueProject } from '../types/dialogue';

interface ToolbarProps {
  project: DialogueProject;
  onExportJSON: () => void;
  onStartPlaytest: () => void;
  onAddNode: (position: { x: number; y: number }) => void;
  onLoadSample?: () => void;
  onNewProject?: () => void;
  onCollapseAll?: () => void;
  onExpandAll?: () => void;
}

export function Toolbar({
  project,
  onExportJSON,
  onStartPlaytest,
  onAddNode,
  onLoadSample,
  onNewProject,
  onCollapseAll,
  onExpandAll,
}: ToolbarProps) {
  const handleAddNode = () => {
    // Add node at center of viewport
    onAddNode({ x: 400, y: 300 });
  };

  return (
    <div className="border-b-2 border-secondary/20 bg-background/95 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddNode}
            className="px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary/80 transition-colors font-medium"
          >
            ➕ Add Node
          </button>

          {onLoadSample && (
            <button
              onClick={onLoadSample}
              className="px-3 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary hover:text-background transition-colors font-medium text-sm"
            >
              🎭 Load Sample
            </button>
          )}

          {onNewProject && (
            <button
              onClick={onNewProject}
              className="px-3 py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent hover:text-background transition-colors font-medium text-sm"
            >
              📄 New Project
            </button>
          )}

          <div className="flex items-center gap-2">
            {onCollapseAll && (
              <button
                onClick={onCollapseAll}
                className="px-2 py-1 bg-secondary/10 text-secondary rounded hover:bg-secondary/20 transition-colors text-xs"
                title="Collapse All Nodes"
              >
                ⬛
              </button>
            )}

            {onExpandAll && (
              <button
                onClick={onExpandAll}
                className="px-2 py-1 bg-secondary/10 text-secondary rounded hover:bg-secondary/20 transition-colors text-xs"
                title="Expand All Nodes"
              >
                ⬜
              </button>
            )}
          </div>

          <div className="text-sm text-secondary">
            Nodes: {project.nodes.length}
            {project.startNodeId &&
              ` • Start: ${
                project.nodes.find((n) => n.id === project.startNodeId)
                  ?.speaker || 'Unknown'
              }`}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartPlaytest}
            disabled={!project.startNodeId}
            className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-secondary/80 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ▶️ Playtest
          </button>

          <button
            onClick={onExportJSON}
            disabled={project.nodes.length === 0}
            className="px-4 py-2 border-2 border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-background transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📥 Export JSON
          </button>
        </div>
      </div>
    </div>
  );
}
