'use client';

import React from 'react';
import { DialogueNode, PlaytestState } from '../types/dialogue';

interface PlaytestPanelProps {
  nodes: DialogueNode[];
  playtestState: PlaytestState;
  onPlaytestUpdate: (state: PlaytestState) => void;
  onEndPlaytest: () => void;
}

export function PlaytestPanel({
  nodes,
  playtestState,
  onPlaytestUpdate,
  onEndPlaytest,
}: PlaytestPanelProps) {
  const currentNode = playtestState.currentNodeId
    ? nodes.find((node) => node.id === playtestState.currentNodeId)
    : null;

  const handleChoiceClick = (nextNodeId: string | null) => {
    if (nextNodeId) {
      onPlaytestUpdate({
        ...playtestState,
        currentNodeId: nextNodeId,
        history: [...playtestState.history, nextNodeId],
      });
    } else {
      // Conversation ended
      onPlaytestUpdate({
        ...playtestState,
        currentNodeId: null,
      });
    }
  };

  const restartPlaytest = () => {
    const startNode = nodes.find((node) => node.isStartNode);
    if (startNode) {
      onPlaytestUpdate({
        currentNodeId: startNode.id,
        history: [startNode.id],
        isActive: true,
      });
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">🎮 Playtest Mode</h2>
        <button
          onClick={onEndPlaytest}
          className="px-3 py-1 text-xs bg-secondary/20 text-secondary rounded hover:bg-secondary hover:text-background transition-colors"
        >
          ✕ Exit
        </button>
      </div>

      {currentNode ? (
        <div className="flex-1 flex flex-col">
          {/* Current Dialogue */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-semibold">
                {currentNode.speaker}
              </span>
              {currentNode.isStartNode && (
                <span className="px-2 py-1 bg-secondary/20 text-secondary rounded text-xs">
                  START
                </span>
              )}
            </div>

            <div className="p-4 bg-secondary/5 rounded-lg border-l-4 border-primary">
              <p className="text-foreground leading-relaxed">
                {currentNode.text}
              </p>
            </div>
          </div>

          {/* Player Choices */}
          {currentNode.choices.length > 0 ? (
            <div className="mb-6">
              <div className="text-sm font-semibold text-secondary mb-3">
                Choose your response:
              </div>
              <div className="space-y-2">
                {currentNode.choices.map((choice, index) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceClick(choice.nextNodeId)}
                    className="w-full p-3 text-left bg-background border-2 border-secondary/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-primary text-foreground rounded-full flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                        {index + 1}
                      </span>
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {choice.text}
                      </span>
                      <span className="ml-auto text-secondary group-hover:text-primary transition-colors">
                        {choice.nextNodeId ? '→' : '🏁'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-secondary/10 rounded-lg text-center">
              <div className="text-2xl mb-2">🏁</div>
              <div className="font-semibold text-foreground mb-1">
                Conversation Ended
              </div>
              <div className="text-sm text-secondary">
                No more choices available
              </div>
            </div>
          )}

          {/* Playtest Controls */}
          <div className="mt-auto space-y-3">
            <button
              onClick={restartPlaytest}
              className="w-full px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary/80 transition-colors font-medium"
            >
              🔄 Restart Conversation
            </button>

            {/* Stats */}
            <div className="text-xs text-secondary space-y-1 bg-secondary/5 p-3 rounded-lg">
              <div>
                <strong>Nodes Visited:</strong> {playtestState.history.length}
              </div>
              <div>
                <strong>Current Path:</strong>
              </div>
              <div className="font-mono text-xs bg-background p-2 rounded max-h-20 overflow-y-auto">
                {playtestState.history.map((nodeId, index) => {
                  const node = nodes.find((n) => n.id === nodeId);
                  return (
                    <div
                      key={nodeId}
                      className={
                        index === playtestState.history.length - 1
                          ? 'text-primary font-bold'
                          : ''
                      }
                    >
                      {index + 1}. {node?.speaker || 'Unknown'}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">🏁</div>
          <div className="text-lg font-semibold text-foreground mb-2">
            Conversation Complete
          </div>
          <div className="text-sm text-secondary mb-6">
            The dialogue has reached its end
          </div>

          <button
            onClick={restartPlaytest}
            className="px-6 py-3 bg-primary text-foreground rounded-lg hover:bg-primary/80 transition-colors font-medium"
          >
            🔄 Start Over
          </button>
        </div>
      )}
    </div>
  );
}
