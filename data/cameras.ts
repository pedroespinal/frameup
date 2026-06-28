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

  // ─── CANON DSLR — Rebel / T series ─────────────────────────────────
  { id: 'canon-t1i',   brand: 'Canon', model: 'EOS Rebel T1i (500D)',  type: 'dslr', sensor: 'aps-c', maxISO: 3200,   hasIBIS: false, nativeISO: 100, year: 2009 },
  { id: 'canon-t2i',   brand: 'Canon', model: 'EOS Rebel T2i (550D)',  type: 'dslr', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2010 },
  { id: 'canon-t3',    brand: 'Canon', model: 'EOS Rebel T3 (1100D)',  type: 'dslr', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2011 },
  { id: 'canon-t3i',   brand: 'Canon', model: 'EOS Rebel T3i (600D)', type: 'dslr', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2011 },
  { id: 'canon-t4i',   brand: 'Canon', model: 'EOS Rebel T4i (650D)', type: 'dslr', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'canon-t5',    brand: 'Canon', model: 'EOS Rebel T5 (1200D)', type: 'dslr', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2014 },
  { id: 'canon-t5i',   brand: 'Canon', model: 'EOS Rebel T5i (700D)', type: 'dslr', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2013 },
  { id: 'canon-t6',    brand: 'Canon', model: 'EOS Rebel T6 (1300D)', type: 'dslr', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2016 },
  { id: 'canon-t6i',   brand: 'Canon', model: 'EOS Rebel T6i (750D)', type: 'dslr', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2015 },
  { id: 'canon-t6s',   brand: 'Canon', model: 'EOS Rebel T6s (760D)', type: 'dslr', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2015 },
  { id: 'canon-t7',    brand: 'Canon', model: 'EOS Rebel T7 (2000D)', type: 'dslr', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2018 },
  { id: 'canon-t7i',   brand: 'Canon', model: 'EOS Rebel T7i (800D)', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2017 },
  { id: 'canon-t8i',   brand: 'Canon', model: 'EOS Rebel T8i (850D)', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2020 },
  { id: 'canon-t100',  brand: 'Canon', model: 'EOS Rebel T100 (4000D)', type: 'dslr', sensor: 'aps-c', maxISO: 6400, hasIBIS: false, nativeISO: 100, year: 2018 },
  { id: 'canon-sl1',   brand: 'Canon', model: 'EOS Rebel SL1 (100D)', type: 'dslr', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2013 },
  { id: 'canon-sl2',   brand: 'Canon', model: 'EOS Rebel SL2 (200D)', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2017 },
  { id: 'canon-sl3',   brand: 'Canon', model: 'EOS Rebel SL3 (250D)', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2019 },

  // ─── CANON DSLR — xxD series ────────────────────────────────────────
  { id: 'canon-60d',   brand: 'Canon', model: 'EOS 60D',  type: 'dslr', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2010 },
  { id: 'canon-70d',   brand: 'Canon', model: 'EOS 70D',  type: 'dslr', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2013 },
  { id: 'canon-77d',   brand: 'Canon', model: 'EOS 77D',  type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2017 },
  { id: 'canon-80d',   brand: 'Canon', model: 'EOS 80D',  type: 'dslr', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2016 },
  { id: 'canon-90d',   brand: 'Canon', model: 'EOS 90D',  type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2019 },

  // ─── CANON DSLR — 7D series ─────────────────────────────────────────
  { id: 'canon-7d',    brand: 'Canon', model: 'EOS 7D',         type: 'dslr', sensor: 'aps-c',      maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2009 },
  { id: 'canon-7dii',  brand: 'Canon', model: 'EOS 7D Mark II', type: 'dslr', sensor: 'aps-c',      maxISO: 16000,  hasIBIS: false, nativeISO: 100, year: 2014 },

  // ─── CANON DSLR — Full Frame ─────────────────────────────────────────
  { id: 'canon-5d',    brand: 'Canon', model: 'EOS 5D',         type: 'dslr', sensor: 'full-frame', maxISO: 3200,   hasIBIS: false, nativeISO: 100, year: 2005 },
  { id: 'canon-5dii',  brand: 'Canon', model: 'EOS 5D Mark II', type: 'dslr', sensor: 'full-frame', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2008 },
  { id: 'canon-5diii', brand: 'Canon', model: 'EOS 5D Mark III',type: 'dslr', sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'canon-5div',  brand: 'Canon', model: 'EOS 5D Mark IV', type: 'dslr', sensor: 'full-frame', maxISO: 32000,  hasIBIS: false, nativeISO: 100, year: 2016 },
  { id: 'canon-5ds',   brand: 'Canon', model: 'EOS 5DS',        type: 'dslr', sensor: 'full-frame', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2015 },
  { id: 'canon-5dsr',  brand: 'Canon', model: 'EOS 5DS R',      type: 'dslr', sensor: 'full-frame', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2015 },
  { id: 'canon-6d',    brand: 'Canon', model: 'EOS 6D',         type: 'dslr', sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'canon-6dii',  brand: 'Canon', model: 'EOS 6D Mark II', type: 'dslr', sensor: 'full-frame', maxISO: 40000,  hasIBIS: false, nativeISO: 100, year: 2017 },
  { id: 'canon-1dx',   brand: 'Canon', model: 'EOS 1D X',          type: 'dslr', sensor: 'full-frame', maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'canon-1dxii', brand: 'Canon', model: 'EOS 1D X Mark II',  type: 'dslr', sensor: 'full-frame', maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2016 },
  { id: 'canon-1dxiii',brand: 'Canon', model: 'EOS 1D X Mark III', type: 'dslr', sensor: 'full-frame', maxISO: 102400, hasIBIS: false, nativeISO: 100, year: 2020 },

  // ─── CANON MIRRORLESS — EOS R ────────────────────────────────────────
  { id: 'canon-r',     brand: 'Canon', model: 'EOS R',          type: 'mirrorless', sensor: 'full-frame', maxISO: 40000,  hasIBIS: false, nativeISO: 100, year: 2018 },
  { id: 'canon-rp',    brand: 'Canon', model: 'EOS RP',         type: 'mirrorless', sensor: 'full-frame', maxISO: 40000,  hasIBIS: false, nativeISO: 100, year: 2019 },
  { id: 'canon-r3',    brand: 'Canon', model: 'EOS R3',         type: 'mirrorless', sensor: 'full-frame', maxISO: 204800, hasIBIS: true,  nativeISO: 100, year: 2021 },
  { id: 'canon-r5',    brand: 'Canon', model: 'EOS R5',         type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2020 },
  { id: 'canon-r5ii',  brand: 'Canon', model: 'EOS R5 Mark II', type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'canon-r6',    brand: 'Canon', model: 'EOS R6',         type: 'mirrorless', sensor: 'full-frame', maxISO: 102400, hasIBIS: true,  nativeISO: 100, year: 2020 },
  { id: 'canon-r6ii',  brand: 'Canon', model: 'EOS R6 Mark II', type: 'mirrorless', sensor: 'full-frame', maxISO: 102400, hasIBIS: true,  nativeISO: 100, year: 2022 },
  { id: 'canon-r8',    brand: 'Canon', model: 'EOS R8',         type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2023 },
  { id: 'canon-r1',    brand: 'Canon', model: 'EOS R1',         type: 'mirrorless', sensor: 'full-frame', maxISO: 204800, hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'canon-r7',    brand: 'Canon', model: 'EOS R7',         type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2022 },
  { id: 'canon-r10',   brand: 'Canon', model: 'EOS R10',        type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2022 },
  { id: 'canon-r50',   brand: 'Canon', model: 'EOS R50',        type: 'mirrorless', sensor: 'aps-c',      maxISO: 32000,  hasIBIS: false, nativeISO: 100, year: 2023 },
  { id: 'canon-r50ii', brand: 'Canon', model: 'EOS R50 II',     type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2024 },
  { id: 'canon-r100',  brand: 'Canon', model: 'EOS R100',       type: 'mirrorless', sensor: 'aps-c',      maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2023 },
  { id: 'canon-m50ii', brand: 'Canon', model: 'EOS M50 Mark II',type: 'mirrorless', sensor: 'aps-c',      maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2020 },
  { id: 'canon-m6ii',  brand: 'Canon', model: 'EOS M6 Mark II', type: 'mirrorless', sensor: 'aps-c',      maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2019 },

  // ─── NIKON DSLR — Entry ──────────────────────────────────────────────
  { id: 'nikon-d3000', brand: 'Nikon', model: 'D3000', type: 'dslr', sensor: 'aps-c', maxISO: 1600,   hasIBIS: false, nativeISO: 100, year: 2009 },
  { id: 'nikon-d3100', brand: 'Nikon', model: 'D3100', type: 'dslr', sensor: 'aps-c', maxISO: 3200,   hasIBIS: false, nativeISO: 100, year: 2010 },
  { id: 'nikon-d3200', brand: 'Nikon', model: 'D3200', type: 'dslr', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'nikon-d3300', brand: 'Nikon', model: 'D3300', type: 'dslr', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2014 },
  { id: 'nikon-d3400', brand: 'Nikon', model: 'D3400', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2016 },
  { id: 'nikon-d3500', brand: 'Nikon', model: 'D3500', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2018 },

  // ─── NIKON DSLR — Mid-range ──────────────────────────────────────────
  { id: 'nikon-d5000', brand: 'Nikon', model: 'D5000', type: 'dslr', sensor: 'aps-c', maxISO: 3200,   hasIBIS: false, nativeISO: 200, year: 2009 },
  { id: 'nikon-d5100', brand: 'Nikon', model: 'D5100', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2011 },
  { id: 'nikon-d5200', brand: 'Nikon', model: 'D5200', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'nikon-d5300', brand: 'Nikon', model: 'D5300', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2013 },
  { id: 'nikon-d5500', brand: 'Nikon', model: 'D5500', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2015 },
  { id: 'nikon-d5600', brand: 'Nikon', model: 'D5600', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2017 },
  { id: 'nikon-d7000', brand: 'Nikon', model: 'D7000', type: 'dslr', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 100, year: 2010 },
  { id: 'nikon-d7100', brand: 'Nikon', model: 'D7100', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2013 },
  { id: 'nikon-d7200', brand: 'Nikon', model: 'D7200', type: 'dslr', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2015 },
  { id: 'nikon-d7500', brand: 'Nikon', model: 'D7500', type: 'dslr', sensor: 'aps-c', maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2017 },

  // ─── NIKON DSLR — Pro APS-C ─────────────────────────────────────────
  { id: 'nikon-d500',  brand: 'Nikon', model: 'D500',  type: 'dslr', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2016 },

  // ─── NIKON DSLR — Full Frame ─────────────────────────────────────────
  { id: 'nikon-d600',  brand: 'Nikon', model: 'D600',  type: 'dslr', sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'nikon-d610',  brand: 'Nikon', model: 'D610',  type: 'dslr', sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2013 },
  { id: 'nikon-d700',  brand: 'Nikon', model: 'D700',  type: 'dslr', sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 200, year: 2008 },
  { id: 'nikon-d750',  brand: 'Nikon', model: 'D750',  type: 'dslr', sensor: 'full-frame', maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2014 },
  { id: 'nikon-d780',  brand: 'Nikon', model: 'D780',  type: 'dslr', sensor: 'full-frame', maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2020 },
  { id: 'nikon-d800',  brand: 'Nikon', model: 'D800',  type: 'dslr', sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'nikon-d800e', brand: 'Nikon', model: 'D800E', type: 'dslr', sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'nikon-d810',  brand: 'Nikon', model: 'D810',  type: 'dslr', sensor: 'full-frame', maxISO: 51200,  hasIBIS: false, nativeISO: 64,  year: 2014 },
  { id: 'nikon-d850',  brand: 'Nikon', model: 'D850',  type: 'dslr', sensor: 'full-frame', maxISO: 102400, hasIBIS: false, nativeISO: 64,  year: 2017 },
  { id: 'nikon-d4',    brand: 'Nikon', model: 'D4',    type: 'dslr', sensor: 'full-frame', maxISO: 204800, hasIBIS: false, nativeISO: 100, year: 2012 },
  { id: 'nikon-d4s',   brand: 'Nikon', model: 'D4S',   type: 'dslr', sensor: 'full-frame', maxISO: 409600, hasIBIS: false, nativeISO: 100, year: 2014 },
  { id: 'nikon-d5',    brand: 'Nikon', model: 'D5',    type: 'dslr', sensor: 'full-frame', maxISO: 102400, hasIBIS: false, nativeISO: 100, year: 2016 },
  { id: 'nikon-d6',    brand: 'Nikon', model: 'D6',    type: 'dslr', sensor: 'full-frame', maxISO: 102400, hasIBIS: false, nativeISO: 100, year: 2020 },

  // ─── NIKON MIRRORLESS — Z ────────────────────────────────────────────
  { id: 'nikon-z30',   brand: 'Nikon', model: 'Z30',    type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2022 },
  { id: 'nikon-z50',   brand: 'Nikon', model: 'Z50',    type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2019 },
  { id: 'nikon-z50ii', brand: 'Nikon', model: 'Z50 II', type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2024 },
  { id: 'nikon-zfc',   brand: 'Nikon', model: 'Zfc',    type: 'mirrorless', sensor: 'aps-c',      maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2021 },
  { id: 'nikon-z5',    brand: 'Nikon', model: 'Z5',     type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2020 },
  { id: 'nikon-z5ii',  brand: 'Nikon', model: 'Z5 II',  type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'nikon-z6',    brand: 'Nikon', model: 'Z6',     type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2018 },
  { id: 'nikon-z6ii',  brand: 'Nikon', model: 'Z6 II',  type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2020 },
  { id: 'nikon-z6iii', brand: 'Nikon', model: 'Z6 III', type: 'mirrorless', sensor: 'full-frame', maxISO: 64000,  hasIBIS: true,  nativeISO: 200, year: 2024 },
  { id: 'nikon-z7',    brand: 'Nikon', model: 'Z7',     type: 'mirrorless', sensor: 'full-frame', maxISO: 25600,  hasIBIS: true,  nativeISO: 64,  year: 2018 },
  { id: 'nikon-z7ii',  brand: 'Nikon', model: 'Z7 II',  type: 'mirrorless', sensor: 'full-frame', maxISO: 25600,  hasIBIS: true,  nativeISO: 64,  year: 2020 },
  { id: 'nikon-z8',    brand: 'Nikon', model: 'Z8',     type: 'mirrorless', sensor: 'full-frame', maxISO: 102400, hasIBIS: true,  nativeISO: 64,  year: 2023 },
  { id: 'nikon-z9',    brand: 'Nikon', model: 'Z9',     type: 'mirrorless', sensor: 'full-frame', maxISO: 102400, hasIBIS: true,  nativeISO: 64,  year: 2021 },
  { id: 'nikon-zf',    brand: 'Nikon', model: 'Zf',     type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2023 },

  // ─── SONY — Full Frame ───────────────────────────────────────────────
  { id: 'sony-a7',     brand: 'Sony', model: 'Alpha A7',      type: 'mirrorless', sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2013 },
  { id: 'sony-a7ii',   brand: 'Sony', model: 'Alpha A7 II',   type: 'mirrorless', sensor: 'full-frame', maxISO: 25600,  hasIBIS: true,  nativeISO: 100, year: 2014 },
  { id: 'sony-a7iii',  brand: 'Sony', model: 'Alpha A7 III',  type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2018 },
  { id: 'sony-a7iv',   brand: 'Sony', model: 'Alpha A7 IV',   type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2021 },
  { id: 'sony-a7r',    brand: 'Sony', model: 'Alpha A7R',     type: 'mirrorless', sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2013 },
  { id: 'sony-a7rii',  brand: 'Sony', model: 'Alpha A7R II',  type: 'mirrorless', sensor: 'full-frame', maxISO: 25600,  hasIBIS: true,  nativeISO: 100, year: 2015 },
  { id: 'sony-a7riii', brand: 'Sony', model: 'Alpha A7R III', type: 'mirrorless', sensor: 'full-frame', maxISO: 32000,  hasIBIS: true,  nativeISO: 100, year: 2017 },
  { id: 'sony-a7riv',  brand: 'Sony', model: 'Alpha A7R IV',  type: 'mirrorless', sensor: 'full-frame', maxISO: 32000,  hasIBIS: true,  nativeISO: 100, year: 2019 },
  { id: 'sony-a7rv',   brand: 'Sony', model: 'Alpha A7R V',   type: 'mirrorless', sensor: 'full-frame', maxISO: 32000,  hasIBIS: true,  nativeISO: 100, year: 2022 },
  { id: 'sony-a7s',    brand: 'Sony', model: 'Alpha A7S',     type: 'mirrorless', sensor: 'full-frame', maxISO: 409600, hasIBIS: false, nativeISO: 100, year: 2014 },
  { id: 'sony-a7sii',  brand: 'Sony', model: 'Alpha A7S II',  type: 'mirrorless', sensor: 'full-frame', maxISO: 409600, hasIBIS: true,  nativeISO: 100, year: 2015 },
  { id: 'sony-a7siii', brand: 'Sony', model: 'Alpha A7S III', type: 'mirrorless', sensor: 'full-frame', maxISO: 409600, hasIBIS: true,  nativeISO: 80,  year: 2020 },
  { id: 'sony-a7c',    brand: 'Sony', model: 'Alpha A7C',     type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2020 },
  { id: 'sony-a7cii',  brand: 'Sony', model: 'Alpha A7C II',  type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'sony-a7cr',   brand: 'Sony', model: 'Alpha A7CR',    type: 'mirrorless', sensor: 'full-frame', maxISO: 32000,  hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'sony-a9',     brand: 'Sony', model: 'Alpha A9',      type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2017 },
  { id: 'sony-a9ii',   brand: 'Sony', model: 'Alpha A9 II',   type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2019 },
  { id: 'sony-a9iii',  brand: 'Sony', model: 'Alpha A9 III',  type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 250, year: 2024 },
  { id: 'sony-a1',     brand: 'Sony', model: 'Alpha A1',      type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2021 },
  { id: 'sony-zve1',   brand: 'Sony', model: 'ZV-E1',         type: 'mirrorless', sensor: 'full-frame', maxISO: 409600, hasIBIS: true,  nativeISO: 80,  year: 2023 },

  // ─── SONY — APS-C ────────────────────────────────────────────────────
  { id: 'sony-a6000',  brand: 'Sony', model: 'Alpha A6000',   type: 'mirrorless', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2014 },
  { id: 'sony-a6100',  brand: 'Sony', model: 'Alpha A6100',   type: 'mirrorless', sensor: 'aps-c', maxISO: 32000,  hasIBIS: false, nativeISO: 100, year: 2019 },
  { id: 'sony-a6300',  brand: 'Sony', model: 'Alpha A6300',   type: 'mirrorless', sensor: 'aps-c', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2016 },
  { id: 'sony-a6400',  brand: 'Sony', model: 'Alpha A6400',   type: 'mirrorless', sensor: 'aps-c', maxISO: 32000,  hasIBIS: false, nativeISO: 100, year: 2019 },
  { id: 'sony-a6500',  brand: 'Sony', model: 'Alpha A6500',   type: 'mirrorless', sensor: 'aps-c', maxISO: 25600,  hasIBIS: true,  nativeISO: 100, year: 2016 },
  { id: 'sony-a6600',  brand: 'Sony', model: 'Alpha A6600',   type: 'mirrorless', sensor: 'aps-c', maxISO: 32000,  hasIBIS: true,  nativeISO: 100, year: 2019 },
  { id: 'sony-a6700',  brand: 'Sony', model: 'Alpha A6700',   type: 'mirrorless', sensor: 'aps-c', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'sony-zve10',  brand: 'Sony', model: 'ZV-E10',        type: 'mirrorless', sensor: 'aps-c', maxISO: 32000,  hasIBIS: false, nativeISO: 100, year: 2021 },
  { id: 'sony-zve10ii',brand: 'Sony', model: 'ZV-E10 II',     type: 'mirrorless', sensor: 'aps-c', maxISO: 51200,  hasIBIS: false, nativeISO: 100, year: 2024 },

  // ─── FUJIFILM — X Series ─────────────────────────────────────────────
  { id: 'fuji-xt1',    brand: 'Fujifilm', model: 'X-T1',    type: 'mirrorless', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 200, year: 2014 },
  { id: 'fuji-xt2',    brand: 'Fujifilm', model: 'X-T2',    type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 200, year: 2016 },
  { id: 'fuji-xt3',    brand: 'Fujifilm', model: 'X-T3',    type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 160, year: 2018 },
  { id: 'fuji-xt4',    brand: 'Fujifilm', model: 'X-T4',    type: 'mirrorless', sensor: 'aps-c', maxISO: 51200,  hasIBIS: true,  nativeISO: 160, year: 2020 },
  { id: 'fuji-xt5',    brand: 'Fujifilm', model: 'X-T5',    type: 'mirrorless', sensor: 'aps-c', maxISO: 51200,  hasIBIS: true,  nativeISO: 125, year: 2022 },
  { id: 'fuji-xt10',   brand: 'Fujifilm', model: 'X-T10',   type: 'mirrorless', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 200, year: 2015 },
  { id: 'fuji-xt20',   brand: 'Fujifilm', model: 'X-T20',   type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 200, year: 2017 },
  { id: 'fuji-xt30',   brand: 'Fujifilm', model: 'X-T30',   type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 160, year: 2019 },
  { id: 'fuji-xt30ii', brand: 'Fujifilm', model: 'X-T30 II',type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 160, year: 2021 },
  { id: 'fuji-xt100',  brand: 'Fujifilm', model: 'X-T100',  type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 200, year: 2018 },
  { id: 'fuji-xt200',  brand: 'Fujifilm', model: 'X-T200',  type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 200, year: 2020 },
  { id: 'fuji-xpro1',  brand: 'Fujifilm', model: 'X-Pro1',  type: 'mirrorless', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 200, year: 2012 },
  { id: 'fuji-xpro2',  brand: 'Fujifilm', model: 'X-Pro2',  type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 200, year: 2016 },
  { id: 'fuji-xpro3',  brand: 'Fujifilm', model: 'X-Pro3',  type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 160, year: 2019 },
  { id: 'fuji-xs10',   brand: 'Fujifilm', model: 'X-S10',   type: 'mirrorless', sensor: 'aps-c', maxISO: 51200,  hasIBIS: true,  nativeISO: 160, year: 2020 },
  { id: 'fuji-xs20',   brand: 'Fujifilm', model: 'X-S20',   type: 'mirrorless', sensor: 'aps-c', maxISO: 51200,  hasIBIS: true,  nativeISO: 160, year: 2023 },
  { id: 'fuji-xe1',    brand: 'Fujifilm', model: 'X-E1',    type: 'mirrorless', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 200, year: 2012 },
  { id: 'fuji-xe2',    brand: 'Fujifilm', model: 'X-E2',    type: 'mirrorless', sensor: 'aps-c', maxISO: 6400,   hasIBIS: false, nativeISO: 200, year: 2013 },
  { id: 'fuji-xe3',    brand: 'Fujifilm', model: 'X-E3',    type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 200, year: 2017 },
  { id: 'fuji-xe4',    brand: 'Fujifilm', model: 'X-E4',    type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 160, year: 2021 },
  { id: 'fuji-xh1',    brand: 'Fujifilm', model: 'X-H1',    type: 'mirrorless', sensor: 'aps-c', maxISO: 12800,  hasIBIS: true,  nativeISO: 200, year: 2018 },
  { id: 'fuji-xh2',    brand: 'Fujifilm', model: 'X-H2',    type: 'mirrorless', sensor: 'aps-c', maxISO: 51200,  hasIBIS: true,  nativeISO: 125, year: 2022 },
  { id: 'fuji-xh2s',   brand: 'Fujifilm', model: 'X-H2S',   type: 'mirrorless', sensor: 'aps-c', maxISO: 51200,  hasIBIS: true,  nativeISO: 160, year: 2022 },
  { id: 'fuji-x100f',  brand: 'Fujifilm', model: 'X100F',   type: 'compact',    sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 200, year: 2017 },
  { id: 'fuji-x100v',  brand: 'Fujifilm', model: 'X100V',   type: 'compact',    sensor: 'aps-c', maxISO: 12800,  hasIBIS: false, nativeISO: 160, year: 2020 },
  { id: 'fuji-x100vi', brand: 'Fujifilm', model: 'X100VI',  type: 'compact',    sensor: 'aps-c', maxISO: 51200,  hasIBIS: true,  nativeISO: 125, year: 2024 },

  // ─── FUJIFILM — GFX (Medium Format) ─────────────────────────────────
  { id: 'fuji-gfx50s',   brand: 'Fujifilm', model: 'GFX 50S',      type: 'mirrorless', sensor: 'medium-format', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2017 },
  { id: 'fuji-gfx50r',   brand: 'Fujifilm', model: 'GFX 50R',      type: 'mirrorless', sensor: 'medium-format', maxISO: 12800,  hasIBIS: false, nativeISO: 100, year: 2018 },
  { id: 'fuji-gfx50sii', brand: 'Fujifilm', model: 'GFX 50S II',   type: 'mirrorless', sensor: 'medium-format', maxISO: 12800,  hasIBIS: true,  nativeISO: 100, year: 2021 },
  { id: 'fuji-gfx100',   brand: 'Fujifilm', model: 'GFX 100',      type: 'mirrorless', sensor: 'medium-format', maxISO: 102400, hasIBIS: true,  nativeISO: 100, year: 2019 },
  { id: 'fuji-gfx100s',  brand: 'Fujifilm', model: 'GFX 100S',     type: 'mirrorless', sensor: 'medium-format', maxISO: 102400, hasIBIS: true,  nativeISO: 100, year: 2021 },
  { id: 'fuji-gfx100sii',brand: 'Fujifilm', model: 'GFX 100S II',  type: 'mirrorless', sensor: 'medium-format', maxISO: 102400, hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'fuji-gfx100ii', brand: 'Fujifilm', model: 'GFX 100 II',   type: 'mirrorless', sensor: 'medium-format', maxISO: 102400, hasIBIS: true,  nativeISO: 100, year: 2023 },

  // ─── PANASONIC — Micro Four Thirds ──────────────────────────────────
  { id: 'pana-g7',    brand: 'Panasonic', model: 'Lumix G7',       type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: false, nativeISO: 200, year: 2015 },
  { id: 'pana-g80',   brand: 'Panasonic', model: 'Lumix G80/G85',  type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2016 },
  { id: 'pana-g9',    brand: 'Panasonic', model: 'Lumix G9',       type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2017 },
  { id: 'pana-g9ii',  brand: 'Panasonic', model: 'Lumix G9 II',    type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'pana-g95',   brand: 'Panasonic', model: 'Lumix G95/G90',  type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2019 },
  { id: 'pana-gh4',   brand: 'Panasonic', model: 'Lumix GH4',      type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: false, nativeISO: 200, year: 2014 },
  { id: 'pana-gh5',   brand: 'Panasonic', model: 'Lumix GH5',      type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2017 },
  { id: 'pana-gh5s',  brand: 'Panasonic', model: 'Lumix GH5S',     type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 204800, hasIBIS: false, nativeISO: 400, year: 2018 },
  { id: 'pana-gh5ii', brand: 'Panasonic', model: 'Lumix GH5 II',   type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2021 },
  { id: 'pana-gh6',   brand: 'Panasonic', model: 'Lumix GH6',      type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 100, year: 2022 },
  { id: 'pana-gh7',   brand: 'Panasonic', model: 'Lumix GH7',      type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'pana-gx80',  brand: 'Panasonic', model: 'Lumix GX80/GX85',type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2016 },
  { id: 'pana-gx9',   brand: 'Panasonic', model: 'Lumix GX9',      type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2018 },

  // ─── PANASONIC — Full Frame (S series) ──────────────────────────────
  { id: 'pana-s1',    brand: 'Panasonic', model: 'Lumix S1',       type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2019 },
  { id: 'pana-s1r',   brand: 'Panasonic', model: 'Lumix S1R',      type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2019 },
  { id: 'pana-s1h',   brand: 'Panasonic', model: 'Lumix S1H',      type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2019 },
  { id: 'pana-s5',    brand: 'Panasonic', model: 'Lumix S5',       type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2020 },
  { id: 'pana-s5ii',  brand: 'Panasonic', model: 'Lumix S5 II',    type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'pana-s5iix', brand: 'Panasonic', model: 'Lumix S5 IIX',   type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2023 },
  { id: 'pana-s9',    brand: 'Panasonic', model: 'Lumix S9',       type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2024 },
  { id: 'pana-s1rii', brand: 'Panasonic', model: 'Lumix S1R II',   type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2024 },

  // ─── OLYMPUS ─────────────────────────────────────────────────────────
  { id: 'oly-em1',     brand: 'Olympus', model: 'OM-D E-M1',         type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2013 },
  { id: 'oly-em1ii',   brand: 'Olympus', model: 'OM-D E-M1 Mark II', type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2016 },
  { id: 'oly-em1iii',  brand: 'Olympus', model: 'OM-D E-M1 Mark III',type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2020 },
  { id: 'oly-em1x',    brand: 'Olympus', model: 'OM-D E-M1X',        type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2019 },
  { id: 'oly-em5',     brand: 'Olympus', model: 'OM-D E-M5',         type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2012 },
  { id: 'oly-em5ii',   brand: 'Olympus', model: 'OM-D E-M5 Mark II', type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2015 },
  { id: 'oly-em5iii',  brand: 'Olympus', model: 'OM-D E-M5 Mark III',type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2019 },
  { id: 'oly-em10',    brand: 'Olympus', model: 'OM-D E-M10',        type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2014 },
  { id: 'oly-em10ii',  brand: 'Olympus', model: 'OM-D E-M10 Mark II',type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2015 },
  { id: 'oly-em10iii', brand: 'Olympus', model: 'OM-D E-M10 Mark III',type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600, hasIBIS: true,  nativeISO: 200, year: 2017 },
  { id: 'oly-em10iv',  brand: 'Olympus', model: 'OM-D E-M10 Mark IV',type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2020 },

  // ─── OM SYSTEM ───────────────────────────────────────────────────────
  { id: 'om1',     brand: 'OM System', model: 'OM-1',         type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 102400, hasIBIS: true,  nativeISO: 200, year: 2022 },
  { id: 'om1ii',   brand: 'OM System', model: 'OM-1 Mark II', type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 102400, hasIBIS: true,  nativeISO: 200, year: 2024 },
  { id: 'om5',     brand: 'OM System', model: 'OM-5',         type: 'mirrorless', sensor: 'micro-four-thirds', maxISO: 25600,  hasIBIS: true,  nativeISO: 200, year: 2022 },

  // ─── LEICA ───────────────────────────────────────────────────────────
  { id: 'leica-m9',    brand: 'Leica', model: 'M9',            type: 'compact',    sensor: 'full-frame', maxISO: 2500,   hasIBIS: false, nativeISO: 160, year: 2009 },
  { id: 'leica-m10',   brand: 'Leica', model: 'M10',           type: 'compact',    sensor: 'full-frame', maxISO: 50000,  hasIBIS: false, nativeISO: 100, year: 2017 },
  { id: 'leica-m10r',  brand: 'Leica', model: 'M10-R',         type: 'compact',    sensor: 'full-frame', maxISO: 50000,  hasIBIS: false, nativeISO: 100, year: 2020 },
  { id: 'leica-m11',   brand: 'Leica', model: 'M11',           type: 'compact',    sensor: 'full-frame', maxISO: 50000,  hasIBIS: false, nativeISO: 64,  year: 2022 },
  { id: 'leica-m11m',  brand: 'Leica', model: 'M11 Monochrom', type: 'compact',    sensor: 'full-frame', maxISO: 200000, hasIBIS: false, nativeISO: 125, year: 2023 },
  { id: 'leica-q2',    brand: 'Leica', model: 'Q2',            type: 'compact',    sensor: 'full-frame', maxISO: 50000,  hasIBIS: false, nativeISO: 100, year: 2019 },
  { id: 'leica-q3',    brand: 'Leica', model: 'Q3',            type: 'compact',    sensor: 'full-frame', maxISO: 100000, hasIBIS: true,  nativeISO: 50,  year: 2023 },
  { id: 'leica-sl2',   brand: 'Leica', model: 'SL2',           type: 'mirrorless', sensor: 'full-frame', maxISO: 50000,  hasIBIS: true,  nativeISO: 100, year: 2019 },
  { id: 'leica-sl2s',  brand: 'Leica', model: 'SL2-S',         type: 'mirrorless', sensor: 'full-frame', maxISO: 100000, hasIBIS: true,  nativeISO: 100, year: 2020 },
  { id: 'leica-cl',    brand: 'Leica', model: 'CL',            type: 'mirrorless', sensor: 'aps-c',      maxISO: 50000,  hasIBIS: false, nativeISO: 100, year: 2017 },
  { id: 'leica-tl2',   brand: 'Leica', model: 'TL2',           type: 'mirrorless', sensor: 'aps-c',      maxISO: 25000,  hasIBIS: false, nativeISO: 100, year: 2017 },

  // ─── PENTAX ──────────────────────────────────────────────────────────
  { id: 'pentax-k1',     brand: 'Pentax', model: 'K-1',          type: 'dslr', sensor: 'full-frame', maxISO: 204800,  hasIBIS: true,  nativeISO: 100, year: 2016 },
  { id: 'pentax-k1ii',   brand: 'Pentax', model: 'K-1 Mark II',  type: 'dslr', sensor: 'full-frame', maxISO: 819200,  hasIBIS: true,  nativeISO: 100, year: 2018 },
  { id: 'pentax-kp',     brand: 'Pentax', model: 'KP',           type: 'dslr', sensor: 'aps-c',      maxISO: 819200,  hasIBIS: true,  nativeISO: 100, year: 2017 },
  { id: 'pentax-k70',    brand: 'Pentax', model: 'K-70',         type: 'dslr', sensor: 'aps-c',      maxISO: 102400,  hasIBIS: true,  nativeISO: 100, year: 2016 },
  { id: 'pentax-k3iii',  brand: 'Pentax', model: 'K-3 Mark III', type: 'dslr', sensor: 'aps-c',      maxISO: 1600000, hasIBIS: true,  nativeISO: 100, year: 2021 },

  // ─── SIGMA ───────────────────────────────────────────────────────────
  { id: 'sigma-fp',  brand: 'Sigma', model: 'fp',   type: 'compact',    sensor: 'full-frame', maxISO: 25600,  hasIBIS: false, nativeISO: 100, year: 2019 },
  { id: 'sigma-fpl', brand: 'Sigma', model: 'fp L', type: 'compact',    sensor: 'full-frame', maxISO: 102400, hasIBIS: false, nativeISO: 100, year: 2021 },
  { id: 'sigma-bf',  brand: 'Sigma', model: 'BF',   type: 'mirrorless', sensor: 'full-frame', maxISO: 51200,  hasIBIS: true,  nativeISO: 100, year: 2025 },

  // ─── HASSELBLAD ──────────────────────────────────────────────────────
  { id: 'hass-x1d2',  brand: 'Hasselblad', model: 'X1D II 50C',  type: 'mirrorless', sensor: 'medium-format', maxISO: 6400,  hasIBIS: false, nativeISO: 100, year: 2019 },
  { id: 'hass-x2d',   brand: 'Hasselblad', model: 'X2D 100C',    type: 'mirrorless', sensor: 'medium-format', maxISO: 6400,  hasIBIS: true,  nativeISO: 64,  year: 2022 },

  // ─── RICOH ───────────────────────────────────────────────────────────
  { id: 'ricoh-gr3',   brand: 'Ricoh', model: 'GR III',   type: 'compact', sensor: 'aps-c', maxISO: 102400, hasIBIS: true, nativeISO: 100, year: 2019 },
  { id: 'ricoh-gr3x',  brand: 'Ricoh', model: 'GR IIIx',  type: 'compact', sensor: 'aps-c', maxISO: 102400, hasIBIS: true, nativeISO: 100, year: 2021 },
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
