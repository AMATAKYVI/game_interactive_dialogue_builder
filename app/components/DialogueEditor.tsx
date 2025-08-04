'use client';

import React, { useState, useCallback } from 'react';
import {
  DialogueNode,
  DialogueProject,
  PlaytestState,
} from '../types/dialogue';
// import { NodeCanvas } from './NodeCanvas';
// import { Toolbar } from './Toolbar';
// import { PlaytestPanel } from './PlaytestPanel';
// import { NodeEditor } from './NodeEditor';
import { NodeCanvas } from './NodeCanvas';
import { NodeList } from './NodeList';
import { Toolbar } from './Toolbar';
import { PlaytestPanel } from './PlaytestPanel';
import { NodeEditor } from './NodeEditor';
import { sampleProject } from '../data/sampleDialogue';

export function DialogueEditor() {
  const [project, setProject] = useState<DialogueProject>(sampleProject);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [playtestState, setPlaytestState] = useState<PlaytestState>({
    currentNodeId: null,
    history: [],
    isActive: false,
  });

  const addNode = useCallback(
    (position: { x: number; y: number }) => {
      const newNode: DialogueNode = {
        id: `node_${Date.now()}`,
        speaker: '',
        text: '',
        choices: [],
        position,
        isStartNode: project.nodes.length === 0, // First node is start node
      };

      setProject((prev) => ({
        ...prev,
        nodes: [...prev.nodes, newNode],
        startNodeId: prev.startNodeId || newNode.id,
        lastModified: new Date(),
      }));

      setSelectedNodeId(newNode.id);
    },
    [project.nodes.length]
  );

  const updateNode = useCallback(
    (nodeId: string, updates: Partial<DialogueNode>) => {
      setProject((prev) => ({
        ...prev,
        nodes: prev.nodes.map((node) =>
          node.id === nodeId ? { ...node, ...updates } : node
        ),
        lastModified: new Date(),
      }));
    },
    []
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      setProject((prev) => ({
        ...prev,
        nodes: prev.nodes.filter((node) => node.id !== nodeId),
        startNodeId:
          prev.startNodeId === nodeId
            ? prev.nodes.find((n) => n.id !== nodeId)?.id || null
            : prev.startNodeId,
        lastModified: new Date(),
      }));

      if (selectedNodeId === nodeId) {
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId]
  );

  const exportJSON = useCallback(() => {
    const exportData = {
      projectInfo: {
        name: project.name,
        startNodeId: project.startNodeId,
        exportedAt: new Date().toISOString(),
      },
      dialogue: project.nodes.map((node) => ({
        id: node.id,
        speaker: node.speaker,
        text: node.text,
        choices: node.choices.map((choice) => ({
          text: choice.text,
          nextId: choice.nextNodeId,
        })),
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [project]);

  const startPlaytest = useCallback(() => {
    if (project.startNodeId) {
      setPlaytestState({
        currentNodeId: project.startNodeId,
        history: [project.startNodeId],
        isActive: true,
      });
    }
  }, [project.startNodeId]);

  const loadSample = useCallback(() => {
    setProject(sampleProject);
    setSelectedNodeId(null);
    setPlaytestState({
      currentNodeId: null,
      history: [],
      isActive: false,
    });
  }, []);

  const newProject = useCallback(() => {
    setProject({
      id: 'default',
      name: 'New Dialogue Tree',
      nodes: [],
      startNodeId: null,
      createdAt: new Date(),
      lastModified: new Date(),
    });
    setSelectedNodeId(null);
    setPlaytestState({
      currentNodeId: null,
      history: [],
      isActive: false,
    });
  }, []);

  const selectedNode = selectedNodeId
    ? project.nodes.find((node) => node.id === selectedNodeId)
    : null;

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        <Toolbar
          project={project}
          onExportJSON={exportJSON}
          onStartPlaytest={startPlaytest}
          onAddNode={addNode}
          onLoadSample={loadSample}
          onNewProject={newProject}
        />

        <div className="flex-1 relative">
          <NodeCanvas
            nodes={project.nodes}
            selectedNodeId={selectedNodeId}
            playtestState={playtestState}
            onNodeSelect={setSelectedNodeId}
            onNodeMove={updateNode}
            onAddNode={addNode}
          />
        </div>
      </div>

      {/* Left Panel - Node List (always visible) */}
      <div className="w-80 border-l-2 border-secondary/20 bg-background/50">
        {playtestState.isActive ? (
          <PlaytestPanel
            nodes={project.nodes}
            playtestState={playtestState}
            onPlaytestUpdate={setPlaytestState}
            onEndPlaytest={() =>
              setPlaytestState((prev) => ({ ...prev, isActive: false }))
            }
          />
        ) : (
          <NodeList
            nodes={project.nodes}
            selectedNodeId={selectedNodeId}
            playtestState={playtestState}
            onNodeSelect={setSelectedNodeId}
            onNodeDelete={deleteNode}
          />
        )}
      </div>

      {/* Right Panel - Node Editor (when node selected) */}
      {selectedNode && !playtestState.isActive && (
        <div className="w-80 border-l-2 border-secondary/20 bg-background/50">
          <NodeEditor
            node={selectedNode}
            onUpdate={(updates) => updateNode(selectedNode.id, updates)}
            onDelete={() => deleteNode(selectedNode.id)}
            allNodes={project.nodes}
          />
        </div>
      )}
    </div>
  );
}
