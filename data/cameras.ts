export type SensorType = 'full-frame' | 'aps-c' | 'micro-four-thirds' | 'medium-format';
export type CameraType = 'mirrorless' | 'dslr' | 'compact';

export interface Camera {
  id: string;
  brand: string;
  model: string;
  type: CameraType;
  sensor: SensorType;
  maxISO: number;
  hasIBIS: boolean;
  nativeISO: number;
  year: number;
}

export const cameras: Camera[] = [
  // ─── SONY ───────────────────────────────────────────────────────────
  { id: 'sony-a7iv',    brand: 'Sony', model: 'Alpha A7 IV',     type: 'mirrorless', sensor: 'full-frame',          maxISO: 51200,   hasIBIS: true,  nativeISO: 100, year: 2021 },
  { id: 'sony-a7rv',    brand: 'Sony', model: 'Alpha A7R V',     type: 'mirrorless', sensor: 'full-frame',          maxISO: 32000,   hasIBIS: true,  nativeISO: 100, year: 2022 },
  { id: 'sony-a7siii',  brand: 'Sony', model: 'Alpha A7S III',   type: 'mirrorless', sensor: 'full-frame',          maxISO: 409600,  hasIBIS: true,  nativeISO: 80,  year: 2020 },
  { id: 'sony-a9iii',   brand: 'Sony', model: 'Alpha A9 III',    type: 'mirrorless', sensor: 'full-frame',          maxISO: 51200,   hasIBIS: true,  nativeISO: 250, year: 2023 },
  { id: 'sony-a7cr',    brand: 'Sony', model: 'Alpha A7CR',      type: 'mirrorless', sensor: 'full-frame',          maxISO: 32000,   hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'sony-a6700',   brand: 'Sony', model: 'Alpha A6700',     type: 'mirrorless', sensor: 'aps-c',               maxISO: 51200,   hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'sony-zve10ii', brand: 'Sony', model: 'ZV-E10 II',       type: 'mirrorless', sensor: 'aps-c',               maxISO: 51200,   hasIBIS: false, nativeISO: 100, year: 2024 },

  // ─── CANON ──────────────────────────────────────────────────────────
  { id: 'canon-r5ii',  brand: 'Canon', model: 'EOS R5 Mark II', type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,   hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'canon-r6ii',  brand: 'Canon', model: 'EOS R6 Mark II', type: 'mirrorless', sensor: 'full-frame', maxISO: 102400,  hasIBIS: true,  nativeISO: 100, year: 2022 },
  { id: 'canon-r3',    brand: 'Canon', model: 'EOS R3',         type: 'mirrorless', sensor: 'full-frame', maxISO: 204800,  hasIBIS: true,  nativeISO: 100, year: 2021 },
  { id: 'canon-r1',    brand: 'Canon', model: 'EOS R1',         type: 'mirrorless', sensor: 'full-frame', maxISO: 204800,  hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'canon-r7',    brand: 'Canon', model: 'EOS R7',         type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,   hasIBIS: true,  nativeISO: 100, year: 2022 },
  { id: 'canon-r10',   brand: 'Canon', model: 'EOS R10',        type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,   hasIBIS: false, nativeISO: 100, year: 2022 },
  { id: 'canon-r50ii', brand: 'Canon', model: 'EOS R50 II',     type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,   hasIBIS: false, nativeISO: 100, year: 2024 },
  { id: 'canon-5div',  brand: 'Canon', model: 'EOS 5D Mark IV', type: 'dslr',       sensor: 'full-frame', maxISO: 32000,   hasIBIS: false, nativeISO: 100, year: 2016 },
  { id: 'canon-90d',   brand: 'Canon', model: 'EOS 90D',        type: 'dslr',       sensor: 'aps-c',      maxISO: 25600,   hasIBIS: false, nativeISO: 100, year: 2019 },
  { id: 'canon-6dii',  brand: 'Canon', model: 'EOS 6D Mark II', type: 'dslr',       sensor: 'full-frame', maxISO: 40000,   hasIBIS: false, nativeISO: 100, year: 2017 },

  // ─── NIKON ──────────────────────────────────────────────────────────
  { id: 'nikon-z8',    brand: 'Nikon', model: 'Z8',      type: 'mirrorless', sensor: 'full-frame', maxISO: 102400, hasIBIS: true,  nativeISO: 64,  year: 2023 },
  { id: 'nikon-z9',    brand: 'Nikon', model: 'Z9',      type: 'mirrorless', sensor: 'full-frame', maxISO: 102400, hasIBIS: true,  nativeISO: 64,  year: 2021 },
  { id: 'nikon-z6iii', brand: 'Nikon', model: 'Z6 III',  type: 'mirrorless', sensor: 'full-frame', maxISO: 64000,  hasIBIS: true,  nativeISO: 200, year: 2024 },
  { id: 'nikon-zf',    brand: 'Nikon', model: 'Zf',      type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'nikon-z50ii', brand: 'Nikon', model: 'Z50 II',  type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2024 },
  { id: 'nikon-zfc',   brand: 'Nikon', model: 'Zfc',     type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2021 },
  { id: 'nikon-d850',  brand: 'Nikon', model: 'D850',    type: 'dslr',       sensor: 'full-frame', maxISO: 102400, hasIBIS: false, nativeISO: 64,  year: 2017 },
  { id: 'nikon-d7500', brand: 'Nikon', model: 'D7500',   type: 'dslr',       sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2017 },
  { id: 'nikon-d780',  brand: 'Nikon', model: 'D780',    type: 'dslr',       sensor: 'full-frame', maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2020 },

  // ─── FUJIFILM ───────────────────────────────────────────────────────
  { id: 'fuji-xt5',       brand: 'Fujifilm', model: 'X-T5',        type: 'mirrorless', sensor: 'aps-c',          maxISO: 51200,  hasIBIS: true,  nativeISO: 125, year: 2022 },
  { id: 'fuji-xh2s',      brand: 'Fujifilm', model: 'X-H2S',       type: 'mirrorless', sensor: 'aps-c',          maxISO: 51200,  hasIBIS: true,  nativeISO: 160, year: 2022 },
  { id: 'fuji-xh2',       brand: 'Fujifilm', model: 'X-H2',        type: 'mirrorless', sensor: 'aps-c',          maxISO: 51200,  hasIBIS: true,  nativeISO: 125, year: 2022 },
  { id: 'fuji-x100vi',    brand: 'Fujifilm', model: 'X100VI',       type: 'compact',    sensor: 'aps-c',          maxISO: 51200,  hasIBIS: true,  nativeISO: 125, year: 2024 },
  { id: 'fuji-xs20',      brand: 'Fujifilm', model: 'X-S20',        type: 'mirrorless', sensor: 'aps-c',          maxISO: 51200,  hasIBIS: true,  nativeISO: 160, year: 2023 },
  { id: 'fuji-gfx100sii', brand: 'Fujifilm', model: 'GFX 100S II',  type: 'mirrorless', sensor: 'medium-format',  maxISO: 102400, hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'fuji-gfx50sii',  brand: 'Fujifilm', model: 'GFX 50S II',   type: 'mirrorless', sensor: 'medium-format',  maxISO: 102400, hasIBIS: true,  nativeISO: 100, year: 2021 },
  { id: 'fuji-xt4',       brand: 'Fujifilm', model: 'X-T4',         type: 'mirrorless', sensor: 'aps-c',          maxISO: 51200,  hasIBIS: true,  nativeISO: 160, year: 2020 },

  // ─── OM SYSTEM / OLYMPUS ────────────────────────────────────────────
  { id: 'om1ii',         brand: 'OM System', model: 'OM-1 Mark II',      type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 102400, hasIBIS: true,  nativeISO: 200, year: 2024 },
  { id: 'om5',           brand: 'OM System', model: 'OM-5',              type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2022 },
  { id: 'oly-em1iii',    brand: 'Olympus',   model: 'OM-D E-M1 Mark III',type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2020 },
  { id: 'oly-em5iii',    brand: 'Olympus',   model: 'OM-D E-M5 Mark III',type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2019 },

  // ─── PANASONIC ──────────────────────────────────────────────────────
  { id: 'pana-g9ii',  brand: 'Panasonic', model: 'Lumix G9 II',   type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'pana-gh7',   brand: 'Panasonic', model: 'Lumix GH7',     type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'pana-s5ii',  brand: 'Panasonic', model: 'Lumix S5 II',   type: 'mirrorless', sensor: 'full-frame',        maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'pana-s1rii', brand: 'Panasonic', model: 'Lumix S1R II',  type: 'mirrorless', sensor: 'full-frame',        maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2024 },

  // ─── LEICA ──────────────────────────────────────────────────────────
  { id: 'leica-q3',  brand: 'Leica', model: 'Q3',  type: 'compact', sensor: 'full-frame', maxISO: 100000, hasIBIS: true,  nativeISO: 50,  year: 2023 },
  { id: 'leica-m11', brand: 'Leica', model: 'M11', type: 'compact', sensor: 'full-frame', maxISO: 50000,  hasIBIS: false, nativeISO: 64,  year: 2022 },

  // ─── PENTAX ─────────────────────────────────────────────────────────
  { id: 'pentax-k3iii', brand: 'Pentax', model: 'K-3 Mark III', type: 'dslr', sensor: 'aps-c', maxISO: 1600000, hasIBIS: true, nativeISO: 100, year: 2021 },

  // ─── SIGMA ──────────────────────────────────────────────────────────
  { id: 'sigma-fpl', brand: 'Sigma', model: 'fp L', type: 'compact', sensor: 'full-frame', maxISO: 102400, hasIBIS: false, nativeISO: 100, year: 2021 },
  { id: 'sigma-bf',  brand: 'Sigma', model: 'BF',   type: 'mirrorless', sensor: 'full-frame', maxISO: 51200, hasIBIS: true,  nativeISO: 100, year: 2025 },
];

export const getCamerasByBrand = (): Record<string, Camera[]> => {
  const brands: Record<string, Camera[]> = {};
  cameras.forEach((cam) => {
    if (!brands[cam.brand]) brands[cam.brand] = [];
    brands[cam.brand].push(cam);
  });
  return brands;
};

export const getCameraById = (id: string): Camera | undefined =>
  cameras.find((c) => c.id === id);

export const getSensorLabel = (sensor: SensorType): string => {
  const labels: Record<SensorType, string> = {
    'full-frame': 'Full Frame',
    'aps-c': 'APS-C',
    'micro-four-thirds': 'Micro 4/3',
    'medium-format': 'Formato Medio',
  };
  return labels[sensor];
};

export const getSensorColor = (sensor: SensorType): string => {
  const colors: Record<SensorType, string> = {
    'full-frame': '#E8A838',
    'aps-c': '#4FC3F7',
    'micro-four-thirds': '#66BB6A',
    'medium-format': '#CE93D8',
  };
  return colors[sensor];
};
