import { DialogueNode } from '../types/dialogue';

export const sampleDialogue: DialogueNode[] = [
  {
    id: 'start_001',
    speaker: 'Mysterious Traveler',
    text: 'Greetings, wanderer! You look lost in these ancient woods. I might be able to help you... for a price.',
    position: { x: 100, y: 100 },
    isStartNode: true,
    choices: [
      {
        id: 'choice_001',
        text: 'Who are you? What do you want?',
        nextNodeId: 'info_002',
      },
      {
        id: 'choice_002',
        text: "I'm not lost. Leave me alone.",
        nextNodeId: 'hostile_003',
      },
      {
        id: 'choice_003',
        text: "What kind of help? What's the price?",
        nextNodeId: 'offer_004',
      },
    ],
  },
  {
    id: 'info_002',
    speaker: 'Mysterious Traveler',
    text: "I am but a humble merchant of... unusual goods. These woods hold many secrets, and I know them all. My name? That's not important right now.",
    position: { x: 500, y: 50 },
    choices: [
      {
        id: 'choice_004',
        text: 'What kind of unusual goods?',
        nextNodeId: 'goods_005',
      },
      {
        id: 'choice_005',
        text: 'Tell me about these woods.',
        nextNodeId: 'woods_006',
      },
      {
        id: 'choice_006',
        text: 'I should go.',
        nextNodeId: 'farewell_007',
      },
    ],
  },
  {
    id: 'hostile_003',
    speaker: 'Mysterious Traveler',
    text: '*chuckles darkly* Oh, but you ARE lost, friend. More lost than you realize. The path behind you has already vanished. Look for yourself.',
    position: { x: 500, y: 200 },
    choices: [
      {
        id: 'choice_007',
        text: '*Turn around to check*',
        nextNodeId: 'revelation_008',
      },
      {
        id: 'choice_008',
        text: "You're trying to scare me.",
        nextNodeId: 'defiant_009',
      },
      {
        id: 'choice_009',
        text: 'Fine. What do you want?',
        nextNodeId: 'offer_004',
      },
    ],
  },
  {
    id: 'offer_004',
    speaker: 'Mysterious Traveler',
    text: 'I can guide you to the Heart of the Forest - a place of great power. The price? A memory. One precious memory of your choosing.',
    position: { x: 500, y: 350 },
    choices: [
      {
        id: 'choice_010',
        text: "A memory? That's... unsettling.",
        nextNodeId: 'memory_010',
      },
      {
        id: 'choice_011',
        text: 'Deal. Take my worst memory.',
        nextNodeId: 'deal_011',
      },
      {
        id: 'choice_012',
        text: "No deal. I'll find my own way.",
        nextNodeId: 'refuse_012',
      },
    ],
  },
  {
    id: 'goods_005',
    speaker: 'Mysterious Traveler',
    text: 'Maps to hidden places, keys to locked doors, whispers of forgotten names... and sometimes, I trade in memories themselves.',
    position: { x: 900, y: 50 },
    choices: [
      {
        id: 'choice_013',
        text: 'Memories? How is that possible?',
        nextNodeId: 'memory_010',
      },
      {
        id: 'choice_014',
        text: 'I need to leave this place.',
        nextNodeId: 'offer_004',
      },
    ],
  },
  {
    id: 'woods_006',
    speaker: 'Mysterious Traveler',
    text: 'These woods are older than kingdoms. They shift and change, trapping those who enter without permission. Only those who know the old ways can navigate them safely.',
    position: { x: 900, y: 150 },
    choices: [
      {
        id: 'choice_015',
        text: 'How do I get permission?',
        nextNodeId: 'offer_004',
      },
      {
        id: 'choice_016',
        text: 'This is just superstition.',
        nextNodeId: 'revelation_008',
      },
    ],
  },
  {
    id: 'farewell_007',
    speaker: 'Mysterious Traveler',
    text: "Very well. But remember - when you find yourself walking in circles, when the sun won't set... you know where to find me.",
    position: { x: 900, y: 250 },
    choices: [], // End of conversation
  },
  {
    id: 'revelation_008',
    speaker: 'Mysterious Traveler',
    text: '*You turn around. The path is gone. Only thick, impenetrable forest.* You see? The woods have claimed you. But I can still help... for the right price.',
    position: { x: 900, y: 350 },
    choices: [
      {
        id: 'choice_017',
        text: 'This is impossible!',
        nextNodeId: 'memory_010',
      },
      {
        id: 'choice_018',
        text: "Fine. What's your offer?",
        nextNodeId: 'offer_004',
      },
    ],
  },
  {
    id: 'defiant_009',
    speaker: 'Mysterious Traveler',
    text: 'Scare you? *laughs* Look around, brave one. The trees have eyes, the shadows whisper. This is no ordinary forest.',
    position: { x: 900, y: 450 },
    choices: [
      {
        id: 'choice_019',
        text: '*Look around nervously*',
        nextNodeId: 'revelation_008',
      },
      {
        id: 'choice_020',
        text: "I don't believe in fairy tales.",
        nextNodeId: 'memory_010',
      },
    ],
  },
  {
    id: 'memory_010',
    speaker: 'Mysterious Traveler',
    text: "Memories are the currency of the soul. I can extract one cleanly - you'll never miss it. It could be a painful memory, or perhaps... your happiest day?",
    position: { x: 1300, y: 200 },
    choices: [
      {
        id: 'choice_021',
        text: 'Take my first heartbreak.',
        nextNodeId: 'deal_011',
      },
      {
        id: 'choice_022',
        text: 'Take my childhood fears.',
        nextNodeId: 'deal_011',
      },
      {
        id: 'choice_023',
        text: 'This is wrong. I refuse.',
        nextNodeId: 'refuse_012',
      },
    ],
  },
  {
    id: 'deal_011',
    speaker: 'Mysterious Traveler',
    text: '*touches your forehead* It is done. Follow the golden thread that now appears before you. It will lead you to the Heart of the Forest. Farewell, wanderer.',
    position: { x: 1300, y: 350 },
    choices: [], // End of conversation - success
  },
  {
    id: 'refuse_012',
    speaker: 'Mysterious Traveler',
    text: "*shrugs* Very well. Enjoy your eternal wandering. Perhaps in a century or two, you'll reconsider my generous offer.",
    position: { x: 1300, y: 500 },
    choices: [
      {
        id: 'choice_024',
        text: 'Wait! Come back!',
        nextNodeId: 'memory_010',
      },
    ],
  },
];

export const sampleProject = {
  id: 'sample',
  name: 'Mysterious Forest Encounter',
  nodes: sampleDialogue,
  startNodeId: 'start_001',
  createdAt: new Date(),
  lastModified: new Date(),
};
