import type { SquadProfile } from '@/lib/schemas/squad';

type ProfileContent = Pick<SquadProfile, 'bio' | 'sourceUrl' | 'editorial'>;

// Original fan editorial, not measured scouting data. Biographies are factual
// summaries of the linked club sources; no live squad status is implied.
export const squadEditorial: Record<string, ProfileContent> = {
  'lamine-yamal': {
    bio: 'A product of the Barça youth system, Lamine Yamal made his first-team debut in April 2023. He wore number 19 for the 2024/25 campaign.',
    sourceUrl: 'https://www.fcbarcelona.com/en/football/first-team/news/4060166/lamine-yamal-fc-barcelonas-new-number-19',
    editorial: { role: 'Right winger / Creator', headline: 'Make room for imagination.', description: 'The right wing becomes a place to ask questions: stay wide to stretch the defence, then come inside to open a different passing angle.', strengths: ['One-on-one creation', 'Disguise on the ball', 'Final-third vision'], responsibilities: ['Offer width on the right', 'Connect with the interior', 'Create the final pass'], zone: 'right', zoneLabel: 'Right flank & inside channel' },
  },
  pedri: {
    bio: 'Born in Tegueste, Tenerife, Pedri began his career on the Canary Islands. Barça agreed his transfer from Las Palmas in 2019, and he joined the team in August 2020.',
    sourceUrl: 'https://www.fcbarcelona.com/en/football/first-team/players/70486/pedri',
    editorial: { role: 'Interior / Playmaker', headline: 'Find time where there is none.', description: 'An interior connects the first pass to the final action. The craft is in receiving between opponents and choosing when to accelerate the move.', strengths: ['Spatial awareness', 'Close control', 'Passing combinations'], responsibilities: ['Receive between the lines', 'Connect midfield triangles', 'Set the rhythm of possession'], zone: 'midfield', zoneLabel: 'Central midfield & half-spaces' },
  },
  'robert-lewandowski': {
    bio: 'The Polish striker arrived at Barcelona from Bayern Munich in the summer of 2022. Born in Warsaw, he brought experience from a career in Polish and German football.',
    sourceUrl: 'https://www.fcbarcelona.com/en/news/4526738/robert-lewandowski/amp',
    editorial: { role: 'Striker / Number nine', headline: 'The art of the final touch.', description: 'A centre-forward gives an attack its reference point. Pin the centre-backs, offer a wall pass, then find the small pocket of space that matters.', strengths: ['Box movement', 'Finishing technique', 'Hold-up play'], responsibilities: ['Occupy the centre-backs', 'Link play with back to goal', 'Attack the penalty area'], zone: 'centre', zoneLabel: 'Central attacking channel' },
  },
  raphinha: {
    bio: 'Raphael Dias Belloli, known as Raphinha, was born in Porto Alegre, Brazil. His early career included Avaí and a move to Portuguese football with Vitória Guimarães.',
    sourceUrl: 'https://www.fcbarcelona.com/en/players/24156',
    editorial: { role: 'Winger / Inside forward', headline: 'Always moving. Always asking.', description: 'The inside forward can threaten without touching the ball. Diagonal runs invite a pass behind the line; immediate pressure helps keep the attack alive.', strengths: ['Direct running', 'Pressing energy', 'Attacking delivery'], responsibilities: ['Run beyond the back line', 'Attack the far-side space', 'Press after possession is lost'], zone: 'left', zoneLabel: 'Left flank & inside channel' },
  },
  gavi: {
    bio: 'Gavi joined FC Barcelona’s youth system for the 2015/16 season. The Spanish midfielder progressed through La Masia before reaching the first team.',
    sourceUrl: 'https://www.fcbarcelona.com/en/futbol/primer-equip/jugadors/116719/gavi',
    editorial: { role: 'Interior / Pressing midfielder', headline: 'Every metre matters.', description: 'An active interior works on both sides of possession: supporting short combinations, closing the next passing lane and helping the team recover its shape.', strengths: ['Competitive intensity', 'Short combinations', 'Counter-pressing'], responsibilities: ['Support the ball carrier', 'Close nearby passing lanes', 'Contest second balls'], zone: 'midfield', zoneLabel: 'Central midfield & half-spaces' },
  },
  'pau-cubarsi': {
    bio: 'Pau Cubarsí progressed into Barça’s first team from its youth setup. He was assigned the number 2 shirt as an official first-team player for the 2024/25 season.',
    sourceUrl: 'https://www.fcbarcelona.com/en/football/first-team/news/4106426/202425fc/featured',
    editorial: { role: 'Centre-back / Build-up defender', headline: 'The first line of creation.', description: 'Build-up starts before the midfield receives the ball. A composed centre-back draws pressure, scans beyond it and gives the next player a useful first touch.', strengths: ['Passing through lines', 'Composure', 'Reading the game'], responsibilities: ['Provide a build-up outlet', 'Find midfield through pressure', 'Protect the central corridor'], zone: 'defence', zoneLabel: 'Central defensive line' },
  },
  'jules-kounde': {
    bio: 'Born in Paris, Jules Koundé played for Bordeaux and Sevilla before joining Barcelona in 2022. He has represented France at senior international level.',
    sourceUrl: 'https://www.fcbarcelona.com/en/football/first-team/jugadores/15552/jules-kounde',
    editorial: { role: 'Right-back / Defender', headline: 'Balance on the outside.', description: 'The full-back balances support and security. An overlap adds a passing option; a well-timed recovery protects the space that the attack leaves behind.', strengths: ['Defensive recovery', 'One-on-one defending', 'Wide support'], responsibilities: ['Support the right winger', 'Defend the outside channel', 'Balance attacking overlaps'], zone: 'right-defence', zoneLabel: 'Right side of the defensive line' },
  },
  'marc-andre-ter-stegen': {
    bio: 'The German goalkeeper joined Barcelona from Borussia Mönchengladbach in 2014. He was officially presented by the club on 22 May that year.',
    sourceUrl: 'https://www.fcbarcelona.com/en/football/first-team/news/4025255/10-years-since-ter-stegen-was-presented-at-fc-barcelona/featured',
    editorial: { role: 'Goalkeeper / Build-up outlet', headline: 'Everything starts here.', description: 'A goalkeeper is both the last line and the first pass. Supporting possession behind the centre-backs can create the spare player needed to escape a press.', strengths: ['Shot-stopping', 'Distribution', 'Composure under pressure'], responsibilities: ['Protect the goal', 'Offer a deep passing option', 'Help organise the defensive line'], zone: 'goal', zoneLabel: 'Goal area & deep build-up' },
  },
};
