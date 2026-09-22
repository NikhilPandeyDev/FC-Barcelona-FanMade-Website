import { StadiumInfo } from './types';

export const stadiumInfo: StadiumInfo = {
  name: 'Spotify Camp Nou (Espai Barça)',
  historicName: 'Camp Nou',
  inaugurationYear: 1957,
  originalCapacity: 99354,
  newCapacity: 105000,
  status: 'Under Comprehensive Modernization & Transformation',
  expectedFullOpening: '2026',
  features: [
    {
      title: 'Solar-Powered 360° Ring Roof',
      description: '30,000 square meters of solar panels providing clean energy for the stadium and surrounding campus.',
      icon: 'Sun',
    },
    {
      title: 'Europe’s Largest Stadium Capacity',
      description: 'Expanding to 105,000 covered seats with optimal sightlines and digital VIP terraces.',
      icon: 'Users',
    },
    {
      title: '360° Ultra-HD Screen',
      description: 'A floating visual LED ring hanging above the pitch delivering broadcast statistics and instant replays.',
      icon: 'Tv',
    },
    {
      title: 'Open Urban Campus (Espai Barça)',
      description: 'Integration of the Palau Blaugrana, commercial plazas, and green pedestrian walkways into Les Corts.',
      icon: 'Trees',
    },
  ],
  architecturalHighlights: [
    {
      label: 'New Capacity',
      value: '105,000',
      sublabel: 'All seats covered',
    },
    {
      label: 'Solar Surface',
      value: '30,000 m²',
      sublabel: 'Renewable energy roof',
    },
    {
      label: 'Campus Area',
      value: '18 Hectares',
      sublabel: 'Green public spaces',
    },
    {
      label: 'Opening Milestone',
      value: '60,000 -> 105,000',
      sublabel: 'Phased re-entry',
    },
  ],
};
