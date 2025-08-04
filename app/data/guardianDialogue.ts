import { DialogueNode } from '../types/dialogue';

export const guardianDialogue: DialogueNode[] = [
  {
    id: 'guardian_001',
    speaker: 'Ancient Guardian',
    text: 'Halt, mortal. You seek passage through the Sacred Gate? None may pass without proving their worth.',
    position: { x: 100, y: 100 },
    isStartNode: true,
    choices: [
      {
        id: 'choice_001',
        text: 'I accept your challenge.',
        nextNodeId: 'guardian_002',
      },
      {
        id: 'choice_002',
        text: 'What kind of test?',
        nextNodeId: 'guardian_003',
      },
      {
        id: 'choice_003',
        text: "I don't need to prove anything.",
        nextNodeId: 'guardian_004',
      },
    ],
  },
  {
    id: 'guardian_002',
    speaker: 'Ancient Guardian',
    text: 'Brave words. Very well. I shall present you with three trials: Wisdom, Courage, and Compassion. Choose where to begin.',
    position: { x: 400, y: 50 },
    choices: [
      {
        id: 'choice_004',
        text: 'Test my wisdom.',
        nextNodeId: 'guardian_005',
      },
      {
        id: 'choice_005',
        text: 'Test my courage.',
        nextNodeId: 'guardian_006',
      },
      {
        id: 'choice_006',
        text: 'Test my compassion.',
        nextNodeId: 'guardian_007',
      },
    ],
  },
  {
    id: 'guardian_003',
    speaker: 'Ancient Guardian',
    text: 'The test varies for each soul. Some face riddles, others face their fears, and some must show kindness. Which calls to you?',
    position: { x: 400, y: 200 },
    choices: [
      {
        id: 'choice_007',
        text: "I'll face the riddles.",
        nextNodeId: 'guardian_005',
      },
      {
        id: 'choice_008',
        text: "I'll confront my fears.",
        nextNodeId: 'guardian_006',
      },
      {
        id: 'choice_009',
        text: 'I choose to show kindness.',
        nextNodeId: 'guardian_007',
      },
    ],
  },
  {
    id: 'guardian_004',
    speaker: 'Ancient Guardian',
    text: 'Pride comes before the fall, young one. The gate remains sealed to those who lack humility.',
    position: { x: 400, y: 350 },
    choices: [
      {
        id: 'choice_010',
        text: 'I apologize. Please test me.',
        nextNodeId: 'guardian_002',
      },
      {
        id: 'choice_011',
        text: 'Find another way around.',
        nextNodeId: null,
      },
    ],
  },
  {
    id: 'guardian_005',
    speaker: 'Ancient Guardian',
    text: 'Riddle me this: I speak without a mouth and hear without ears. I have no body, yet come alive with fears. What am I?',
    position: { x: 700, y: 100 },
    choices: [
      {
        id: 'choice_012',
        text: 'An echo.',
        nextNodeId: 'guardian_008',
      },
      {
        id: 'choice_013',
        text: 'A ghost.',
        nextNodeId: 'guardian_009',
      },
      {
        id: 'choice_014',
        text: 'The wind.',
        nextNodeId: 'guardian_009',
      },
    ],
  },
  {
    id: 'guardian_006',
    speaker: 'Ancient Guardian',
    text: 'Before you stands an illusion of your greatest fear. Do not let it see your terror, for it feeds on fear itself.',
    position: { x: 700, y: 250 },
    choices: [
      {
        id: 'choice_015',
        text: 'Stand firm and face it.',
        nextNodeId: 'guardian_008',
      },
      {
        id: 'choice_016',
        text: 'Try to run away.',
        nextNodeId: 'guardian_009',
      },
      {
        id: 'choice_017',
        text: 'Close your eyes and ignore it.',
        nextNodeId: 'guardian_009',
      },
    ],
  },
  {
    id: 'guardian_007',
    speaker: 'Ancient Guardian',
    text: 'A wounded bird lies at your feet, its wing broken. Healing it would delay your journey significantly. What do you do?',
    position: { x: 700, y: 400 },
    choices: [
      {
        id: 'choice_018',
        text: 'Heal the bird despite the delay.',
        nextNodeId: 'guardian_008',
      },
      {
        id: 'choice_019',
        text: 'Leave it and continue.',
        nextNodeId: 'guardian_009',
      },
      {
        id: 'choice_020',
        text: 'End its suffering quickly.',
        nextNodeId: 'guardian_010',
      },
    ],
  },
  {
    id: 'guardian_008',
    speaker: 'Ancient Guardian',
    text: 'Well done. You have shown true character. The Sacred Gate opens for you. May your journey be blessed.',
    position: { x: 1000, y: 200 },
    choices: [
      {
        id: 'choice_021',
        text: 'Thank you, Guardian.',
        nextNodeId: null,
      },
    ],
  },
  {
    id: 'guardian_009',
    speaker: 'Ancient Guardian',
    text: 'I sense your heart, but you have not yet learned what is needed. Return when you have grown wiser.',
    position: { x: 1000, y: 350 },
    choices: [
      {
        id: 'choice_022',
        text: 'Give me another chance.',
        nextNodeId: 'guardian_002',
      },
      {
        id: 'choice_023',
        text: 'I will return later.',
        nextNodeId: null,
      },
    ],
  },
  {
    id: 'guardian_010',
    speaker: 'Ancient Guardian',
    text: 'Mercy in the face of suffering... a difficult choice, but one that shows understanding. You may pass.',
    position: { x: 1000, y: 500 },
    choices: [
      {
        id: 'choice_024',
        text: 'Thank you for understanding.',
        nextNodeId: null,
      },
    ],
  },
];
