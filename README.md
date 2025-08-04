# Interactive Dialogue Builder

A visual dialogue tree editor for creating branching conversations in games and interactive stories. Built with Next.js, React, and TypeScript for CS325.

![Dialogue Builder Screenshot](https://via.placeholder.com/800x400/543A14/FFF0DC?text=Dialogue+Builder+Interface)

## 🎯 Features

- **Visual Node Editor**: Create and edit dialogue nodes with an intuitive visual interface
- **Branching Conversations**: Design complex dialogue trees with multiple choice paths
- **Real-time Playtest**: Test your dialogue flows immediately with the built-in playtest mode
- **Node Management**: Organized panel for managing all dialogue nodes
- **Export System**: Export your dialogue trees as JSON for use in games
- **Sample Content**: Pre-built dialogue examples to get you started
- **Responsive Design**: Works seamlessly on desktop and tablet devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AMATAKYVI/game_interactive_dialogue_builder.git
cd game_interactive_dialogue_builder
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 How to Use

### Creating Your First Dialogue Tree

1. **Start a New Project**: Click "New Project" to create a blank dialogue tree
2. **Add Nodes**: Click anywhere on the canvas to add a new dialogue node
3. **Edit Content**: Select a node to edit the speaker name and dialogue text in the right panel
4. **Add Choices**: In the node editor, click "Add Choice" to create player response options
5. **Connect Nodes**: Use the dropdown in each choice to link to other nodes
6. **Set Start Node**: Mark one node as the conversation starting point
7. **Test Your Work**: Click "Playtest" to experience your dialogue tree

### Sample Dialogues

The project includes three sample dialogue trees:

- **Mysterious Forest Encounter**: A fantasy adventure scenario
- **The Merchant's Deal**: A negotiation and trading conversation
- **The Guardian's Test**: An RPG-style trial with moral choices

Load these samples to see different dialogue patterns and techniques.

## 🎨 Design System

The interface uses a warm, earthy color palette:

- **Background**: Dark charcoal (#131010)
- **Primary**: Warm gold (#F0BB78)
- **Secondary**: Rich brown (#543A14)
- **Surface**: Cream (#FFF0DC)
- **Typography**: Libertinus Sans font family

## 🔧 Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with custom variables
- **State Management**: React hooks (useState, useCallback)
- **Build Tool**: Turbopack for fast development

## 📁 Project Structure

```
├── app/
│   ├── components/          # React components
│   │   ├── DialogueEditor.tsx      # Main editor orchestrator
│   │   ├── NodeCanvas.tsx          # Canvas for active node display
│   │   ├── NodeList.tsx            # Sidebar node management
│   │   ├── NodeEditor.tsx          # Node editing panel
│   │   ├── PlaytestPanel.tsx       # Interactive testing
│   │   └── Toolbar.tsx             # Control buttons
│   ├── data/               # Sample dialogue content
│   ├── types/              # TypeScript type definitions
│   └── globals.css         # Global styles
├── public/                 # Static assets
└── README.md
```

## 🎮 Export Format

Dialogues export as clean JSON suitable for game engines:

```json
{
  "projectInfo": {
    "name": "My Dialogue Tree",
    "startNodeId": "node_001",
    "exportedAt": "2025-01-01T00:00:00.000Z"
  },
  "dialogue": [
    {
      "id": "node_001",
      "speaker": "Character Name",
      "text": "Hello, player!",
      "choices": [
        {
          "text": "Hello there!",
          "nextId": "node_002"
        }
      ]
    }
  ]
}
```

## 🚧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 Academic Context

Created for CS325 - Interactive Systems Design course. This project demonstrates:

- User interface design principles
- Interactive system architecture
- React/TypeScript development
- Visual design implementation
- User experience considerations

## 🤝 Acknowledgments

- Course materials and guidance from CS325
- React and Next.js documentation
- TailwindCSS for the utility-first approach
- Libertinus font family for typography

---

**Built with ❤️ for creating engaging interactive stories**
