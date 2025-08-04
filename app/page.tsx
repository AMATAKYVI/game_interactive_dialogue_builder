'use client';

import { DialogueEditor } from './components/DialogueEditor';

export default function Home() {
  return (
    <div className="h-screen bg-background">
      <header className="border-b-2 border-secondary/20 bg-background/95 backdrop-blur-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">
            🗣️ Branching Dialogue Editor
          </h1>
          <p className="text-sm text-secondary mt-1">
            Create interactive story dialogues for games and applications
          </p>
        </div>
      </header>
      <DialogueEditor />
    </div>
  );
}
