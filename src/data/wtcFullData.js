// ICC World Test Championship (WTC) Complete Dataset (2019 - 2027)

export const WTC_META = {
  sport: 'Cricket',
  competition: 'ICC World Test Championship',
  competition_id: 'icc-wtc',
  format: 'Test',
  participating_teams: 9,
};

export const WTC_CHAMPION_COUNTS = [
  { team: 'New Zealand', titles: 1, cycle: '2019-2021', code: 'NZ' },
  { team: 'Australia', titles: 1, cycle: '2021-2023', code: 'AUS' },
  { team: 'South Africa', titles: 1, cycle: '2023-2025', code: 'SA' },
];

export const WTC_CYCLES = [
  {
    id: 'wtc-2025-27',
    name: 'WTC 2025-27 Cycle',
    cycle: '2025-2027',
    status: 'Ongoing',
    final: {
      date: 'June 9 - 13, 2027',
      venue: 'The Oval',
      city: 'London',
      country: 'England',
      status: 'Upcoming Final',
    },
    teams: ['Australia', 'Bangladesh', 'England', 'India', 'New Zealand', 'Pakistan', 'South Africa', 'Sri Lanka', 'West Indies'],
  },
  {
    id: 'wtc-2023-25',
    name: 'WTC 2023-25 Cycle',
    cycle: '2023-2025',
    status: 'Completed',
    champion: 'South Africa',
    runner_up: 'Australia',
    final: {
      date: 'June 11 - 14, 2025',
      venue: "Lord's Cricket Ground",
      city: 'London',
      country: 'England',
      winner: 'South Africa',
      runner_up: 'Australia',
      result: 'South Africa won by 5 wickets',
      player_of_match: 'Aiden Markram',
    },
    teams: ['Australia', 'Bangladesh', 'England', 'India', 'New Zealand', 'Pakistan', 'South Africa', 'Sri Lanka', 'West Indies'],
  },
  {
    id: 'wtc-2021-23',
    name: 'WTC 2021-23 Cycle',
    cycle: '2021-2023',
    status: 'Completed',
    champion: 'Australia',
    runner_up: 'India',
    final: {
      date: 'June 7 - 11, 2023',
      venue: 'The Oval',
      city: 'London',
      country: 'England',
      winner: 'Australia',
      runner_up: 'India',
      result: 'Australia won by 209 runs',
      player_of_match: 'Travis Head',
      scorecard: {
        Australia_1st: '469',
        India_1st: '296',
        Australia_2nd: '270/8 d',
        India_2nd: '234',
      },
    },
    teams: ['Australia', 'Bangladesh', 'England', 'India', 'New Zealand', 'Pakistan', 'South Africa', 'Sri Lanka', 'West Indies'],
  },
  {
    id: 'wtc-2019-21',
    name: 'WTC 2019-21 Cycle',
    cycle: '2019-2021',
    status: 'Completed',
    champion: 'New Zealand',
    runner_up: 'India',
    final: {
      date: 'June 18 - 23, 2021',
      venue: 'The Rose Bowl',
      city: 'Southampton',
      country: 'England',
      winner: 'New Zealand',
      runner_up: 'India',
      result: 'New Zealand won by 8 wickets',
    },
    teams: ['Australia', 'Bangladesh', 'England', 'India', 'New Zealand', 'Pakistan', 'South Africa', 'Sri Lanka', 'West Indies'],
  },
];

export const WTC_VENUES = [
  { id: 'rose-bowl', name: 'The Rose Bowl', city: 'Southampton', country: 'England', used_for: 'WTC Final 2021' },
  { id: 'the-oval', name: 'The Oval', city: 'London', country: 'England', used_for: 'WTC Final 2023; WTC Final 2027' },
  { id: 'lords', name: "Lord's Cricket Ground", city: 'London', country: 'England', used_for: 'WTC Final 2025' },
];
