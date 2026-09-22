// World Cup Datasets for T20 World Cup & ODI World Cup (Standings & Playoff/Finals History)

export const WORLD_CUP_TOURNAMENTS = [
  { id: 't20_wc', name: 'T20 World Cup' },
  { id: 'odi_wc', name: 'ODI World Cup' },
  { id: 'wtc', name: 'Test (WTC)' },
];

export const T20_WORLD_CUP_YEARS = [
  '2024', '2022', '2021', '2016', '2014', '2012', '2010', '2009', '2007'
];

export const ODI_WORLD_CUP_YEARS = [
  '2023', '2019', '2015', '2011', '2007', '2003', '1999', '1996', '1992', '1987', '1983', '1979', '1975'
];

// T20 World Cup Points Table Data by Year
export const T20_WORLD_CUP_STANDINGS = {
  '2024': [
    { rank: 1, team: 'India', code: 'IND', p: 8, w: 8, l: 0, nr: 0, pts: 16, nrr: '+1.340' },
    { rank: 2, team: 'South Africa', code: 'SA', p: 9, w: 8, l: 1, nr: 0, pts: 16, nrr: '+0.478' },
    { rank: 3, team: 'England', code: 'ENG', p: 8, w: 5, l: 3, nr: 0, pts: 10, nrr: '+1.241' },
    { rank: 4, team: 'Afghanistan', code: 'AFG', p: 8, w: 5, l: 3, nr: 0, pts: 10, nrr: '-0.383' },
    { rank: 5, team: 'Australia', code: 'AUS', p: 7, w: 5, l: 2, nr: 0, pts: 10, nrr: '+1.002' },
    { rank: 6, team: 'West Indies', code: 'WI', p: 7, w: 5, l: 2, nr: 0, pts: 10, nrr: '+1.762' },
    { rank: 7, team: 'USA', code: 'USA', p: 7, w: 3, l: 3, nr: 1, pts: 7, nrr: '-0.880' },
    { rank: 8, team: 'Bangladesh', code: 'BAN', p: 7, w: 3, l: 4, nr: 0, pts: 6, nrr: '-0.622' },
  ],
  '2022': [
    { rank: 1, team: 'England', code: 'ENG', p: 7, w: 5, l: 1, nr: 1, pts: 11, nrr: '+1.241' },
    { rank: 2, team: 'Pakistan', code: 'PAK', p: 7, w: 4, l: 3, nr: 0, pts: 8, nrr: '+1.028' },
    { rank: 3, team: 'India', code: 'IND', p: 6, w: 4, l: 2, nr: 0, pts: 8, nrr: '+1.319' },
    { rank: 4, team: 'New Zealand', code: 'NZ', p: 6, w: 3, l: 2, nr: 1, pts: 7, nrr: '+2.113' },
    { rank: 5, team: 'Australia', code: 'AUS', p: 5, w: 3, l: 1, nr: 1, pts: 7, nrr: '-0.173' },
    { rank: 6, team: 'South Africa', code: 'SA', p: 5, w: 2, l: 2, nr: 1, pts: 5, nrr: '+0.874' },
  ],
  '2021': [
    { rank: 1, team: 'Australia', code: 'AUS', p: 7, w: 6, l: 1, nr: 0, pts: 12, nrr: '+1.216' },
    { rank: 2, team: 'New Zealand', code: 'NZ', p: 7, w: 5, l: 2, nr: 0, pts: 10, nrr: '+1.162' },
    { rank: 3, team: 'Pakistan', code: 'PAK', p: 6, w: 5, l: 1, nr: 0, pts: 10, nrr: '+1.583' },
    { rank: 4, team: 'England', code: 'ENG', p: 6, w: 4, l: 2, nr: 0, pts: 8, nrr: '+2.464' },
    { rank: 5, team: 'India', code: 'IND', p: 5, w: 3, l: 2, nr: 0, pts: 6, nrr: '+1.747' },
    { rank: 6, team: 'South Africa', code: 'SA', p: 5, w: 4, l: 1, nr: 0, pts: 8, nrr: '+0.739' },
  ],
  '2016': [
    { rank: 1, team: 'West Indies', code: 'WI', p: 6, w: 5, l: 1, nr: 0, pts: 10, nrr: '+0.359' },
    { rank: 2, team: 'England', code: 'ENG', p: 6, w: 4, l: 2, nr: 0, pts: 8, nrr: '+0.113' },
    { rank: 3, team: 'India', code: 'IND', p: 5, w: 3, l: 2, nr: 0, pts: 6, nrr: '-0.305' },
    { rank: 4, team: 'New Zealand', code: 'NZ', p: 5, w: 4, l: 1, nr: 0, pts: 8, nrr: '+0.800' },
  ],
  '2014': [
    { rank: 1, team: 'Sri Lanka', code: 'SL', p: 6, w: 5, l: 1, nr: 0, pts: 10, nrr: '+2.233' },
    { rank: 2, team: 'India', code: 'IND', p: 6, w: 5, l: 1, nr: 0, pts: 10, nrr: '+1.280' },
    { rank: 3, team: 'West Indies', code: 'WI', p: 5, w: 3, l: 2, nr: 0, pts: 6, nrr: '+1.971' },
    { rank: 4, team: 'South Africa', code: 'SA', p: 5, w: 3, l: 2, nr: 0, pts: 6, nrr: '-0.010' },
  ],
  '2012': [
    { rank: 1, team: 'West Indies', code: 'WI', p: 7, w: 4, l: 2, nr: 1, pts: 9, nrr: '+0.870' },
    { rank: 2, team: 'Sri Lanka', code: 'SL', p: 7, w: 6, l: 1, nr: 0, pts: 12, nrr: '+1.450' },
    { rank: 3, team: 'Australia', code: 'AUS', p: 6, w: 4, l: 2, nr: 0, pts: 8, nrr: '+1.320' },
    { rank: 4, team: 'Pakistan', code: 'PAK', p: 6, w: 4, l: 2, nr: 0, pts: 8, nrr: '+0.230' },
  ],
  '2010': [
    { rank: 1, team: 'England', code: 'ENG', p: 7, w: 6, l: 1, nr: 0, pts: 12, nrr: '+1.480' },
    { rank: 2, team: 'Australia', code: 'AUS', p: 7, w: 6, l: 1, nr: 0, pts: 12, nrr: '+1.210' },
    { rank: 3, team: 'Sri Lanka', code: 'SL', p: 6, w: 3, l: 3, nr: 0, pts: 6, nrr: '-0.110' },
    { rank: 4, team: 'Pakistan', code: 'PAK', p: 6, w: 2, l: 4, nr: 0, pts: 4, nrr: '-0.240' },
  ],
  '2009': [
    { rank: 1, team: 'Pakistan', code: 'PAK', p: 7, w: 5, l: 2, nr: 0, pts: 10, nrr: '+0.780' },
    { rank: 2, team: 'Sri Lanka', code: 'SL', p: 7, w: 6, l: 1, nr: 0, pts: 12, nrr: '+1.260' },
    { rank: 3, team: 'South Africa', code: 'SA', p: 6, w: 5, l: 1, nr: 0, pts: 10, nrr: '+1.450' },
    { rank: 4, team: 'West Indies', code: 'WI', p: 6, w: 3, l: 3, nr: 0, pts: 6, nrr: '-0.180' },
  ],
  '2007': [
    { rank: 1, team: 'India', code: 'IND', p: 7, w: 5, l: 1, nr: 1, pts: 11, nrr: '+0.890' },
    { rank: 2, team: 'Pakistan', code: 'PAK', p: 7, w: 5, l: 2, nr: 0, pts: 10, nrr: '+0.840' },
    { rank: 3, team: 'Australia', code: 'AUS', p: 6, w: 4, l: 2, nr: 0, pts: 8, nrr: '+1.560' },
    { rank: 4, team: 'New Zealand', code: 'NZ', p: 6, w: 3, l: 3, nr: 0, pts: 6, nrr: '+0.230' },
  ],
};

// ODI World Cup Points Table Data by Year
export const ODI_WORLD_CUP_STANDINGS = {
  '2023': [
    { rank: 1, team: 'India', code: 'IND', p: 11, w: 10, l: 1, nr: 0, pts: 20, nrr: '+2.570' },
    { rank: 2, team: 'Australia', code: 'AUS', p: 11, w: 9, l: 2, nr: 0, pts: 18, nrr: '+0.841' },
    { rank: 3, team: 'South Africa', code: 'SA', p: 10, w: 7, l: 3, nr: 0, pts: 14, nrr: '+1.261' },
    { rank: 4, team: 'New Zealand', code: 'NZ', p: 10, w: 5, l: 5, nr: 0, pts: 10, nrr: '+0.743' },
    { rank: 5, team: 'Pakistan', code: 'PAK', p: 9, w: 4, l: 5, nr: 0, pts: 8, nrr: '-0.198' },
    { rank: 6, team: 'Afghanistan', code: 'AFG', p: 9, w: 4, l: 5, nr: 0, pts: 8, nrr: '-0.336' },
    { rank: 7, team: 'England', code: 'ENG', p: 9, w: 3, l: 6, nr: 0, pts: 6, nrr: '-0.572' },
    { rank: 8, team: 'Bangladesh', code: 'BAN', p: 9, w: 2, l: 7, nr: 0, pts: 4, nrr: '-1.087' },
  ],
  '2019': [
    { rank: 1, team: 'England', code: 'ENG', p: 11, w: 8, l: 3, nr: 0, pts: 16, nrr: '+1.152' },
    { rank: 2, team: 'New Zealand', code: 'NZ', p: 11, w: 6, l: 4, nr: 1, pts: 13, nrr: '+0.175' },
    { rank: 3, team: 'India', code: 'IND', p: 10, w: 7, l: 2, nr: 1, pts: 15, nrr: '+0.809' },
    { rank: 4, team: 'Australia', code: 'AUS', p: 10, w: 7, l: 3, nr: 0, pts: 14, nrr: '+0.884' },
    { rank: 5, team: 'Pakistan', code: 'PAK', p: 9, w: 5, l: 3, nr: 1, pts: 11, nrr: '-0.430' },
  ],
  '2015': [
    { rank: 1, team: 'Australia', code: 'AUS', p: 9, w: 7, l: 1, nr: 1, pts: 15, nrr: '+1.782' },
    { rank: 2, team: 'New Zealand', code: 'NZ', p: 9, w: 8, l: 1, nr: 0, pts: 16, nrr: '+2.564' },
    { rank: 3, team: 'India', code: 'IND', p: 8, w: 7, l: 1, nr: 0, pts: 14, nrr: '+1.821' },
    { rank: 4, team: 'South Africa', code: 'SA', p: 8, w: 5, l: 3, nr: 0, pts: 10, nrr: '+1.462' },
  ],
  '2011': [
    { rank: 1, team: 'India', code: 'IND', p: 9, w: 7, l: 1, nr: 1, pts: 15, nrr: '+0.900' },
    { rank: 2, team: 'Sri Lanka', code: 'SL', p: 9, w: 6, l: 2, nr: 1, pts: 13, nrr: '+1.480' },
    { rank: 3, team: 'Pakistan', code: 'PAK', p: 8, w: 6, l: 2, nr: 0, pts: 12, nrr: '+0.770' },
    { rank: 4, team: 'New Zealand', code: 'NZ', p: 8, w: 5, l: 3, nr: 0, pts: 10, nrr: '+0.270' },
  ],
  '2007': [
    { rank: 1, team: 'Australia', code: 'AUS', p: 11, w: 11, l: 0, nr: 0, pts: 22, nrr: '+2.400' },
    { rank: 2, team: 'Sri Lanka', code: 'SL', p: 11, w: 8, l: 3, nr: 0, pts: 16, nrr: '+1.450' },
    { rank: 3, team: 'South Africa', code: 'SA', p: 10, w: 6, l: 4, nr: 0, pts: 12, nrr: '+0.760' },
    { rank: 4, team: 'New Zealand', code: 'NZ', p: 10, w: 6, l: 4, nr: 0, pts: 12, nrr: '+0.540' },
  ],
  '2003': [
    { rank: 1, team: 'Australia', code: 'AUS', p: 11, w: 11, l: 0, nr: 0, pts: 22, nrr: '+1.850' },
    { rank: 2, team: 'India', code: 'IND', p: 11, w: 9, l: 2, nr: 0, pts: 18, nrr: '+1.110' },
    { rank: 3, team: 'Sri Lanka', code: 'SL', p: 10, w: 5, l: 4, nr: 1, pts: 11, nrr: '+0.320' },
    { rank: 4, team: 'Kenya', code: 'KEN', p: 10, w: 5, l: 5, nr: 0, pts: 10, nrr: '-0.700' },
  ],
};

// Playoff / Finals History for T20 World Cup
export const T20_WORLD_CUP_PLAYOFFS = [
  { year: '2024', winner: 'India', runnerUp: 'South Africa', margin: 'India won by 7 runs', venue: 'Kensington Oval, Barbados' },
  { year: '2022', winner: 'England', runnerUp: 'Pakistan', margin: 'England won by 5 wickets', venue: 'MCG, Melbourne' },
  { year: '2021', winner: 'Australia', runnerUp: 'New Zealand', margin: 'Australia won by 8 wickets', venue: 'Dubai International Stadium' },
  { year: '2016', winner: 'West Indies', runnerUp: 'England', margin: 'West Indies won by 4 wickets', venue: 'Eden Gardens, Kolkata' },
  { year: '2014', winner: 'Sri Lanka', runnerUp: 'India', margin: 'Sri Lanka won by 6 wickets', venue: 'Mirpur, Dhaka' },
  { year: '2012', winner: 'West Indies', runnerUp: 'Sri Lanka', margin: 'West Indies won by 36 runs', venue: 'R. Premadasa Stadium, Colombo' },
  { year: '2010', winner: 'England', runnerUp: 'Australia', margin: 'England won by 7 wickets', venue: 'Kensington Oval, Barbados' },
  { year: '2009', winner: 'Pakistan', runnerUp: 'Sri Lanka', margin: 'Pakistan won by 8 wickets', venue: 'Lord\'s, London' },
  { year: '2007', winner: 'India', runnerUp: 'Pakistan', margin: 'India won by 5 runs', venue: 'Wanderers, Johannesburg' },
];

// Playoff / Finals History for ODI World Cup
export const ODI_WORLD_CUP_PLAYOFFS = [
  { year: '2023', winner: 'Australia', runnerUp: 'India', margin: 'Australia won by 6 wickets', venue: 'Narendra Modi Stadium, Ahmedabad' },
  { year: '2019', winner: 'England', runnerUp: 'New Zealand', margin: 'Match tied (England won on boundary count)', venue: 'Lord\'s, London' },
  { year: '2015', winner: 'Australia', runnerUp: 'New Zealand', margin: 'Australia won by 7 wickets', venue: 'MCG, Melbourne' },
  { year: '2011', winner: 'India', runnerUp: 'Sri Lanka', margin: 'India won by 6 wickets', venue: 'Wankhede Stadium, Mumbai' },
  { year: '2007', winner: 'Australia', runnerUp: 'Sri Lanka', margin: 'Australia won by 53 runs (DLS)', venue: 'Kensington Oval, Barbados' },
  { year: '2003', winner: 'Australia', runnerUp: 'India', margin: 'Australia won by 125 runs', venue: 'Wanderers, Johannesburg' },
  { year: '1999', winner: 'Australia', runnerUp: 'Pakistan', margin: 'Australia won by 8 wickets', venue: 'Lord\'s, London' },
  { year: '1996', winner: 'Sri Lanka', runnerUp: 'Australia', margin: 'Sri Lanka won by 7 wickets', venue: 'Gaddafi Stadium, Lahore' },
  { year: '1992', winner: 'Pakistan', runnerUp: 'England', margin: 'Pakistan won by 22 runs', venue: 'MCG, Melbourne' },
  { year: '1987', winner: 'Australia', runnerUp: 'England', margin: 'Australia won by 7 runs', venue: 'Eden Gardens, Kolkata' },
  { year: '1983', winner: 'India', runnerUp: 'West Indies', margin: 'India won by 43 runs', venue: 'Lord\'s, London' },
  { year: '1979', winner: 'West Indies', runnerUp: 'England', margin: 'West Indies won by 92 runs', venue: 'Lord\'s, London' },
  { year: '1975', winner: 'West Indies', runnerUp: 'Australia', margin: 'West Indies won by 17 runs', venue: 'Lord\'s, London' },
];

// Playoff / Finals History for World Test Championship (Test WTC)
export const TEST_WTC_PLAYOFFS = [
  { year: '2023-2025', winner: 'TBD', runnerUp: 'TBD', margin: 'Final scheduled at Lord\'s, London', venue: 'Lord\'s, London' },
  { year: '2021-2023', winner: 'Australia', runnerUp: 'India', margin: 'Australia won by 209 runs', venue: 'The Oval, London' },
  { year: '2019-2021', winner: 'New Zealand', runnerUp: 'India', margin: 'New Zealand won by 8 wickets', venue: 'Rose Bowl, Southampton' },
];
