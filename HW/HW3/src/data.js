export const PUBG_SQUADS = [
  {
    squadId: 'te',
    squadName: 'The Expendables',
    wwcdCount: 3,
    placementPts: 45,
    killPts: 62
  },
  {
    squadId: 'ces',
    squadName: 'Cerberus Esports',
    wwcdCount: 2,
    placementPts: 40,
    killPts: 55
  },
  {
    squadId: 'roy',
    squadName: 'Roy Esports',
    wwcdCount: 1,
    placementPts: 35,
    killPts: 48
  },
  {
    squadId: 'agg',
    squadName: 'AGG',
    wwcdCount: 1,
    placementPts: 30,
    killPts: 40
  }
];

const NOW = Date.now();
const ONE_HOUR_MS = 60 * 60 * 1000;

export const CRATES = [
  {
    id: 'crate-vip',
    title: 'PVS Finals VIP Ticket',
    priceVnd: 500000,
    remainingStock: 10,
    dropEpochMs: NOW + ONE_HOUR_MS
  },
  {
    id: 'crate-gcoin',
    title: 'G-Coin Crate',
    priceVnd: 200000,
    remainingStock: 5,
    dropEpochMs: NOW + ONE_HOUR_MS
  },
  {
    id: 'crate-skin',
    title: 'Skin Crate',
    priceVnd: 100000,
    remainingStock: 20,
    dropEpochMs: NOW + ONE_HOUR_MS
  }
];