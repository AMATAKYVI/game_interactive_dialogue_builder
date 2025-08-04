import { DialogueNode } from '../types/dialogue';

export const merchantDialogue: DialogueNode[] = [
  {
    id: 'merchant_001',
    speaker: 'Shady Merchant',
    text: 'Psst! Hey you! Yeah, you with the coin purse. I have something special that might interest you...',
    position: { x: 100, y: 100 },
    isStartNode: true,
    choices: [
      {
        id: 'choice_001',
        text: 'What are you selling?',
        nextNodeId: 'merchant_002',
      },
      {
        id: 'choice_002',
        text: "I'm not interested.",
        nextNodeId: 'merchant_003',
      },
      {
        id: 'choice_003',
        text: 'Are you trustworthy?',
        nextNodeId: 'merchant_004',
      },
    ],
  },
  {
    id: 'merchant_002',
    speaker: 'Shady Merchant',
    text: 'Ah, a customer with taste! I have this magical amulet - said to bring good fortune to its wearer. Only 50 gold pieces!',
    position: { x: 400, y: 50 },
    choices: [
      {
        id: 'choice_004',
        text: "That's too expensive.",
        nextNodeId: 'merchant_005',
      },
      {
        id: 'choice_005',
        text: "I'll take it!",
        nextNodeId: 'merchant_006',
      },
      {
        id: 'choice_006',
        text: 'Can you prove it works?',
        nextNodeId: 'merchant_007',
      },
    ],
  },
  {
    id: 'merchant_003',
    speaker: 'Shady Merchant',
    text: "Wait, wait! Don't walk away so fast. How about just a look? No obligation to buy...",
    position: { x: 400, y: 200 },
    choices: [
      {
        id: 'choice_007',
        text: 'Fine, show me.',
        nextNodeId: 'merchant_002',
      },
      {
        id: 'choice_008',
        text: "No, I'm leaving.",
        nextNodeId: null,
      },
    ],
  },
  {
    id: 'merchant_004',
    speaker: 'Shady Merchant',
    text: "Trustworthy? Me? *nervous laugh* Of course! I've been in business for... uh... many years! Ask anyone!",
    position: { x: 400, y: 350 },
    choices: [
      {
        id: 'choice_009',
        text: "That doesn't sound convincing.",
        nextNodeId: 'merchant_008',
      },
      {
        id: 'choice_010',
        text: 'Alright, show me your wares.',
        nextNodeId: 'merchant_002',
      },
    ],
  },
  {
    id: 'merchant_005',
    speaker: 'Shady Merchant',
    text: 'Too expensive? For a MAGICAL amulet? Fine, fine... 30 gold. Final offer!',
    position: { x: 700, y: 100 },
    choices: [
      {
        id: 'choice_011',
        text: 'Deal!',
        nextNodeId: 'merchant_006',
      },
      {
        id: 'choice_012',
        text: 'Still too much.',
        nextNodeId: 'merchant_009',
      },
    ],
  },
  {
    id: 'merchant_006',
    speaker: 'Shady Merchant',
    text: 'Excellent choice! *quickly pockets the gold* May it bring you great fortune! *starts packing up suspiciously fast*',
    position: { x: 700, y: 250 },
    choices: [],
  },
  {
    id: 'merchant_007',
    speaker: 'Shady Merchant',
    text: "Prove it? Well... *whispers* Look, between you and me, it's more about the confidence it gives you, you know?",
    position: { x: 700, y: 400 },
    choices: [
      {
        id: 'choice_013',
        text: "So it's fake?",
        nextNodeId: 'merchant_010',
      },
      {
        id: 'choice_014',
        text: "I understand. I'll take it.",
        nextNodeId: 'merchant_006',
      },
    ],
  },
  {
    id: 'merchant_008',
    speaker: 'Shady Merchant',
    text: "Look, I may not look like much, but my goods are real! This amulet... it's special. Trust me.",
    position: { x: 400, y: 500 },
    choices: [
      {
        id: 'choice_015',
        text: "I'll give you a chance.",
        nextNodeId: 'merchant_002',
      },
      {
        id: 'choice_016',
        text: "I don't trust you.",
        nextNodeId: null,
      },
    ],
  },
  {
    id: 'merchant_009',
    speaker: 'Shady Merchant',
    text: "*sighs* You drive a hard bargain... 15 gold. But I'm losing money at this price!",
    position: { x: 1000, y: 150 },
    choices: [
      {
        id: 'choice_017',
        text: 'Fine, 15 gold.',
        nextNodeId: 'merchant_006',
      },
      {
        id: 'choice_018',
        text: 'How about 10?',
        nextNodeId: 'merchant_011',
      },
    ],
  },
  {
    id: 'merchant_010',
    speaker: 'Shady Merchant',
    text: "Fake? No no no! It's... metaphysically functional! The magic is in believing!",
    position: { x: 1000, y: 400 },
    choices: [
      {
        id: 'choice_019',
        text: "That's definitely fake.",
        nextNodeId: null,
      },
      {
        id: 'choice_020',
        text: 'Well, if it helps confidence...',
        nextNodeId: 'merchant_005',
      },
    ],
  },
  {
    id: 'merchant_011',
    speaker: 'Shady Merchant',
    text: "10 gold?! That's robbery! *pause* ...Fine. You win. 10 gold, but don't tell anyone!",
    position: { x: 1300, y: 200 },
    choices: [
      {
        id: 'choice_021',
        text: 'Deal!',
        nextNodeId: 'merchant_006',
      },
    ],
  },
];
