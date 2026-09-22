import { Trophy } from './types';

export const trophies: Trophy[] = [
  {
    id: 'ucl',
    name: 'UEFA Champions League / European Cup',
    category: 'EUROPEAN',
    totalTitles: 5,
    yearsWon: [1992, 2006, 2009, 2011, 2015],
    featuredYear: 2011,
    description: 'European supremacy achieved through masterclasses at Wembley, Rome, and Berlin.',
    iconName: 'Trophy',
    badgeAccent: '#EDBB00',
  },
  {
    id: 'laliga',
    name: 'La Liga Championships',
    category: 'DOMESTIC_LEAGUE',
    totalTitles: 27,
    yearsWon: [
      1929, 1945, 1948, 1949, 1952, 1953, 1959, 1960, 1974, 1985,
      1991, 1992, 1993, 1994, 1998, 1999, 2005, 2006, 2009, 2010,
      2011, 2013, 2015, 2016, 2018, 2019, 2023
    ],
    featuredYear: 2023,
    description: 'The standard of consistency in Spanish domestic football, dominating modern eras.',
    iconName: 'Shield',
    badgeAccent: '#004D98',
  },
  {
    id: 'copa',
    name: 'Copa del Rey',
    category: 'DOMESTIC_CUP',
    totalTitles: 31,
    yearsWon: [
      1910, 1912, 1913, 1920, 1922, 1925, 1926, 1928, 1942, 1951,
      1952, 1953, 1957, 1959, 1963, 1968, 1971, 1978, 1981, 1983,
      1988, 1990, 1997, 1998, 2009, 2012, 2015, 2016, 2017, 2018,
      2021
    ],
    featuredYear: 2021,
    description: 'The King of Cups with a record 31 triumphs in Spain’s oldest national tournament.',
    iconName: 'Award',
    badgeAccent: '#A50044',
  },
  {
    id: 'cwc',
    name: 'FIFA Club World Cup',
    category: 'WORLD',
    totalTitles: 3,
    yearsWon: [2009, 2011, 2015],
    featuredYear: 2009,
    description: 'Crowning the legendary Sextuple and global dominance in Abu Dhabi and Yokohama.',
    iconName: 'Globe',
    badgeAccent: '#EDBB00',
  },
  {
    id: 'supercup-uefa',
    name: 'UEFA Super Cup',
    category: 'EUROPEAN',
    totalTitles: 5,
    yearsWon: [1992, 1997, 2009, 2011, 2015],
    featuredYear: 2015,
    description: 'Record-tying five-time champions of the European curtain-raiser clash.',
    iconName: 'Sparkles',
    badgeAccent: '#004D98',
  },
  {
    id: 'supercopa-spain',
    name: 'Supercopa de España',
    category: 'DOMESTIC_CUP',
    totalTitles: 14,
    yearsWon: [
      1983, 1991, 1992, 1994, 1996, 2005, 2006, 2009, 2010, 2011,
      2013, 2016, 2018, 2023
    ],
    featuredYear: 2023,
    description: 'The most decorated club in Spanish Super Cup history with 14 titles.',
    iconName: 'Flame',
    badgeAccent: '#EDBB00',
  },
];
