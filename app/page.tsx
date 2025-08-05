'use client';

import { DialogueEditor } from './components/DialogueEditor';

export default function Home() {
  return (
    <div className="h-screen bg-background">
      <div className="px-[100px] py-[50px] bg-primary/10 border-b border-primary/20 ">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-3">
              Interactive Dialogue Builder
            </h2>
            <p className="text-md text-white leading-relaxed">
              A visual tool for creating branching conversation trees for games
              and interactive stories. Design complex dialogue flows with
              multiple character responses, choice-driven narratives, and
              seamless export functionality for game development projects.
            </p>
          </div>
          <div className="text-right ml-8">
            <div className="text-2xl font-bold text-secondary">Amatak Yvi</div>
            <div className="text-md text-white">
              CS 325 - George Mason University
            </div>
            <div className="text-base text-white">Summer 2025</div>
          </div>
        </div>
      </div>
      <header className="border-b-2 border-secondary/20 bg-background/95 backdrop-blur-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            🗣️ Branching Dialogue Editor
          </h1>
          <p className="text-sm text-white mt-1">
            Create interactive story dialogues for games and applications
          </p>
        </div>
      </header>
      <DialogueEditor />

      <footer className="bg-background border-t border-secondary/20 py-4 px-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-white">
              © 2025{' '}
              <span className="font-semibold text-primary">Amatak Yvi</span>
            </span>
            <span className="text-white">•</span>
            <span className="text-white">Interactive Dialogue Builder</span>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <span>CS 325 Project</span>
            <span>•</span>
            <span>George Mason University</span>
            <span>•</span>
            <span>Summer 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
