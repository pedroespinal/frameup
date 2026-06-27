export type CameraMount =
  | 'sony-e'    // Sony E-mount (FF + APS-C)
  | 'canon-rf'  // Canon RF
  | 'nikon-z'   // Nikon Z
  | 'fuji-x'    // Fujifilm X
  | 'mft'       // Micro Four Thirds
  | 'fuji-gfx'  // Fujifilm GFX (Medium Format)
  | 'leica-sl'  // Leica SL/CL
  | 'canon-ef'  // Canon EF (DSLR)
  | 'nikon-f';  // Nikon F (DSLR)

export type UseCase =
  | 'retrato'
  | 'paisaje'
  | 'astro'
  | 'macro'
  | 'accion'
  | 'calle'
  | 'boda'
  | 'arquitectura'
  | 'fauna'
  | 'viaje';

export type PriceRange = 'economico' | 'medio' | 'pro' | 'ultra';

export interface Lens {
  id: string;
  brand: string;
  model: string;
  mount: CameraMount;
  focal: number;         // real focal length (mm)
  focalMax?: number;     // for zooms
  aperture: number;
  useCases: UseCase[];
  price: PriceRange;
  firstParty: boolean;
  cropFactor: number;    // 1.0=FF, 1.5=APS-C, 2.0=M43, 0.79=GFX
  note?: string;
}

export const lenses: Lens[] = [
  // ─── SONY E-MOUNT ───────────────────────────────────────
  { id: 'sony-gm-14f18',   brand: 'Sony',     model: 'FE 14mm f/1.8 GM',      mount: 'sony-e', focal: 14,  aperture: 1.8, useCases: ['astro','paisaje'],         price: 'pro',      firstParty: true,  cropFactor: 1.0 },
  { id: 'sony-gm-24f14',   brand: 'Sony',     model: 'FE 24mm f/1.4 GM',      mount: 'sony-e', focal: 24,  aperture: 1.4, useCases: ['astro','paisaje','calle'],  price: 'pro',      firstParty: true,  cropFactor: 1.0 },
  { id: 'sony-35f18',      brand: 'Sony',     model: 'FE 35mm f/1.8',         mount: 'sony-e', focal: 35,  aperture: 1.8, useCases: ['calle','viaje','retrato'],  price: 'medio',    firstParty: true,  cropFactor: 1.0 },
  { id: 'sony-50f12gm',    brand: 'Sony',     model: 'FE 50mm f/1.2 GM',      mount: 'sony-e', focal: 50,  aperture: 1.2, useCases: ['retrato','boda'],           price: 'ultra',    firstParty: true,  cropFactor: 1.0 },
  { id: 'sony-85f14gm',    brand: 'Sony',     model: 'FE 85mm f/1.4 GM II',   mount: 'sony-e', focal: 85,  aperture: 1.4, useCases: ['retrato','boda'],           price: 'ultra',    firstParty: true,  cropFactor: 1.0 },
  { id: 'sony-100gm',      brand: 'Sony',     model: 'FE 100mm f/2.8 STF GM', mount: 'sony-e', focal: 100, aperture: 2.8, useCases: ['retrato','macro'],          price: 'ultra',    firstParty: true,  cropFactor: 1.0 },
  { id: 'sony-70200gm2',   brand: 'Sony',     model: 'FE 70-200mm f/2.8 GM II',mount:'sony-e', focal: 70, focalMax: 200, aperture: 2.8, useCases: ['fauna','accion','boda','retrato'], price: 'ultra', firstParty: true, cropFactor: 1.0 },
  { id: 'sony-200600g',    brand: 'Sony',     model: 'FE 200-600mm f/5.6-6.3 G',mount:'sony-e',focal:200,focalMax:600, aperture:5.6, useCases:['fauna','accion'], price: 'pro', firstParty: true, cropFactor: 1.0 },
  { id: 'sigma-35f14-e',   brand: 'Sigma',    model: 'Art 35mm f/1.4 DG DN',  mount: 'sony-e', focal: 35,  aperture: 1.4, useCases: ['retrato','calle','boda'],  price: 'medio',    firstParty: false, cropFactor: 1.0 },
  { id: 'sigma-85f14-e',   brand: 'Sigma',    model: 'Art 85mm f/1.4 DG DN',  mount: 'sony-e', focal: 85,  aperture: 1.4, useCases: ['retrato','boda'],           price: 'pro',      firstParty: false, cropFactor: 1.0 },
  { id: 'tamron-2875-e',   brand: 'Tamron',   model: '28-75mm f/2.8 Di III VXD G2',mount:'sony-e',focal:28,focalMax:75,aperture:2.8,useCases:['boda','viaje','retrato'], price:'medio', firstParty:false, cropFactor:1.0, note:'Excelente relación calidad-precio' },
  { id: 'tamron-150500-e', brand: 'Tamron',   model: '150-500mm f/5-6.7 Di III VC VXD',mount:'sony-e',focal:150,focalMax:500,aperture:5.0,useCases:['fauna','accion'], price:'medio', firstParty:false, cropFactor:1.0 },
  // APS-C Sony E
  { id: 'sony-e-11f18',    brand: 'Sony',     model: 'E 11mm f/1.8',          mount: 'sony-e', focal: 11,  aperture: 1.8, useCases: ['astro','paisaje','viaje'],  price: 'medio',    firstParty: true,  cropFactor: 1.5 },
  { id: 'sony-e-15f14g',   brand: 'Sony',     model: 'E 15mm f/1.4 G',        mount: 'sony-e', focal: 15,  aperture: 1.4, useCases: ['calle','paisaje','astro'],  price: 'pro',      firstParty: true,  cropFactor: 1.5 },

  // ─── CANON RF ────────────────────────────────────────────
  { id: 'canon-rf-15f28',  brand: 'Canon',    model: 'RF 15-35mm f/2.8L IS USM',mount:'canon-rf',focal:15,focalMax:35,aperture:2.8,useCases:['paisaje','arquitectura','astro'], price:'ultra', firstParty:true, cropFactor:1.0 },
  { id: 'canon-rf-50f18',  brand: 'Canon',    model: 'RF 50mm f/1.8 STM',     mount: 'canon-rf',focal: 50, aperture: 1.8, useCases: ['calle','retrato','viaje'],  price: 'economico', firstParty: true, cropFactor: 1.0, note: 'Mejor precio del sistema RF' },
  { id: 'canon-rf-85f12',  brand: 'Canon',    model: 'RF 85mm f/1.2L USM DS', mount: 'canon-rf',focal: 85, aperture: 1.2, useCases: ['retrato','boda'],           price: 'ultra',    firstParty: true,  cropFactor: 1.0, note: 'Bokeh extraordinario con DS coating' },
  { id: 'canon-rf-100f28', brand: 'Canon',    model: 'RF 100mm f/2.8L IS USM Macro',mount:'canon-rf',focal:100,aperture:2.8,useCases:['macro','retrato'], price:'ultra', firstParty:true, cropFactor:1.0 },
  { id: 'canon-rf-70200',  brand: 'Canon',    model: 'RF 70-200mm f/2.8L IS USM',mount:'canon-rf',focal:70,focalMax:200,aperture:2.8,useCases:['accion','fauna','boda'], price:'ultra', firstParty:true, cropFactor:1.0 },
  { id: 'canon-rf-100500', brand: 'Canon',    model: 'RF 100-500mm f/4.5-7.1L IS USM',mount:'canon-rf',focal:100,focalMax:500,aperture:4.5,useCases:['fauna','accion'], price:'ultra', firstParty:true, cropFactor:1.0 },

  // ─── NIKON Z ─────────────────────────────────────────────
  { id: 'nikon-z-20f18s',  brand: 'Nikon',    model: 'NIKKOR Z 20mm f/1.8 S', mount: 'nikon-z', focal: 20,  aperture: 1.8, useCases: ['astro','paisaje'],         price: 'pro',      firstParty: true,  cropFactor: 1.0 },
  { id: 'nikon-z-35f18s',  brand: 'Nikon',    model: 'NIKKOR Z 35mm f/1.8 S', mount: 'nikon-z', focal: 35,  aperture: 1.8, useCases: ['calle','retrato','viaje'], price: 'pro',      firstParty: true,  cropFactor: 1.0 },
  { id: 'nikon-z-50f12s',  brand: 'Nikon',    model: 'NIKKOR Z 50mm f/1.2 S', mount: 'nikon-z', focal: 50,  aperture: 1.2, useCases: ['retrato','boda'],           price: 'ultra',    firstParty: true,  cropFactor: 1.0 },
  { id: 'nikon-z-85f12s',  brand: 'Nikon',    model: 'NIKKOR Z 85mm f/1.2 S', mount: 'nikon-z', focal: 85,  aperture: 1.2, useCases: ['retrato','boda'],           price: 'ultra',    firstParty: true,  cropFactor: 1.0 },
  { id: 'nikon-z-70200s',  brand: 'Nikon',    model: 'NIKKOR Z 70-200mm f/2.8 VR S',mount:'nikon-z',focal:70,focalMax:200,aperture:2.8,useCases:['accion','fauna','boda'], price:'ultra', firstParty:true, cropFactor:1.0 },

  // ─── FUJIFILM X ──────────────────────────────────────────
  { id: 'fuji-16f14',      brand: 'Fujifilm',  model: 'XF 16mm f/1.4 R WR',   mount: 'fuji-x', focal: 16,  aperture: 1.4, useCases: ['astro','paisaje','calle'],  price: 'pro',      firstParty: true,  cropFactor: 1.5 },
  { id: 'fuji-23f14ii',    brand: 'Fujifilm',  model: 'XF 23mm f/1.4 R LM WR',mount: 'fuji-x', focal: 23,  aperture: 1.4, useCases: ['calle','retrato','viaje'],  price: 'pro',      firstParty: true,  cropFactor: 1.5, note: '35mm equivalente — el estándar Fuji' },
  { id: 'fuji-33f14',      brand: 'Fujifilm',  model: 'XF 33mm f/1.4 R LM WR',mount: 'fuji-x', focal: 33,  aperture: 1.4, useCases: ['retrato','calle','boda'],   price: 'pro',      firstParty: true,  cropFactor: 1.5, note: '50mm equivalente — el clásico normal' },
  { id: 'fuji-56f12ii',    brand: 'Fujifilm',  model: 'XF 56mm f/1.2 R WR II', mount: 'fuji-x', focal: 56, aperture: 1.2, useCases: ['retrato','boda'],           price: 'pro',      firstParty: true,  cropFactor: 1.5, note: '85mm equivalente — retrato definitivo en Fuji' },
  { id: 'fuji-80f28',      brand: 'Fujifilm',  model: 'XF 80mm f/2.8 R LM OIS Macro',mount:'fuji-x',focal:80,aperture:2.8,useCases:['macro','retrato'], price:'pro', firstParty:true, cropFactor:1.5 },
  { id: 'fuji-100400',     brand: 'Fujifilm',  model: 'XF 100-400mm f/4.5-5.6 R LM OIS WR',mount:'fuji-x',focal:100,focalMax:400,aperture:4.5,useCases:['fauna','accion'], price:'pro', firstParty:true, cropFactor:1.5 },
  { id: 'ttartisan-23f14', brand: 'TTArtisan', model: '23mm f/1.4',            mount: 'fuji-x', focal: 23,  aperture: 1.4, useCases: ['calle','retrato'],          price: 'economico', firstParty: false, cropFactor: 1.5, note: 'Manual, muy económico, buena calidad' },
  { id: 'viltrox-23f14x',  brand: 'Viltrox',   model: 'AF 23mm f/1.4 XF',     mount: 'fuji-x', focal: 23,  aperture: 1.4, useCases: ['calle','retrato','viaje'],  price: 'economico', firstParty: false, cropFactor: 1.5, note: 'AF rápido a precio económico' },
  { id: 'viltrox-56f14x',  brand: 'Viltrox',   model: 'AF 56mm f/1.4 XF',     mount: 'fuji-x', focal: 56,  aperture: 1.4, useCases: ['retrato','boda'],           price: 'economico', firstParty: false, cropFactor: 1.5 },

  // ─── MICRO FOUR THIRDS ───────────────────────────────────
  { id: 'oly-75f18',       brand: 'Olympus',  model: 'M.Zuiko 75mm f/1.8',    mount: 'mft',    focal: 75,  aperture: 1.8, useCases: ['retrato','boda'],           price: 'pro',      firstParty: true,  cropFactor: 2.0, note: '150mm equiv. — el mejor retrato del sistema' },
  { id: 'oly-17f12pro',    brand: 'Olympus',  model: 'M.Zuiko 17mm f/1.2 Pro',mount: 'mft',    focal: 17,  aperture: 1.2, useCases: ['calle','retrato','paisaje'], price: 'ultra',   firstParty: true,  cropFactor: 2.0 },
  { id: 'oly-25f12pro',    brand: 'Olympus',  model: 'M.Zuiko 25mm f/1.2 Pro',mount: 'mft',    focal: 25,  aperture: 1.2, useCases: ['retrato','calle','boda'],   price: 'ultra',    firstParty: true,  cropFactor: 2.0 },
  { id: 'oly-40150f28pro', brand: 'Olympus',  model: 'M.Zuiko 40-150mm f/2.8 Pro',mount:'mft', focal:40, focalMax:150, aperture:2.8, useCases:['accion','fauna','boda'], price:'pro', firstParty:true, cropFactor:2.0 },
  { id: 'pana-leica-15f17',brand: 'Panasonic',model: 'Leica DG 15mm f/1.7',   mount: 'mft',    focal: 15,  aperture: 1.7, useCases: ['calle','viaje','retrato'],  price: 'pro',      firstParty: true,  cropFactor: 2.0 },
  { id: 'laowa-75f2-mft',  brand: 'Laowa',    model: '7.5mm f/2 MFT',         mount: 'mft',    focal: 7.5, aperture: 2.0, useCases: ['astro','paisaje'],          price: 'medio',    firstParty: false, cropFactor: 2.0, note: '15mm equiv. — el gran angular de astro para M43' },

  // ─── FUJIFILM GFX ─────────────────────────────────────────
  { id: 'gf-32f4',         brand: 'Fujifilm',  model: 'GF 32-64mm f/4 R LM WR',mount:'fuji-gfx',focal:32,focalMax:64,aperture:4.0,useCases:['paisaje','arquitectura','retrato'], price:'ultra', firstParty:true, cropFactor:0.79 },
  { id: 'gf-80f17',        brand: 'Fujifilm',  model: 'GF 80mm f/1.7 R WR',   mount: 'fuji-gfx',focal:80, aperture:1.7, useCases:['retrato','boda'],           price: 'ultra',    firstParty: true,  cropFactor: 0.79 },
  { id: 'gf-110f2',        brand: 'Fujifilm',  model: 'GF 110mm f/2 R LM WR', mount: 'fuji-gfx',focal:110,aperture:2.0, useCases:['retrato','boda'],           price: 'ultra',    firstParty: true,  cropFactor: 0.79, note: 'El retrato definitivo en formato medio' },

  // ─── CANON EF (DSLR) ─────────────────────────────────────
  { id: 'canon-ef-50f18',  brand: 'Canon',    model: 'EF 50mm f/1.8 STM',     mount: 'canon-ef',focal:50, aperture:1.8, useCases:['retrato','calle','viaje'],  price:'economico', firstParty:true, cropFactor:1.0, note: 'El lente más vendido de Canon — imprescindible' },
  { id: 'canon-ef-85f18',  brand: 'Canon',    model: 'EF 85mm f/1.8 USM',     mount: 'canon-ef',focal:85, aperture:1.8, useCases:['retrato','boda'],           price:'medio',     firstParty:true, cropFactor:1.0 },
  { id: 'canon-ef-24105',  brand: 'Canon',    model: 'EF 24-105mm f/4L IS USM',mount:'canon-ef',focal:24,focalMax:105,aperture:4.0,useCases:['viaje','boda','paisaje'], price:'pro', firstParty:true, cropFactor:1.0 },

  // ─── NIKON F (DSLR) ──────────────────────────────────────
  { id: 'nikon-f-50f18g',  brand: 'Nikon',    model: 'AF-S 50mm f/1.8G',      mount: 'nikon-f', focal:50, aperture:1.8, useCases:['retrato','calle','viaje'],  price:'economico', firstParty:true, cropFactor:1.0 },
  { id: 'nikon-f-85f18g',  brand: 'Nikon',    model: 'AF-S 85mm f/1.8G',      mount: 'nikon-f', focal:85, aperture:1.8, useCases:['retrato','boda'],           price:'medio',     firstParty:true, cropFactor:1.0 },
  { id: 'nikon-f-1424',    brand: 'Nikon',    model: 'AF-S 14-24mm f/2.8G ED',mount: 'nikon-f', focal:14,focalMax:24,aperture:2.8,useCases:['paisaje','astro','arquitectura'], price:'ultra', firstParty:true, cropFactor:1.0 },
];

// Map camera IDs to their mount
export const cameraToMount: Record<string, CameraMount> = {
  // Sony
  'sony-a7iv': 'sony-e', 'sony-a7rv': 'sony-e', 'sony-a7siii': 'sony-e',
  'sony-a9iii': 'sony-e', 'sony-a7cr': 'sony-e', 'sony-a6700': 'sony-e',
  'sony-zve10ii': 'sony-e',
  // Canon mirrorless
  'canon-r5ii': 'canon-rf', 'canon-r6ii': 'canon-rf', 'canon-r3': 'canon-rf',
  'canon-r1': 'canon-rf', 'canon-r7': 'canon-rf', 'canon-r10': 'canon-rf',
  'canon-r50ii': 'canon-rf',
  // Canon DSLR
  'canon-5div': 'canon-ef', 'canon-90d': 'canon-ef', 'canon-6dii': 'canon-ef',
  // Nikon mirrorless
  'nikon-z8': 'nikon-z', 'nikon-z9': 'nikon-z', 'nikon-z6iii': 'nikon-z',
  'nikon-zf': 'nikon-z', 'nikon-z50ii': 'nikon-z', 'nikon-zfc': 'nikon-z',
  // Nikon DSLR
  'nikon-d850': 'nikon-f', 'nikon-d7500': 'nikon-f', 'nikon-d780': 'nikon-f',
  // Fuji X
  'fuji-xt5': 'fuji-x', 'fuji-xh2s': 'fuji-x', 'fuji-xh2': 'fuji-x',
  'fuji-x100vi': 'fuji-x', 'fuji-xs20': 'fuji-x', 'fuji-xt4': 'fuji-x',
  // Fuji GFX
  'fuji-gfx100sii': 'fuji-gfx', 'fuji-gfx50sii': 'fuji-gfx',
  // MFT
  'om1ii': 'mft', 'om5': 'mft', 'oly-em1iii': 'mft', 'oly-em5iii': 'mft',
  'pana-g9ii': 'mft', 'pana-gh7': 'mft',
  // Panasonic FF
  'pana-s5ii': 'sony-e', // L-mount but closest compatible
  // Leica
  'leica-q3': 'leica-sl', 'leica-m11': 'leica-sl',
  // Sigma
  'sigma-fpl': 'sony-e', 'sigma-bf': 'sony-e',
  // Pentax
  'pentax-k3iii': 'nikon-f', // use nikon-f as fallback
};

export const getLensesForMount = (mount: CameraMount): Lens[] =>
  lenses.filter((l) => l.mount === mount);

export const getLensesForUseCase = (mount: CameraMount, useCase: UseCase): Lens[] =>
  lenses.filter((l) => l.mount === mount && l.useCases.includes(useCase));

export const priceLabel = (p: PriceRange): string => ({
  economico: 'Económico',
  medio: 'Precio medio',
  pro: 'Profesional',
  ultra: 'Ultra premium',
}[p]);

export const priceColor = (p: PriceRange): string => ({
  economico: '#66BB6A',
  medio:     '#FFA726',
  pro:       '#4FC3F7',
  ultra:     '#CE93D8',
}[p]);

export const useCaseLabel = (u: UseCase): string => ({
  retrato: 'Retrato', paisaje: 'Paisaje', astro: 'Astro',
  macro: 'Macro', accion: 'Acción', calle: 'Calle',
  boda: 'Boda', arquitectura: 'Arquitectura', fauna: 'Fauna', viaje: 'Viaje',
}[u]);
