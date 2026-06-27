import { SensorType } from '@/data/cameras';

// Circle of Confusion in mm by sensor type
const COC: Record<SensorType, number> = {
  'full-frame':         0.029,
  'aps-c':              0.019,
  'micro-four-thirds':  0.015,
  'medium-format':      0.043,
};

export interface DOFResult {
  hyperfocal: number;   // meters
  nearLimit: number;    // meters
  farLimit: number;     // meters (Infinity if beyond hyperfocal)
  totalDOF: number;     // meters (null if infinite)
  isInfinite: boolean;
  depthLabel: string;
}

export function calcDOF(
  focalMM: number,
  aperture: number,
  distanceM: number,
  sensor: SensorType
): DOFResult {
  const coc = COC[sensor];
  const f = focalMM / 1000; // convert to meters

  // Hyperfocal distance in meters
  const hyperfocal = (focalMM * focalMM) / (aperture * coc) / 1000 + f;

  // Near focus limit
  const near = (distanceM * (hyperfocal - f)) / (hyperfocal + distanceM - 2 * f);

  // Far focus limit
  const farDenom = hyperfocal - distanceM;
  const isInfinite = farDenom <= 0;
  const far = isInfinite ? Infinity : (distanceM * (hyperfocal - f)) / farDenom;

  const totalDOF = isInfinite ? Infinity : far - near;

  let depthLabel = '';
  if (isInfinite) {
    depthLabel = 'Infinita — todo en foco';
  } else if (totalDOF < 0.05) {
    depthLabel = 'Extremadamente reducida';
  } else if (totalDOF < 0.3) {
    depthLabel = 'Muy reducida — bokeh pronunciado';
  } else if (totalDOF < 1) {
    depthLabel = 'Reducida — fondo desenfocado';
  } else if (totalDOF < 3) {
    depthLabel = 'Moderada';
  } else if (totalDOF < 10) {
    depthLabel = 'Amplia';
  } else {
    depthLabel = 'Muy amplia — casi todo en foco';
  }

  return {
    hyperfocal: Math.round(hyperfocal * 10) / 10,
    nearLimit:  Math.round(near * 100) / 100,
    farLimit:   isInfinite ? Infinity : Math.round(far * 10) / 10,
    totalDOF:   isInfinite ? Infinity : Math.round(totalDOF * 100) / 100,
    isInfinite,
    depthLabel,
  };
}

export function formatDistance(m: number): string {
  if (!isFinite(m)) return '∞';
  if (m < 1) return `${Math.round(m * 100)} cm`;
  if (m >= 1000) return `${(m / 1000).toFixed(1)} km`;
  return `${m.toFixed(1)} m`;
}

// Common focal lengths for reference
export const FOCAL_LENGTHS = [8,10,12,14,16,20,24,28,35,50,85,100,135,200,300,400,500,600];
export const APERTURES_DOF  = [1.0,1.2,1.4,1.8,2.0,2.8,4.0,5.6,8,11,16,22];
export const DISTANCES_M    = [0.3,0.5,0.75,1,1.5,2,3,5,7,10,15,20,30,50,100];
