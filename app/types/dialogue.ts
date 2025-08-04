export interface DialogueChoice {
  id: string;
  text: string;
  nextNodeId: string | null; // null means conversation ends
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  choices: DialogueChoice[];
  position: { x: number; y: number }; // for canvas positioning
  isStartNode?: boolean;
}

export interface DialogueProject {
  id: string;
  name: string;
  nodes: DialogueNode[];
  startNodeId: string | null;
  createdAt: Date;
  lastModified: Date;
}

export interface Connection {
  from: string; // node id
  to: string; // node id
  choiceId: string; // which choice creates this connection
}

// For the playtest mode
export interface PlaytestState {
  currentNodeId: string | null;
  history: string[]; // track visited nodes
  isActive: boolean;
}
