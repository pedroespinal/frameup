export type SceneCategory =
  | 'noche'
  | 'paisaje'
  | 'retrato'
  | 'accion'
  | 'evento'
  | 'macro'
  | 'calle'
  | 'arquitectura';

export type Difficulty = 'principiante' | 'intermedio' | 'avanzado';

export interface Scene {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: SceneCategory;
  emoji: string;
  tags: string[];
  difficulty: Difficulty;
  color: string;    // dark card background
  accent: string;   // vivid accent color for borders/icons
  tripodRequired: boolean;
}

export const scenes: Scene[] = [
  {
    id: 'astrofotografia',
    title: 'Vía Láctea',
    subtitle: 'Astrofotografía nocturna',
    description:
      'Captura la Vía Láctea y miles de estrellas en paisajes oscuros. Requiere cielos sin contaminación lumínica y luna nueva.',
    category: 'noche',
    emoji: '🌌',
    tags: ['vía láctea', 'estrellas', 'astro', 'noche', 'cielo'],
    difficulty: 'avanzado',
    color: '#0D0D2E', accent: '#5B5BFF',
    tripodRequired: true,
  },
  {
    id: 'luna-paisaje',
    title: 'Paisaje a la Luna',
    subtitle: 'Fotografía con luz de luna',
    description:
      'Aprovecha la luz suave de la luna llena para iluminar paisajes nocturnos. La luna puede ser tan brillante como el amanecer.',
    category: 'noche',
    emoji: '🌕',
    tags: ['luna', 'noche', 'paisaje', 'luz de luna', 'moonlight'],
    difficulty: 'intermedio',
    color: '#080E20', accent: '#4FC3F7',
    tripodRequired: true,
  },
  {
    id: 'fotografia-nocturna-urbana',
    title: 'Ciudad de Noche',
    subtitle: 'Luces urbanas y neón',
    description:
      'Captura la energía de la ciudad por la noche con sus luces de neón, lámparas y reflejos en el asfalto mojado.',
    category: 'noche',
    emoji: '🌃',
    tags: ['ciudad', 'noche', 'urbano', 'luces', 'neón'],
    difficulty: 'intermedio',
    color: '#100818', accent: '#CE93D8',
    tripodRequired: false,
  },
  {
    id: 'rastros-estrellas',
    title: 'Rastros de Estrellas',
    subtitle: 'Star trails con exposición larga',
    description:
      'Fotografía la rotación de la Tierra registrando el movimiento circular de las estrellas durante horas.',
    category: 'noche',
    emoji: '⭐',
    tags: ['star trails', 'estrellas', 'rotación', 'larga exposición'],
    difficulty: 'avanzado',
    color: '#060D18', accent: '#80DEEA',
    tripodRequired: true,
  },
  {
    id: 'hora-dorada-retrato',
    title: 'Retratos Hora Dorada',
    subtitle: 'Luz cálida al atardecer',
    description:
      'Los retratos con luz del atardecer tienen una calidez y calidad imposibles de replicar en estudio. Los tonos dorados favorecen cualquier piel.',
    category: 'retrato',
    emoji: '🌅',
    tags: ['hora dorada', 'retrato', 'atardecer', 'golden hour', 'bokeh'],
    difficulty: 'principiante',
    color: '#1E0E00', accent: '#E8A838',
    tripodRequired: false,
  },
  {
    id: 'cascadas-agua',
    title: 'Cascadas y Ríos',
    subtitle: 'Agua sedosa con larga exposición',
    description:
      'Convierte el agua en seda usando velocidades lentas. Requiere trípode y filtros ND para conseguir tiempos de exposición largos a plena luz del día.',
    category: 'paisaje',
    emoji: '💧',
    tags: ['cascadas', 'agua', 'larga exposición', 'filtro ND', 'paisaje'],
    difficulty: 'intermedio',
    color: '#051515', accent: '#26C6DA',
    tripodRequired: true,
  },
  {
    id: 'deportes-accion',
    title: 'Deportes y Acción',
    subtitle: 'Congelar el movimiento',
    description:
      'Congela instantes de alta velocidad en deportes, atletismo o cualquier acción rápida con velocidades altísimas de obturación.',
    category: 'accion',
    emoji: '⚡',
    tags: ['deportes', 'acción', 'velocidad', 'congelar', 'atletismo'],
    difficulty: 'intermedio',
    color: '#1A0D00', accent: '#FFA726',
    tripodRequired: false,
  },
  {
    id: 'macro-naturaleza',
    title: 'Macro Naturaleza',
    subtitle: 'El mundo en primer plano',
    description:
      'Descubre el fascinante mundo microscópico: gotas de agua, insectos, flores y texturas que el ojo humano apenas percibe.',
    category: 'macro',
    emoji: '🌿',
    tags: ['macro', 'insectos', 'flores', 'primer plano', 'naturaleza'],
    difficulty: 'intermedio',
    color: '#061506', accent: '#66BB6A',
    tripodRequired: false,
  },
  {
    id: 'retrato-estudio',
    title: 'Retrato en Estudio',
    subtitle: 'Con flash y luz controlada',
    description:
      'Domina la luz artificial en estudio para crear retratos profesionales. Flash de estudio, softboxes y reflectores son tus herramientas.',
    category: 'retrato',
    emoji: '📸',
    tags: ['estudio', 'flash', 'retrato', 'softbox', 'luz artificial'],
    difficulty: 'avanzado',
    color: '#111111', accent: '#BDBDBD',
    tripodRequired: false,
  },
  {
    id: 'fotografia-callejera',
    title: 'Fotografía Callejera',
    subtitle: 'Capturar la vida urbana',
    description:
      'La street photography captura momentos espontáneos de la vida cotidiana. Requiere rapidez, discreción y buen ojo.',
    category: 'calle',
    emoji: '🏙️',
    tags: ['calle', 'urbano', 'espontáneo', 'street', 'personas'],
    difficulty: 'intermedio',
    color: '#0E0E08', accent: '#FFD54F',
    tripodRequired: false,
  },
  {
    id: 'amanecer-paisaje',
    title: 'Amanecer y Paisaje',
    subtitle: 'Primeras luces del día',
    description:
      'Las horas azul y dorada antes del amanecer ofrecen la luz más suave y dramática del día para fotografía de paisaje.',
    category: 'paisaje',
    emoji: '🌄',
    tags: ['amanecer', 'paisaje', 'hora azul', 'montaña', 'naturaleza'],
    difficulty: 'principiante',
    color: '#0A0518', accent: '#FF8A65',
    tripodRequired: true,
  },
  {
    id: 'fuegos-artificiales',
    title: 'Fuegos Artificiales',
    subtitle: 'Explosiones de color en el cielo',
    description:
      'Los fuegos artificiales son un reto técnico y artístico. Velocidades lentas para capturar las estelas luminosas.',
    category: 'noche',
    emoji: '🎆',
    tags: ['fuegos artificiales', 'noche', 'larga exposición', 'colores'],
    difficulty: 'intermedio',
    color: '#150505', accent: '#FF5252',
    tripodRequired: true,
  },
  {
    id: 'trafico-nocturno',
    title: 'Tráfico Nocturno',
    subtitle: 'Rastros de luces de coches',
    description:
      'Crea largas estelas de luces rojas y blancas de vehículos en movimiento. Una técnica clásica y siempre efectiva.',
    category: 'noche',
    emoji: '🚗',
    tags: ['tráfico', 'noche', 'coches', 'rastros de luz', 'ciudad'],
    difficulty: 'principiante',
    color: '#100A00', accent: '#FF7043',
    tripodRequired: true,
  },
  {
    id: 'boda-evento',
    title: 'Boda y Eventos',
    subtitle: 'Fotografía de celebraciones',
    description:
      'La fotografía de bodas combina retratos, acción y baja luz. Exige versatilidad y rapidez de reacción.',
    category: 'evento',
    emoji: '💍',
    tags: ['boda', 'evento', 'celebración', 'interior', 'baja luz'],
    difficulty: 'avanzado',
    color: '#150A05', accent: '#FFCC80',
    tripodRequired: false,
  },
  {
    id: 'retrato-luz-natural',
    title: 'Retrato Luz Natural',
    subtitle: 'Ventana y luz suave',
    description:
      'Utiliza la luz de ventana para crear retratos suaves y favorecedores. La técnica más accesible con resultados profesionales.',
    category: 'retrato',
    emoji: '🪟',
    tags: ['retrato', 'ventana', 'luz natural', 'suave', 'interior'],
    difficulty: 'principiante',
    color: '#0E0E08', accent: '#F9A825',
    tripodRequired: false,
  },
  {
    id: 'fauna-silvestre',
    title: 'Fauna Silvestre',
    subtitle: 'Animales en su entorno',
    description:
      'La fotografía de naturaleza exige teleobjetivos, paciencia y velocidades altas para congelar el movimiento animal.',
    category: 'accion',
    emoji: '🦁',
    tags: ['animales', 'naturaleza', 'wildlife', 'teleobjetivo', 'safari'],
    difficulty: 'avanzado',
    color: '#100E00', accent: '#A5D6A7',
    tripodRequired: false,
  },
  {
    id: 'arquitectura',
    title: 'Arquitectura',
    subtitle: 'Edificios y espacios',
    description:
      'Documenta edificios, interiores y espacios urbanos con atención a líneas, simetría y perspectiva.',
    category: 'arquitectura',
    emoji: '🏛️',
    tags: ['arquitectura', 'edificios', 'interior', 'perspectiva', 'urbano'],
    difficulty: 'principiante',
    color: '#0A080E', accent: '#90CAF9',
    tripodRequired: false,
  },
  {
    id: 'niebla-atmosfera',
    title: 'Niebla y Atmósfera',
    subtitle: 'Mística y misterio',
    description:
      'La niebla transforma paisajes ordinarios en escenas etéreas. Busca bosques, puentes o ciudades en días de niebla tempranera.',
    category: 'paisaje',
    emoji: '🌫️',
    tags: ['niebla', 'atmósfera', 'bosque', 'misterio', 'amanecer'],
    difficulty: 'principiante',
    color: '#0C0C0C', accent: '#B0BEC5',
    tripodRequired: false,
  },
];

export const getCategoryLabel = (cat: SceneCategory): string => {
  const labels: Record<SceneCategory, string> = {
    noche: 'Noche',
    paisaje: 'Paisaje',
    retrato: 'Retrato',
    accion: 'Acción',
    evento: 'Eventos',
    macro: 'Macro',
    calle: 'Calle',
    arquitectura: 'Arquitectura',
  };
  return labels[cat];
};

export const getDifficultyLabel = (d: Difficulty): string => {
  const labels: Record<Difficulty, string> = {
    principiante: 'Principiante',
    intermedio: 'Intermedio',
    avanzado: 'Avanzado',
  };
  return labels[d];
};

export const getDifficultyColor = (d: Difficulty): string => {
  const colors: Record<Difficulty, string> = {
    principiante: '#66BB6A',
    intermedio: '#FFA726',
    avanzado: '#EF5350',
  };
  return colors[d];
};

export const getSceneById = (id: string): Scene | undefined =>
  scenes.find((s) => s.id === id);

export const searchScenes = (query: string): Scene[] => {
  const q = query.toLowerCase().trim();
  if (!q) return scenes;
  return scenes.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.subtitle.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.includes(q))
  );
};
