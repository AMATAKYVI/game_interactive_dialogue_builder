'use client';

import React, { useState } from 'react';
import { DialogueNode, DialogueChoice } from '../types/dialogue';

interface NodeEditorProps {
  node: DialogueNode;
  onUpdate: (updates: Partial<DialogueNode>) => void;
  onDelete: () => void;
  allNodes: DialogueNode[];
}

export function NodeEditor({
  node,
  onUpdate,
  onDelete,
  allNodes,
}: NodeEditorProps) {
  const [localSpeaker, setLocalSpeaker] = useState(node.speaker);
  const [localText, setLocalText] = useState(node.text);

  const handleSpeakerChange = (value: string) => {
    setLocalSpeaker(value);
    onUpdate({ speaker: value });
  };

  const handleTextChange = (value: string) => {
    setLocalText(value);
    onUpdate({ text: value });
  };

  const addChoice = () => {
    const newChoice: DialogueChoice = {
      id: `choice_${Date.now()}`,
      text: '',
      nextNodeId: null,
    };

    onUpdate({
      choices: [...node.choices, newChoice],
    });
  };

  const updateChoice = (choiceId: string, updates: Partial<DialogueChoice>) => {
    const updatedChoices = node.choices.map((choice) =>
      choice.id === choiceId ? { ...choice, ...updates } : choice
    );
    onUpdate({ choices: updatedChoices });
  };

  const deleteChoice = (choiceId: string) => {
    const updatedChoices = node.choices.filter(
      (choice) => choice.id !== choiceId
    );
    onUpdate({ choices: updatedChoices });
  };

  const setAsStartNode = () => {
    // First, remove start node status from all other nodes
    const updatedNodes = allNodes.map((n) => ({ ...n, isStartNode: false }));

    // Then set this node as start
    onUpdate({ isStartNode: true });
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Edit Node</h2>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-xs bg-red-500/20 text-red-600 rounded hover:bg-red-500/30 transition-colors"
        >
          🗑️ Delete
        </button>
      </div>

      <div className="space-y-6">
        {/* Speaker Name */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Speaker Name
          </label>
          <input
            type="text"
            value={localSpeaker}
            onChange={(e) => handleSpeakerChange(e.target.value)}
            className="w-full p-3 border-2 border-secondary/20 rounded-lg bg-background text-white focus:border-primary focus:outline-none"
            placeholder="Character name..."
          />
        </div>

        {/* Dialogue Text */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Dialogue Text
          </label>
          <textarea
            value={localText}
            onChange={(e) => handleTextChange(e.target.value)}
            rows={4}
            className="w-full p-3 border-2 border-secondary/20 rounded-lg bg-background text-white focus:border-primary focus:outline-none resize-none"
            placeholder="What does this character say?"
          />
        </div>

        {/* Start Node Toggle */}
        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div>
            <div className="font-semibold text-white text-sm">Start Node</div>
            <div className="text-xs text-white">
              This is where the conversation begins
            </div>
          </div>
          <button
            onClick={setAsStartNode}
            disabled={node.isStartNode}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              node.isStartNode
                ? 'bg-primary text-white'
                : 'bg-secondary/20 text-white hover:bg-secondary hover:text-background'
            }`}
          >
            {node.isStartNode ? '✓ START' : 'Set as Start'}
          </button>
        </div>

        {/* Player Choices */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-white">
              Player Choices
            </label>
            <button
              onClick={addChoice}
              className="px-3 py-1 bg-primary text-white rounded text-xs font-medium hover:bg-primary/80 transition-colors"
            >
              ➕ Add Choice
            </button>
          </div>

          <div className="space-y-3">
            {node.choices.map((choice, index) => (
              <div
                key={choice.id}
                className="p-3 border-2 border-secondary/20 rounded-lg bg-background/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">
                    Choice {index + 1}
                  </span>
                  <button
                    onClick={() => deleteChoice(choice.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>

                <textarea
                  value={choice.text}
                  onChange={(e) =>
                    updateChoice(choice.id, { text: e.target.value })
                  }
                  rows={2}
                  className="w-full p-2 text-sm border border-secondary/20 rounded bg-background text-white focus:border-primary focus:outline-none resize-none mb-2"
                  placeholder="Player choice text..."
                />

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Next Node
                  </label>
                  <select
                    value={choice.nextNodeId || ''}
                    onChange={(e) =>
                      updateChoice(choice.id, {
                        nextNodeId: e.target.value || null,
                      })
                    }
                    className="w-full p-2 text-sm border border-secondary/20 rounded bg-background text-white focus:border-primary focus:outline-none"
                  >
                    <option value="">End conversation</option>
                    {allNodes
                      .filter((n) => n.id !== node.id)
                      .map((targetNode) => (
                        <option key={targetNode.id} value={targetNode.id}>
                          {targetNode.speaker}: {targetNode.text.slice(0, 30)}
                          ...
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {node.choices.length === 0 && (
            <div className="text-center p-6 text-white bg-secondary/5 rounded-lg border border-secondary/10">
              <div className="text-2xl mb-2">💭</div>
              <div className="text-sm">No choices yet</div>
              <div className="text-xs">
                Add choices to create branching dialogue
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
