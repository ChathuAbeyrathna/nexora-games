export const studioStats = [
  { id: 'released', label: 'Games Released', value: 12, suffix: '' },
  { id: 'developers', label: 'Developers', value: 86, suffix: '+' },
  { id: 'awards', label: 'Industry Awards', value: 23, suffix: '' },
  { id: 'years', label: 'Years Creating', value: 9, suffix: '' },
];

export const philosophyPillars = [
  {
    id: 1,
    title: 'World First, Mechanics Second',
    body: 'We never prototype a system before we know what place it lives in. Every mechanic at Nexora is built to serve a specific world, not the other way around.',
  },
  {
    id: 2,
    title: 'Friction Is a Design Tool',
    body: 'We resist the instinct to smooth every edge. Discomfort, scarcity, and consequence are ingredients — remove them and you remove the reason to care.',
  },
  {
    id: 3,
    title: 'Small Teams, Long Leashes',
    body: 'Our internal teams stay small by design. Fewer hands on a project means a clearer voice — and a shorter distance between an idea and the build.',
  },
  {
    id: 4,
    title: 'Ship the Uncomfortable Version',
    body: "If a build feels safe, we haven't finished it. We ship the version of the game that made someone in the room nervous — that's usually the honest one.",
  },
];

export const developmentApproach = [
  {
    id: 1,
    stage: 'Provocation',
    detail:
      'Every project starts as a single unresolved question, never a genre or a feature list. Neon Veil began as "what does debt feel like as a mechanic?"',
  },
  {
    id: 2,
    stage: 'Vertical Slice',
    detail:
      'A small, complete fragment of the world is built before anything else — enough to walk through and know whether the question is worth chasing for years.',
  },
  {
    id: 3,
    stage: 'Systems Before Content',
    detail:
      'We build the rules a world obeys before we populate it. Content built on unstable systems is the single biggest cause of wasted development time.',
  },
  {
    id: 4,
    stage: 'Player-Zero Testing',
    detail:
      'Internal playtesters outside the immediate team run the build weekly from month six onward, with zero context and zero hand-holding.',
  },
  {
    id: 5,
    stage: 'The Long Polish',
    detail:
      'We budget as much time for the final quarter of development as the first three combined. Most of what players call "quality" is just unglamorous polish time.',
  },
];

export const timeline = [
  { id: 1, year: '2017', title: 'Nexora Games founded', detail: 'Six developers and a shared apartment in Lisbon. No funding beyond savings and severance.' },
  { id: 2, year: '2018', title: 'Hollow Meridian prototype', detail: 'Our first vertical slice — a four-minute lighthouse loop that became the seed of our first shipped title.' },
  { id: 3, year: '2019', title: 'First outside investment', detail: 'A modest seed round let us grow to eighteen people without losing creative control of the roadmap.' },
  { id: 4, year: '2020', title: 'Ironclad Dominion ships', detail: 'Our first commercial strategy title, built by a team of eleven, ships day one on PC.' },
  { id: 5, year: '2022', title: 'Studio doubles in size', detail: 'Two internal teams running in parallel for the first time — the structure we still use today.' },
  { id: 6, year: '2024', title: 'Emberfall Chronicles', detail: 'Our largest project to date, a 60-hour RPG built by four internal teams working in tight coordination.' },
  { id: 7, year: '2025', title: 'Marketplace launch', detail: 'Nexora Marketplace opens to the public, giving players a single home for every world we build.' },
  { id: 8, year: '2026', title: 'Three titles in flight', detail: 'Project: Revenant and Verdant Eclipse move into production alongside our largest live title, Neon Veil.' },
];

export const teamMembers = [
  { id: 1, name: 'Elena Vasko', role: 'Studio Director & Co-Founder', bio: 'Set the studio\'s founding principle — world first, mechanics second — and still reviews every vertical slice personally.' },
  { id: 2, name: 'Marcus Adeyemi', role: 'Creative Director', bio: 'Lead writer on Echoes of Aether and Hollow Meridian. Believes the best puzzles are actually questions in disguise.' },
  { id: 3, name: 'Sana Okafor', role: 'Technical Director', bio: 'Built the district-reactivity engine that powers Neon Veil\'s living city simulation from the ground up.' },
  { id: 4, name: 'Dimitri Volkov', role: 'Art Director', bio: 'Oversees the visual language across every Nexora world, from Ashen Realm\'s smoke systems to Verdant Eclipse\'s regenerating canopies.' },
  { id: 5, name: 'Haruto Kimura', role: 'Lead Systems Designer', bio: 'Designed the fleet logistics economy at the heart of Starfall Protocol. Obsessed with making numbers feel like decisions.' },
  { id: 6, name: 'Priya Chandran', role: 'Audio Director', bio: 'Composed the adaptive score for Echoes of Aether and leads binaural sound design across the studio.' },
  { id: 7, name: 'Josef Nováček', role: 'Lead Combat Designer', bio: 'Shaped the parry-driven combat of Wraithbound and the neural ability chains inside Neon Veil.' },
  { id: 8, name: 'Amara Diallo', role: 'Live Operations Lead', bio: 'Runs the seasonal content cadence for Ironclad Dominion and the Nexora Marketplace storefront.' },
];

export const currentProjects = [
  {
    id: 'project-revenant',
    title: 'Project: Revenant',
    status: 'In Production',
    detail: 'A tactical squad shooter with fully simulated ballistics, targeting a February 2027 release.',
  },
  {
    id: 'verdant-eclipse',
    title: 'Verdant Eclipse',
    status: 'In Production',
    detail: 'A continent-scale open world that regenerates after every eclipse, our most ambitious traversal system yet.',
  },
  {
    id: 'neon-veil',
    title: 'Neon Veil: Live Expansion',
    status: 'Live Support',
    detail: 'Ongoing seasonal district content and narrative expansions for our flagship action RPG.',
  },
];
