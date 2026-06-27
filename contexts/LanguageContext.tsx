import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANG_KEY = 'frameup_language';

export type Lang = 'es' | 'en';

const translations = {
  es: {
    // Tab labels
    search:        'Buscar',
    scenes:        'Escenas',
    tools:         'Herramientas',
    favorites:     'Favoritos',
    goldenHour:    'Hora Dorada',
    community:     'Comunidad',
    about:         'Acerca de',
    // Screen headers
    appName:       'FrameUp',
    scenesLib:     'Biblioteca de Escenas',
    myFavorites:   'Mis Favoritos',
    goldenHourHeader: 'Hora Dorada',
    communityHeader:  'Comunidad',
    toolsHeader:      'Herramientas',
    // Buttons / common
    save:          'Guardar',
    cancel:        'Cancelar',
    export:        'Exportar',
    compare:       'Comparar',
    saved:         'Guardado',
    delete:        'Eliminar',
    back:          'Atrás',
    retry:         'Reintentar',
    close:         'Cerrar',
    add:           'Añadir',
    confirm:       'Confirmar',
    // About screen
    aboutTitle:    'Acerca de FrameUp',
    aboutTagline:  'La guía técnica del fotógrafo',
    appearance:    'Apariencia',
    darkMode:      'Modo Oscuro',
    lightMode:     'Modo Claro',
    language:      'Idioma',
    version:       'Versión',
    build:         'Build',
    createdAt:     'Creada el',
    createdBy:     'Creado por',
    rights:        'Todos los derechos reservados',
    // Guide
    guideTitle:    'Guía de usuario',
    guideSearch:   'Busca cualquier situación fotográfica con palabras naturales. FrameUp encuentra la escena más parecida.',
    guideScenes:   'Explora la biblioteca de 19 escenas organizadas por categoría: noche, retrato, paisaje, acción y más.',
    guideSettings: 'Selecciona tu cámara y obtén configuración exacta (apertura, velocidad, ISO) optimizada para tu sensor.',
    guideTools:    '7 herramientas técnicas: Triángulo de Exposición, Profundidad de Campo, Calculadora ND, Asesor de Lentes, Lector EXIF y Mi Equipo.',
    guideFavorites:'Guarda configuraciones que te funcionaron, con notas personales de hasta 500 caracteres.',
    guideGolden:   'Calcula la Hora Dorada, Hora Azul y otros 5 eventos solares para tu ubicación exacta, hoy y los próximos 7 días.',
    guideExport:   'Comparte cualquier configuración como imagen o texto desde la pantalla de ajustes.',
    guideCommunity:'Publica fotos con marca de agua FrameUp y solicita la versión original al fotógrafo.',
    // Settings
    cameraSettings: 'Configuración de cámara',
    proTips:        'Consejos profesionales',
    warnings:       'Ten en cuenta',
    selectCamera:   'Selecciona tu cámara para ver la configuración',
  },
  en: {
    search:        'Search',
    scenes:        'Scenes',
    tools:         'Tools',
    favorites:     'Favorites',
    goldenHour:    'Golden Hour',
    community:     'Community',
    about:         'About',
    appName:       'FrameUp',
    scenesLib:     'Scene Library',
    myFavorites:   'My Favorites',
    goldenHourHeader: 'Golden Hour',
    communityHeader:  'Community',
    toolsHeader:      'Tools',
    save:          'Save',
    cancel:        'Cancel',
    export:        'Export',
    compare:       'Compare',
    saved:         'Saved',
    delete:        'Delete',
    back:          'Back',
    retry:         'Retry',
    close:         'Close',
    add:           'Add',
    confirm:       'Confirm',
    aboutTitle:    'About FrameUp',
    aboutTagline:  "The photographer's technical guide",
    appearance:    'Appearance',
    darkMode:      'Dark Mode',
    lightMode:     'Light Mode',
    language:      'Language',
    version:       'Version',
    build:         'Build',
    createdAt:     'Created on',
    createdBy:     'Created by',
    rights:        'All rights reserved',
    guideTitle:    'User Guide',
    guideSearch:   'Search any photographic situation in plain language. FrameUp finds the closest matching scene.',
    guideScenes:   'Browse a library of 19 scenes organized by category: night, portrait, landscape, action and more.',
    guideSettings: 'Select your camera and get exact settings (aperture, speed, ISO) optimized for your sensor.',
    guideTools:    '7 technical tools: Exposure Triangle, Depth of Field, ND Calculator, Lens Advisor, EXIF Reader and My Gear.',
    guideFavorites:'Save configurations that worked for you, with personal notes up to 500 characters.',
    guideGolden:   'Calculate Golden Hour, Blue Hour and 5 other solar events for your exact location, today and the next 7 days.',
    guideExport:   'Share any configuration as an image or text from the settings screen.',
    guideCommunity:'Post watermarked photos and request the original version from the photographer.',
    cameraSettings: 'Camera settings',
    proTips:        'Pro tips',
    warnings:       'Keep in mind',
    selectCamera:   'Select your camera to view configuration',
  },
} as const;

export type Translations = typeof translations.es;

interface LangContextValue {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: 'es',
  t: translations.es,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    AsyncStorage.getItem(LANG_KEY).then((val) => {
      if (val === 'en' || val === 'es') setLangState(val);
    });
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem(LANG_KEY, l);
  };

  const value = useMemo<LangContextValue>(() => ({
    lang,
    t: translations[lang] as Translations,
    setLang,
  }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLanguage = () => useContext(LangContext);
