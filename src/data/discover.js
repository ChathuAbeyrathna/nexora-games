const artPalettes = {
  bts1: ['#0d0906', '#8a3324', '#c98a3e'],
  bts2: ['#050b1a', '#3d6ef0', '#8fdcff'],
  bts3: ['#1a0a2e', '#ff3d5a', '#00e6d8'],
  bts4: ['#06120b', '#1f7a52', '#c9e26b'],
  bts5: ['#0c0a12', '#5c2a7a', '#e0b0ff'],
  bts6: ['#020712', '#1c4fae', '#f2c94c'],
};

export const featuredStories = [
  {
    id: 1,
    category: 'Behind the Scenes',
    title: 'How Neon Veil\'s Districts React to Every Choice You Make',
    excerpt:
      'A look inside the reactivity engine that lets Kaldris City reshape itself around your courier contracts — and the six-month rebuild that made it possible.',
    author: 'Sana Okafor',
    readTime: '7 min read',
    date: 'September 2, 2026',
    palette: artPalettes.bts1,
    gameId: 'neon-veil',
  },
  {
    id: 2,
    category: 'Developer Diaries',
    title: 'Designing a Language No One Has Ever Spoken',
    excerpt:
      'The team behind Echoes of Aether on building an entire in-world grammar system from scratch — and testing whether players could actually learn it.',
    author: 'Marcus Adeyemi',
    readTime: '9 min read',
    date: 'August 19, 2026',
    palette: artPalettes.bts2,
    gameId: 'echoes-of-aether',
  },
  {
    id: 3,
    category: 'World Building',
    title: 'Kirrow Wilderness Was Never Meant to Look the Same Twice',
    excerpt:
      'Why Ashen Realm\'s procedural forest system exists, and the early prototype where testers got permanently, uncomfortably lost.',
    author: 'Dimitri Volkov',
    readTime: '6 min read',
    date: 'July 28, 2026',
    palette: artPalettes.bts3,
    gameId: 'ashen-realm',
  },
  {
    id: 4,
    category: 'Character Design',
    title: 'Building a Cast for a Kingdom That Doesn\'t Trust You Yet',
    excerpt:
      'Companion design lessons from Emberfall Chronicles, and why three companions were cut entirely a year before launch.',
    author: 'Josef Nov\u00e1\u010dek',
    readTime: '8 min read',
    date: 'July 4, 2026',
    palette: artPalettes.bts4,
    gameId: 'emberfall-chronicles',
  },
  {
    id: 5,
    category: 'Game Development',
    title: 'Inside the Fleet Logistics Spreadsheet That Became a Game',
    excerpt:
      'Starfall Protocol started as a literal spreadsheet prototype. Here\'s how fuel and morale became the emotional core of the game.',
    author: 'Haruto Kimura',
    readTime: '10 min read',
    date: 'June 22, 2026',
    palette: artPalettes.bts5,
    gameId: 'starfall-protocol',
  },
  {
    id: 6,
    category: 'Behind the Scenes',
    title: 'The Storm Routing System That Redesigns Every Track Live',
    excerpt:
      'How Crimson Horizon simulates dynamic sandstorms that physically reroute race tracks mid-run, and the physics rabbit hole that followed.',
    author: 'Amara Diallo',
    readTime: '6 min read',
    date: 'May 30, 2026',
    palette: artPalettes.bts6,
    gameId: 'crimson-horizon',
  },
];

export const developerSpotlight = [
  {
    id: 1,
    name: 'Sana Okafor',
    role: 'Technical Director',
    highlight: 'Architect of the district-reactivity engine powering Neon Veil\'s living city.',
    quote: 'The city had to feel like it was keeping score, even when the player wasn\'t looking.',
  },
  {
    id: 2,
    name: 'Marcus Adeyemi',
    role: 'Creative Director',
    highlight: 'Built the in-world grammar system at the heart of Echoes of Aether.',
    quote: 'A puzzle only matters if the language it\'s written in respects the player\'s intelligence.',
  },
  {
    id: 3,
    name: 'Haruto Kimura',
    role: 'Lead Systems Designer',
    highlight: 'Turned a fuel-and-morale spreadsheet into the emotional spine of Starfall Protocol.',
    quote: 'The best strategy systems make a spreadsheet feel like a moral decision.',
  },
];

export const communityPicksIds = [
  'neon-veil',
  'echoes-of-aether',
  'wraithbound',
  'starfall-protocol',
];

export const events = [
  {
    id: 1,
    type: 'Showcase',
    title: 'Nexora Direct: Winter Showcase',
    date: 'December 5, 2026',
    time: '6:00 PM UTC',
    detail: 'First extended gameplay from Project: Revenant plus a full progress update on Verdant Eclipse.',
  },
  {
    id: 2,
    type: 'Launch Event',
    title: 'Neon Veil: District Zero Launch',
    date: 'November 14, 2026',
    time: '5:00 PM UTC',
    detail: 'Live launch stream for the newest district expansion, with the narrative team taking questions after.',
  },
  {
    id: 3,
    type: 'Developer Stream',
    title: 'Systems Design Office Hours',
    date: 'October 29, 2026',
    time: '4:00 PM UTC',
    detail: 'Haruto Kimura walks through Starfall Protocol\'s fleet economy balancing process, live and unscripted.',
  },
  {
    id: 4,
    type: 'Community Event',
    title: 'Ironclad Dominion: Community Map Cup',
    date: 'October 11, 2026',
    time: '3:00 PM UTC',
    detail: 'The seasonal community-made map tournament returns, cast live by the Nexora live-ops team.',
  },
];
