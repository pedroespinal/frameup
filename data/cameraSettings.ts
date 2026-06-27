import { SensorType } from './cameras';

export interface SettingValue {
  value: string;
  explanation: string;
}

export interface SceneSensorSettings {
  apertura: SettingValue;
  velocidad: SettingValue;
  iso: SettingValue;
  balanceBlancos: SettingValue;
  modoEnfoque: SettingValue;
  medicion: SettingValue;
  disparo: SettingValue;
  estabilizacion: SettingValue;
  formato: SettingValue;
  tips: string[];
  advertencias: string[];
}

export type SettingsBySensor = Record<SensorType, SceneSensorSettings>;

export interface SceneSettings {
  sceneId: string;
  settings: SettingsBySensor;
}

// ─────────────────────────────────────────────────────────────
// SETTINGS DATABASE
// ─────────────────────────────────────────────────────────────

const allSceneSettings: SceneSettings[] = [

  // ─── VÍA LÁCTEA / ASTROFOTOGRAFÍA ─────────────────────────
  {
    sceneId: 'astrofotografia',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/1.4 – f/2.8',    explanation: 'La apertura más amplia posible. Cada paso de diafragma duplica la luz que entra al sensor.' },
        velocidad:       { value: '10s – 25s',         explanation: 'Regla del 500: divide 500 entre la focal para evitar trazos de estrellas. Con 24mm → 20s máx.' },
        iso:             { value: '3200 – 12800',       explanation: 'Full frame aguanta bien hasta ISO 6400. La A7S III puede llegar a 25600 con ruido aceptable.' },
        balanceBlancos:  { value: '3800K – 4200K',     explanation: 'Temperatura personalizada. Evita el WB automático; cambia entre tomas y arruina el stack.' },
        modoEnfoque:     { value: 'Manual — Infinito', explanation: 'Enfoca a infinito manualmente usando LiveView ampliado al 100% en una estrella brillante.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'En modo Manual el medidor es orientativo. Confía en el histograma, no en el medidor.' },
        disparo:         { value: 'Temporizador 2s / Disparador remoto', explanation: 'Evita vibraciones al presionar el botón. Un disparador bluetooth es ideal.' },
        estabilizacion:  { value: 'IBIS/OSS desactivado', explanation: 'Con trípode, la estabilización puede causar micro-movimientos no deseados en exposiciones largas.' },
        formato:         { value: 'RAW obligatorio',   explanation: 'RAW captura 12-14 bits de rango dinámico. JPEG destruye información crítica para el procesado.' },
        tips: [
          'Usa la app PhotPills o Stellarium para planificar cuando la Vía Láctea está visible.',
          'Busca un lugar con índice Bortle 3 o menor (cielo oscuro). La app Dark Sky Finder ayuda.',
          'Enfría el sensor apagando la cámara 10 minutos antes si hace calor. Reduce el ruido térmico.',
          'Espera que tus ojos se adapten 20 minutos a la oscuridad antes de fotografiar.',
          'El apilado de varias tomas reduce el ruido drásticamente (técnica "Image Stacking").',
        ],
        advertencias: [
          'Luna llena o cuarto creciente arruina la sesión. Fotografía en luna nueva.',
          'La humedad y el rocío empañan el objetivo. Lleva una banda calefactora para lentes.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/1.4 – f/2.8',    explanation: 'Usa la focal real (ej. 16mm en APS-C = 24mm equivalente). El factor de crop también afecta la regla del tiempo.' },
        velocidad:       { value: '8s – 15s',          explanation: 'Regla del 500 ajustada: divide 500 entre (focal × 1.5). Con 16mm → 500/(16×1.5) = 20s. Reduce al 75% para más nitidez.' },
        iso:             { value: '1600 – 6400',        explanation: 'APS-C tiene 1-1.5 paradas más de ruido que full frame. X-H2S y A6700 son los mejores en APS-C.' },
        balanceBlancos:  { value: '3800K – 4200K',     explanation: 'Mismo principio que full frame. Fijalo manualmente para consistencia entre tomas.' },
        modoEnfoque:     { value: 'Manual — Infinito', explanation: 'LiveView al máximo zoom en una estrella brillante. Gira el anillo suavemente hasta el punto máximo de nitidez.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Usa el histograma como guía. Busca que los tonos oscuros estén ligeramente a la izquierda sin recortar.' },
        disparo:         { value: 'Temporizador 2s / Remoto', explanation: 'Imprescindible. Cualquier vibración se amplifica en la oscuridad con ISO alto.' },
        estabilizacion:  { value: 'IBIS desactivado con trípode', explanation: 'Si usas IBIS, desactívalo al usar trípode sólido para evitar micro-movimientos.' },
        formato:         { value: 'RAW obligatorio',   explanation: 'El procesado en Lightroom o Sequator para stacking requiere RAW sin compresión.' },
        tips: [
          'El factor de crop (×1.5 en APS-C) te da menor campo de visión: necesitas una focal más corta para el mismo encuadre.',
          'Fujifilm ofrece Film Simulations en JPEG, pero para astro siempre usa RAW + procesado manual.',
          'Una apertura f/2.8 en APS-C entra menos luz que f/2.8 en full frame para el mismo ángulo de visión. Compensa subiendo el ISO.',
          'Usa intervalómetro para stacking automático: 30-60 tomas de la misma escena.',
        ],
        advertencias: [
          'ISO 6400 en sensores APS-C de cámaras de entrada puede tener ruido muy prominente. Prueba en casa antes.',
          'Los lentes kit (f/3.5-5.6) son inadecuados para astro. Necesitas al menos f/2.8.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/1.2 – f/2.0',    explanation: 'M43 tiene factor de crop ×2. Necesitas focales reales cortas y aperturas muy amplias para compensar.' },
        velocidad:       { value: '5s – 10s',          explanation: 'Regla del 500 ajustada: 500/(focal × 2). Con 12mm → 500/(12×2) = 20s. Baja al 60% para alta resolución.' },
        iso:             { value: '800 – 3200',         explanation: 'M43 tiene mayor densidad de píxeles relativa, siendo más susceptible al ruido. Mantén ISO conservador.' },
        balanceBlancos:  { value: '3800K – 4200K',     explanation: 'Igual que otros sensores: fija el WB manualmente. Los Olympus y Panasonic tienen excelente WB personalizado.' },
        modoEnfoque:     { value: 'Manual — Infinito', explanation: 'El sistema de enfoque M43 es muy preciso, pero para astro siempre manual con ampliación de pantalla.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Histograma como guía principal. El IBIS del OM System es el mejor del mercado para minimizar vibraciones.' },
        disparo:         { value: 'Temporizador 2s / Remoto', explanation: 'El OM-1 Mark II tiene disparador inalámbrico incorporado por Bluetooth.' },
        estabilizacion:  { value: 'IBIS desactivado',  explanation: 'Con trípode, desactiva el IBIS. La excepción es el modo Trípode del OM System que lo detecta automáticamente.' },
        formato:         { value: 'RAW (ORF/RW2)',     explanation: 'Olympus ORF y Panasonic RW2 son totalmente compatibles con Lightroom y Capture One para procesado óptimo.' },
        tips: [
          'El OM-1 Mark II tiene modo "Astrotime-Lapse" nativo para star trails sin intervalómetro externo.',
          'La función Live Composite del OM System acumula la luz en tiempo real en pantalla: perfecta para star trails.',
          'M43 permite objetivos muy ligeros: el Laowa 7.5mm f/2 es ideal para astro con campo muy amplio.',
          'Para compensar el ruido adicional, apila más tomas: 60-100 imágenes dan excelentes resultados.',
        ],
        advertencias: [
          'A ISO 3200 en M43 el ruido de color puede ser prominente. Lightroom tiene muy buen soporte con AI Denoise.',
          'Evita ISO nativo bajo en cámaras Panasonic para astro; su dual-native ISO tiene el nativo bajo en 400 o 100.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/2.8 – f/4.0',    explanation: 'El sensor grande tiene gran profundidad de campo incluso en aperturas más cerradas. f/2.8 es ya muy luminoso.' },
        velocidad:       { value: '15s – 30s',         explanation: 'El factor de crop del GFX es 0.79× (mayor que full frame). Permite tiempos algo más largos antes de trazos.' },
        iso:             { value: '1600 – 6400',        explanation: 'El sensor de 100 Mpx del GFX tiene excelente rango dinámico pero su ISO alto no supera al de la A7S III.' },
        balanceBlancos:  { value: '3800K – 4200K',     explanation: 'Los 100 megapíxeles del GFX capturan detalles increíbles del cielo. Fija WB para consistencia en stacks.' },
        modoEnfoque:     { value: 'Manual — Infinito', explanation: 'La resolución extrema del GFX hace que el enfoque manual sea aún más crítico. Usa LiveView al máximo zoom.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'El histograma del GFX es muy preciso gracias a los 16 bits de profundidad de color del sensor.' },
        disparo:         { value: 'Temporizador 2s / Remoto', explanation: 'El espejo del GFX es electrónico: no hay vibración de espejo. Aun así, usa cable o temporizador.' },
        estabilizacion:  { value: 'IBIS desactivado con trípode', explanation: 'El GFX 100S II tiene excelente IBIS, pero desactívalo en trípode para máxima nitidez en largas exposiciones.' },
        formato:         { value: 'RAW 16-bit (RAF)',  explanation: 'Los 16 bits del GFX permiten recuperación extrema de sombras. Imprescindible para procesado astro de calidad.' },
        tips: [
          'El GFX ofrece resoluciones únicas para imprimir astrofotografía a gran formato. Perfecto para galerías.',
          'Con 100 Mpx, un campo de visión normal requiere un seguimiento de astro (mount tracker) para exposiciones largas.',
          'El tamaño del sensor GFX (44×33mm) capta más campo de visión que full frame con la misma focal.',
          'Considera un seguidor astronómico (iOptron SkyGuider Pro) para exposiciones sin trazos de estrellas a largo tiempo.',
        ],
        advertencias: [
          'El GFX es una cámara muy cara para exponer a condiciones extremas de frío/humedad sin protección.',
          'Los lentes Fujinon GF para astro son limitados: el GF 23mm f/4 es la opción más práctica.',
        ],
      },
    },
  },

  // ─── PAISAJE A LA LUZ DE LA LUNA ──────────────────────────
  {
    sceneId: 'luna-paisaje',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/2.8 – f/5.6',    explanation: 'Con luna llena hay suficiente luz para cerrar un poco el diafragma y ganar nitidez en todo el paisaje.' },
        velocidad:       { value: '2s – 30s',          explanation: 'La luna llena en su cénit ilumina como un amanecer suave. A luna baja, expón más tiempo.' },
        iso:             { value: '400 – 3200',         explanation: 'La luz de luna llena permite ISOs más bajos que la astrofotografía. Menor ruido, mayor calidad.' },
        balanceBlancos:  { value: '4500K – 5500K',     explanation: 'La luz de luna es reflejo del sol: temperatura neutra-fría. Daylight o ligeramente más cálido.' },
        modoEnfoque:     { value: 'AF-S / Manual',     explanation: 'Con luna llena hay suficiente contraste para que el AF funcione en puntos de contraste. Verifica siempre.' },
        medicion:        { value: 'Evaluativa',        explanation: 'La medición evaluativa funciona bien con la luna. Añade +1 EV de compensación si el paisaje sale oscuro.' },
        disparo:         { value: 'Temporizador 2s / Remoto', explanation: 'Trípode sólido y disparo sin toque. La luna se mueve y una exposición de 30s puede mostrar su trayecto.' },
        estabilizacion:  { value: 'IBIS desactivado',  explanation: 'Siempre trípode para paisaje nocturno. Desactiva IBIS con trípode.' },
        formato:         { value: 'RAW recomendado',   explanation: 'RAW permite ajustar el balance de blancos en post para conseguir ese tono azulado o cálido deseado.' },
        tips: [
          'La luna llena ilumina como 0.1 lux aproximadamente. Suficiente para paisajes bien expuestos.',
          'Incluye la propia luna en el encuadre o evítala deliberadamente para controlar la exposición.',
          'El reflejo de la luna en el agua (lago, río, mar) crea composiciones espectaculares.',
          'Usa la app PhotPills para saber exactamente dónde saldrá la luna y a qué hora.',
        ],
        advertencias: [
          'Si incluyes la luna en el encuadre, quedará sobreexpuesta en exposiciones largas. Considera exposición múltiple.',
          'Las nubes crean atmósferas increíbles pero también pueden tapar la luna inesperadamente.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/2.0 – f/4.0',    explanation: 'Un stop más abierto que full frame para compensar la diferencia de tamaño de sensor.' },
        velocidad:       { value: '2s – 20s',          explanation: 'Similar a full frame pero ajusta según el ISO resultante. Evita trazos de luna si está en encuadre.' },
        iso:             { value: '200 – 1600',         explanation: 'APS-C moderno (A6700, X-T5) maneja muy bien hasta ISO 1600 con resultados limpios.' },
        balanceBlancos:  { value: '4500K – 5500K',     explanation: 'Misma filosofía que full frame. La temperatura de color de la luna no depende del sensor.' },
        modoEnfoque:     { value: 'AF-S / Manual',     explanation: 'Con buena luz de luna el AF funciona. Usa un punto único y apunta a zonas de alto contraste.' },
        medicion:        { value: 'Evaluativa +0.7EV', explanation: 'Añade compensación de exposición positiva para evitar que la cámara oscurezca el paisaje lunar.' },
        disparo:         { value: 'Temporizador / Remoto', explanation: 'Trípode imprescindible. El peso de las cámaras APS-C hace más fácil estabilizar en trípode.' },
        estabilizacion:  { value: 'Desactivado con trípode', explanation: 'IBIS OFF con trípode en todos los sistemas APS-C modernos.' },
        formato:         { value: 'RAW recomendado',   explanation: 'RAW permite recuperar detalles de cielo y primer plano que JPEG sacrifica con alta compresión.' },
        tips: [
          'Los objetivos APS-C más luminosos (24mm f/1.8 Sony, 23mm f/1.4 Fuji) son perfectos para paisaje lunar.',
          'El factor de crop ×1.5 limita el campo de visión: considera un objetivo ultra gran angular (10-12mm real).',
        ],
        advertencias: [
          'ISO 3200 en APS-C puede ser ruidoso en sombras. Expón a la derecha del histograma (ETTR).',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/1.4 – f/2.8',    explanation: 'Necesitas aperturas más amplias para compensar el factor de crop ×2. Laowa 7.5mm f/2 o Olympus 12mm f/2.' },
        velocidad:       { value: '2s – 15s',          explanation: 'Con factor de crop doble, las focales son más largas en equivalencia: reduce el tiempo para evitar trazos.' },
        iso:             { value: '200 – 1600',         explanation: 'M43 requiere ISOs más conservadores pero el Live Composite del OM System permite exposición acumulativa sin ruido.' },
        balanceBlancos:  { value: '4500K – 5500K',     explanation: 'Temperatura neutra-fría. Los OM System tienen excelente calibración de WB para condiciones de luz natural nocturna.' },
        modoEnfoque:     { value: 'Manual',            explanation: 'La pantalla LiveView del OM System es excelente para verificar enfoque manual en condiciones de baja luz.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El medidor evaluativo M43 es muy preciso. Usa la función de previsualización de exposición en tiempo real.' },
        disparo:         { value: 'Temporizador / App Bluetooth', explanation: 'Olympus Air y OM System tienen apps móviles para disparo remoto sin cables.' },
        estabilizacion:  { value: 'IBIS Modo Trípode', explanation: 'El OM-1 detecta automáticamente el uso de trípode y ajusta el IBIS. Activa el modo Trípode si está disponible.' },
        formato:         { value: 'RAW (ORF)',         explanation: 'El formato ORF de Olympus/OM System tiene excelente soporte en Lightroom con muy buen rendimiento de ruido.' },
        tips: [
          'Live Composite del OM System es perfecto para paisaje lunar: va acumulando luz sin quemar highlights.',
          'Pro Capture del OM-1 captura hasta 35 frames anteriores al disparo: ideal para nubes sobre la luna.',
        ],
        advertencias: [
          'Los lentes M43 con apertura máxima f/3.5-5.6 no son adecuados para paisaje nocturno.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/4.0 – f/8.0',    explanation: 'El sensor grande del GFX permite cerrar más el diafragma manteniendo la nitidez con mucho menos ruido.' },
        velocidad:       { value: '2s – 60s',          explanation: 'El sensor más grande del GFX capta más luz: puedes exponer más tiempo con menos ruido relativo.' },
        iso:             { value: '100 – 800',          explanation: 'El ISO nativo bajo del GFX (ISO 100) da resultados puros extraordinarios bajo luz de luna.' },
        balanceBlancos:  { value: '4500K – 5500K',     explanation: 'Los 16 bits del GFX permiten ajustar el WB en post con gran libertad. Fijalo para consistencia.' },
        modoEnfoque:     { value: 'AF-S / Manual',     explanation: 'El AF del GFX funciona bien con luz de luna. El liveview tiene mucho detalle para verificar enfoque manual.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El medidor GFX es muy preciso. La resolución de 100Mpx captura detalles increíbles del paisaje iluminado.' },
        disparo:         { value: 'Temporizador / Tethering', explanation: 'El GFX soporta tethering a ordenador con Capture One para control y preview en tiempo real.' },
        estabilizacion:  { value: 'IBIS desactivado',  explanation: 'En trípode, siempre desactiva el IBIS del GFX 100S II para máxima nitidez en exposiciones largas.' },
        formato:         { value: 'RAW 16-bit (RAF)',  explanation: 'Los 16 bits y 100 megapíxeles del GFX son el estándar para impresiones de gran formato de paisaje.' },
        tips: [
          'El campo de visión del GFX es mayor que full frame: un 32mm GF equivale a 25mm en full frame.',
          'La resolución de 100Mpx permite crops masivos manteniendo calidad para imprimir.',
        ],
        advertencias: [
          'El peso del GFX con un trípode de calidad es considerable. Usa trípode de carbono con rotula de bola sólida.',
        ],
      },
    },
  },

  // ─── CIUDAD DE NOCHE ──────────────────────────────────────
  {
    sceneId: 'fotografia-nocturna-urbana',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/1.4 – f/2.8',    explanation: 'Apertura amplia para captar la máxima luz en la oscuridad urbana. El bokeh de las luces es un bonus artístico.' },
        velocidad:       { value: '1/30s – 1s',        explanation: 'Varía según la escena: calles iluminadas permiten 1/60s+. Con trípode ve a 1-4s para suavizar movimiento.' },
        iso:             { value: '1600 – 12800',       explanation: 'Full frame moderno aguanta ISO 6400 con muy buen resultado. La A7S III puede ir a 25600 si el 34mm.' },
        balanceBlancos:  { value: 'Auto (AWB) / Tungsten', explanation: 'AWB funciona bien en ciudad: compensa automáticamente las mezclas de luz. Prueba Tungsten (3200K) para tonos fríos.' },
        modoEnfoque:     { value: 'AF-C / AF-S',       explanation: 'AF continuo si hay personas en movimiento. AF single con AF-assist si hay poca luz.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El medidor evaluativo gestiona bien las altas luces urbanas. Usa compensación -1EV para preservar brillo.' },
        disparo:         { value: 'Individual / Ráfaga silenciosa', explanation: 'El modo silencioso (obturador electrónico) es ideal para fotografía callejera nocturna.' },
        estabilizacion:  { value: 'IBIS/OSS activado', explanation: 'Con IBIS puedes bajar a 1/15s o incluso 1/8s a mano alzada con objetivos estabilizados.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'RAW para el procesado. JPEG para revisar en el momento. La mayoría de cámaras permiten ambos simultáneo.' },
        tips: [
          'El asfalto mojado multiplica los reflejos de luz: fotografía después de la lluvia.',
          'Los neones y LEDs modernos pueden causar flicker en velocidades rápidas. Usa Anti-Flicker si tu cámara lo tiene.',
          'Las sombras profundas y los puntos de luz intensa crean el contraste dramático del noir urbano.',
          'Busca marcos naturales (arcos, puertas, ventanas) para encuadrar escenas urbanas nocturnas.',
        ],
        advertencias: [
          'A ISO muy alto, el ruido en las sombras puede ser muy visible. Expón a la derecha.',
          'Las luces de mercurio o sodio antiguas pueden causar dominantes de color difíciles de corregir.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/1.4 – f/2.8',    explanation: 'Máxima apertura disponible. Un 35mm f/1.8 en APS-C (52mm equiv.) es perfecto para street nocturna.' },
        velocidad:       { value: '1/60s – 1/125s',   explanation: 'Con IBIS activo puedes bajar a 1/30s. Sin estabilización, mantén 1/(focal equiv.) como mínimo.' },
        iso:             { value: '800 – 6400',         explanation: 'APS-C moderno aguanta bien 3200. Fujifilm X-H2S y Sony A6700 son los campeones en su clase.' },
        balanceBlancos:  { value: 'AWB / 3200K',       explanation: 'AWB funciona bien en ciudad. Prueba Tungsten para ese look cinematográfico frío.' },
        modoEnfoque:     { value: 'AF-C con eye-detection', explanation: 'Fujifilm y Sony APS-C tienen excelente eye-AF incluso en baja luz. Actívalo para retratos urbanos nocturnos.' },
        medicion:        { value: 'Evaluativa -0.7EV', explanation: 'Las luces urbanas pueden engañar al medidor. Ajusta compensación negativa para preservar las luces.' },
        disparo:         { value: 'Individual / Silencioso', explanation: 'El obturador electrónico silencioso del X100VI y otros es perfecto para fotografía discreta.' },
        estabilizacion:  { value: 'Activado',          explanation: 'El IBIS de APS-C moderno da 5-7 paradas de compensación. Crucial para mano alzada nocturna.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'Las Film Simulations de Fujifilm en JPEG son excelentes para el look noir. Mantén RAW como backup.' },
        tips: [
          'Las Film Simulations de Fujifilm (Acros, Classic Neg) son perfectas para el mood de la ciudad nocturna.',
          'El factor de crop ×1.5 da más "alcance" con teleobjetivos para capturar escenas lejanas.',
        ],
        advertencias: [
          'Sin IBIS (Canon R10, Nikon Z50 II), el límite práctico nocturno es ISO 3200 a 1/60s.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/1.2 – f/2.0',    explanation: 'Los lentes Olympus 17mm f/1.2 Pro y 25mm f/1.2 Pro son referencias para fotografía nocturna M43.' },
        velocidad:       { value: '1/60s – 1/125s',   explanation: 'El factor de crop ×2 significa que la 1/(focal real ×2) es el límite sin IBIS. El IBIS lo amplía mucho.' },
        iso:             { value: '400 – 3200',         explanation: 'M43 rinde mejor a ISO bajos. El Dual Gain Architecture del OM-1 Mark II mejora significativamente el ruido.' },
        balanceBlancos:  { value: 'AWB II / 3200K',    explanation: 'El AWB II del OM-1 Mark II es muy superior. Preserva los tonos cálidos de las luces urbanas mejor que la media.' },
        modoEnfoque:     { value: 'AF-C + face detection', explanation: 'El AF del OM-1 con detección de sujeto es excelente incluso en baja luz. Ideal para calle nocturna.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El medidor M43 moderno es preciso. La pantalla OLED del OM-1 muestra la exposición en tiempo real perfectamente.' },
        disparo:         { value: 'Silencioso (electrónico)', explanation: 'El obturador totalmente electrónico del OM-1 es 100% silencioso. Perfecto para calle discreta.' },
        estabilizacion:  { value: 'IBIS máximo activado', explanation: 'El IBIS del OM-1 Mark II (8.5 paradas) es el mejor del mercado. Crucial para nocturna a mano alzada.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'M43 se procesa muy bien en Lightroom con AI Denoise que recupera sombras incluso a ISO 3200.' },
        tips: [
          'El tamaño compacto del sistema M43 lo hace ideal para fotografía callejera: menos intimidante.',
          'Live ND del OM System permite largas exposiciones sin trípode en interiores urbanos.',
        ],
        advertencias: [
          'ISO 6400 en M43 tiene ruido significativo de color. Usa Lightroom AI Denoise o DxO PureRAW.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/2.8 – f/5.6',    explanation: 'El GFX captura luz de manera eficiente. f/2.8 da un bokeh muy pronunciado con el sensor grande.' },
        velocidad:       { value: '1/30s – 1/125s',   explanation: 'Con IBIS del GFX 100S II puedes bajar a 1/8s a mano alzada. Para la calle, mantén 1/60s+.' },
        iso:             { value: '800 – 6400',         explanation: 'El GFX tiene excelente rango dinámico en ISO bajos, pero su ISO alto no compite con la A7S III.' },
        balanceBlancos:  { value: 'AWB / Personalizado', explanation: 'Fujifilm tiene excelente calibración de color. AWB funciona bien en condiciones mixtas.' },
        modoEnfoque:     { value: 'AF-S',              explanation: 'El AF del GFX es más lento que el de cámaras deportivas. Adecuado para escenas no muy dinámicas.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El medidor del GFX maneja bien las luces urbanas gracias al enorme rango dinámico del sensor.' },
        disparo:         { value: 'Individual',        explanation: 'El GFX es más adecuado para fotografía deliberada y cuidadosa que para fotografía espontánea callejera.' },
        estabilizacion:  { value: 'IBIS activado',     explanation: 'El IBIS del GFX 100S II compensana el peso extra del cuerpo para exposiciones a mano alzada.' },
        formato:         { value: 'RAW 16-bit',        explanation: 'Los 100 Mpx del GFX capturan detalles de la ciudad nocturna imposibles con otras cámaras.' },
        tips: [
          'El GFX en la ciudad nocturna tiene un look único con su bokeh de sensor grande y alta resolución.',
          'La lente GF 50mm f/3.5 (40mm equiv.) es la más compacta y práctica para ciudad con el GFX.',
        ],
        advertencias: [
          'El GFX es una inversión cara para fotografía callejera donde el riesgo de daño es mayor.',
        ],
      },
    },
  },

  // ─── HORA DORADA RETRATOS ─────────────────────────────────
  {
    sceneId: 'hora-dorada-retrato',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/1.4 – f/2.8',    explanation: 'Apertura amplia para bokeh suave que aísla al sujeto del fondo dorado y desenfocado.' },
        velocidad:       { value: '1/200s – 1/1000s', explanation: 'Velocidad suficiente para congelar cualquier movimiento del sujeto. 1/500s es un buen punto de partida.' },
        iso:             { value: '100 – 400',          explanation: 'Con tanta luz cálida del atardecer, el ISO 100 nativo da la máxima calidad posible.' },
        balanceBlancos:  { value: 'Sombra (7000K–8000K)', explanation: 'El WB Sombra calienta los tonos y potencia los dorados del atardecer. Da esa piel bronceada preciosa.' },
        modoEnfoque:     { value: 'Eye-AF / AF-S',     explanation: 'Eye-AF en Sony, Canon y Nikon moderno es perfecto para retratos. Siempre el ojo del sujeto en foco.' },
        medicion:        { value: 'Evaluativa',        explanation: 'La medición evaluativa gestiona bien la luz de atardecer. Si el fondo es muy brillante, use medición puntual.' },
        disparo:         { value: 'Individual / Ráfaga lenta', explanation: 'Ráfaga de 3-5 fps captura las mejores expresiones. No necesitas alta velocidad de disparo.' },
        estabilizacion:  { value: 'Activado',          explanation: 'Con velocidades de 1/200s+ el IBIS no es crítico, pero actívalo siempre para seguridad.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'El RAW permite ajustar finamente los tonos de piel. El JPEG da un preview inmediato para el cliente.' },
        tips: [
          'Posiciona al sujeto con el sol de costado o ligeramente detrás para rim light natural.',
          'Llega 30 minutos antes del atardecer para preparar y encontrar el mejor ángulo de luz.',
          'Un reflector plateado/dorado llena sombras en la cara sin necesidad de flash.',
          'La hora dorada dura literalmente 15-30 minutos. Trabaja rápido y con todo preparado.',
          'El viento hace que el pelo vuele creativamente. No siempre es un error.',
        ],
        advertencias: [
          'Si el sol está directamente detrás del sujeto (contraluz), mide en la cara para no subexponer la piel.',
          'Las sombras se alargan rápidamente: lo que funciona en un minuto puede no funcionar en el siguiente.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/1.4 – f/2.8',    explanation: 'La misma apertura física da más profundidad de campo que en full frame. Para equivalencia, abre un stop más.' },
        velocidad:       { value: '1/200s – 1/1000s', explanation: 'Velocidades idénticas a full frame. La hora dorada tiene luz suficiente para congelar cualquier movimiento.' },
        iso:             { value: '100 – 400',          explanation: 'Con luz dorada abundante, ISO 100-200 da máxima calidad en APS-C. No necesitas más.' },
        balanceBlancos:  { value: 'Sombra (7000K–8000K)', explanation: 'Igual que full frame. Las Film Simulations de Fujifilm (Astia, Classic Chrome) son perfectas aquí.' },
        modoEnfoque:     { value: 'Eye-AF',            explanation: 'El Eye-AF de Sony A6700 y Canon R7 son excelentes. Fujifilm X-H2S tiene el mejor de su clase.' },
        medicion:        { value: 'Evaluativa',        explanation: 'La hora dorada tiene luz difusa y cálida: el medidor evaluativo funciona muy bien.' },
        disparo:         { value: 'Individual / Ráfaga', explanation: 'Ráfaga de 3-8 fps para capturar el mejor momento de expresión y movimiento.' },
        estabilizacion:  { value: 'Activado',          explanation: 'Con 1/200s+ el IBIS es redundante pero no hace daño activo.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'Fujifilm JPEG con Film Simulation es excelente directamente de cámara. Mantén RAW como backup.' },
        tips: [
          'El factor de crop te da más distancia focal: un 35mm f/1.4 en APS-C (52mm equiv.) es ideal para retrato.',
          'Las Film Simulations de Fujifilm (Eterna Cinema, Astia) en hora dorada son impresionantes.',
        ],
        advertencias: [
          'Con apertura f/1.4 y APS-C, la profundidad de campo es mayor que en full frame. Comprueba el bokeh del fondo.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/1.2 – f/2.0',    explanation: 'Para conseguir bokeh parecido a full frame en M43 necesitas aperturas f/0.95 o f/1.2. El Olympus 75mm f/1.8 es fantástico para retrato.' },
        velocidad:       { value: '1/200s – 1/1000s', explanation: 'Las mismas velocidades que otros sensores. Con luz dorada hay suficiente para congelar bien el movimiento.' },
        iso:             { value: '100 – 400',          explanation: 'A la hora dorada hay tanta luz que ISO 100-200 es perfectamente posible con cualquier sensor.' },
        balanceBlancos:  { value: 'Sombra (7000K)',    explanation: 'El WB de sombra potencia los tonos dorados. Olympus y Panasonic tienen excelente reproducción de tonos piel.' },
        modoEnfoque:     { value: 'Eye-AF / Face detect', explanation: 'El AF de OM-1 Mark II con detección de ojos es muy preciso y rápido para retratos en exteriores.' },
        medicion:        { value: 'Evaluativa',        explanation: 'La medición evaluativa M43 maneja bien la luz de atardecer. Confía en ella con pequeñas compensaciones.' },
        disparo:         { value: 'Individual / Ráfaga', explanation: 'El OM-1 puede disparar hasta 120 fps en modo silencioso: más que suficiente para capturar expresiones.' },
        estabilizacion:  { value: 'Activado',          explanation: 'El IBIS del OM-1 Mark II ayuda incluso a 1/200s en condiciones de mano inestable.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'OM System tiene excelente procesado de JPEG en cámara. RAW con Olympus Workspace o Lightroom es muy flexible.' },
        tips: [
          'El 75mm f/1.8 Olympus (150mm equiv.) es uno de los mejores objetivos de retrato relación calidad-precio.',
          'El sistema M43 es compacto y discreto: perfecto para sesiones de calle y exteriores dinámicos.',
        ],
        advertencias: [
          'El bokeh M43 con f/2.8 se parece al f/5.6 de full frame: si buscas fondo muy desenfocado, necesitas f/1.2.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/2.8 – f/4.0',    explanation: 'El GFX a f/2.8 tiene un bokeh extraordinario con el sensor grande. f/4 aún da fondos muy suaves.' },
        velocidad:       { value: '1/200s – 1/500s',  explanation: 'Velocidades estándar para retrato. El GFX tiene velocidad de sincronización flash de 1/4000s con flash electrónico.' },
        iso:             { value: '100 – 400',          explanation: 'ISO 100 en el GFX es el nativo y da la mejor calidad posible. Absolutamente impresionante para retratos.' },
        balanceBlancos:  { value: 'Sombra / Personalizado', explanation: 'Los 16 bits del GFX permiten ajustar el WB en post con una flexibilidad que no tiene parangón.' },
        modoEnfoque:     { value: 'Face/Eye-AF',       explanation: 'Fujifilm GFX tiene buen AF de cara aunque más lento que las mirrorless deportivas. Suficiente para retrato.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El medidor del GFX es preciso. Para retrato contraluz, usa medición puntual en la piel del sujeto.' },
        disparo:         { value: 'Individual',        explanation: 'El GFX invita a trabajar despacio y con cuidado. Cada toma es una decisión consciente y deliberada.' },
        estabilizacion:  { value: 'Activado',          explanation: 'El IBIS del GFX 100S II ayuda a mantener la nitidez en las tomas de retrato a mano alzada.' },
        formato:         { value: 'RAW 16-bit',        explanation: 'Los retratos GFX a 100 Mpx y 16 bits tienen un nivel de detalle y gama tonal imposible con otras cámaras.' },
        tips: [
          'El GFX para retrato de moda en hora dorada es una combinación excepcional: quality-over-quantity.',
          'La lente GF 110mm f/2 (87mm equiv.) es la referencia absoluta para retratos con el GFX.',
          'Reduce los tiempos de sesión: 100 Mpx requieren más tiempo de procesado y mayor tarjeta CFexpress.',
        ],
        advertencias: [
          'El GFX pesa más que las mirrorless convencionales: sesiones largas a pulso pueden ser cansadoras.',
        ],
      },
    },
  },

  // ─── CASCADAS Y RÍOS ──────────────────────────────────────
  {
    sceneId: 'cascadas-agua',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/8 – f/16',        explanation: 'Cierra el diafragma para reducir la luz y poder usar velocidades lentas incluso sin filtro ND.' },
        velocidad:       { value: '0.5s – 8s',         explanation: 'Varía el tiempo: 0.5s preserva textura del agua, 4-8s la convierte en seda pura.' },
        iso:             { value: 'ISO 50 – 200',       explanation: 'ISO mínimo posible para reducir la luz al máximo. Muchas cámaras tienen ISO 50 extendido.' },
        balanceBlancos:  { value: 'Daylight (5500K)',  explanation: 'La luz natural de día es la referencia. Ajusta ligeramente si hay sombra o cielo cubierto.' },
        modoEnfoque:     { value: 'AF-S / Manual',     explanation: 'La cámara en trípode y el agua en movimiento: enfoca en la roca o el entorno estático, no el agua.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El agua en movimiento puede engañar al medidor. Confía en el histograma para verificar la exposición.' },
        disparo:         { value: 'Temporizador 2s / Remoto', explanation: 'Con velocidades de varios segundos, cualquier toque a la cámara arruina la nitidez del entorno.' },
        estabilizacion:  { value: 'IBIS desactivado',  explanation: 'Siempre trípode para larga exposición. IBIS desactivado para evitar movimientos del sistema de estabilización.' },
        formato:         { value: 'RAW recomendado',   explanation: 'El rango dinámico de la escena (sombras oscuras + agua brillante) requiere RAW para recuperar detalles.' },
        tips: [
          'Un filtro ND de 6-10 paradas te permite exposiciones largas incluso a plena luz del día.',
          'Busca rocas, hojas o flores en primer plano para dar profundidad y contexto a la cascada.',
          'El modo de disparo "Bulb" permite exposiciones de cualquier duración con el disparador remoto.',
          'Días nublados dan luz difusa perfecta: sin sombras duras y mayor rango dinámico.',
          'La dirección del flujo de agua determina el encuadre: sigue su movimiento natural.',
        ],
        advertencias: [
          'f/16 o más pequeño puede introducir difracción y pérdida de nitidez en sensores de alta resolución.',
          'La humedad de las cascadas puede empañar el objetivo. Lleva un paño de microfibra.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/8 – f/16',        explanation: 'Misma lógica que full frame. El punto de difracción en APS-C es ligeramente diferente según el sensor.' },
        velocidad:       { value: '0.5s – 8s',         explanation: 'Las velocidades de larga exposición no dependen del sensor sino de la cantidad de luz disponible.' },
        iso:             { value: 'ISO 50 – 200',       explanation: 'Muchas cámaras APS-C modernas tienen ISO 50 o ISO 100 extendido. Úsalo siempre para larga exposición.' },
        balanceBlancos:  { value: 'Daylight (5500K)',  explanation: 'Luz de día natural para el entorno de la cascada. Ajusta si hay vegetación verde dominante.' },
        modoEnfoque:     { value: 'AF-S / Manual',     explanation: 'Enfoca con cuidado en el entorno estático. Verifica con LiveView al 100% de zoom.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El medidor evaluativo es suficiente. Usa el histograma siempre para verificar.' },
        disparo:         { value: 'Temporizador 2s',   explanation: 'Con el trípode bien estabilizado, 2 segundos de retardo son suficientes para eliminar vibraciones.' },
        estabilizacion:  { value: 'Desactivado',       explanation: 'Siempre desactiva el IBIS/IS con trípode en exposiciones largas.' },
        formato:         { value: 'RAW',               explanation: 'El contraste entre agua, rocas y vegetación requiere el rango dinámico del RAW para el procesado.' },
        tips: [
          'Un filtro polarizador reduce reflejos en el agua y la vegetación, aumentando la saturación y contraste.',
          'Combina el polarizador con ND para mayor control de la exposición.',
        ],
        advertencias: [
          'Con factores de difracción APS-C, f/16 puede mostrar pérdida de nitidez. Testa tu cámara entre f/8 y f/11.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/5.6 – f/11',      explanation: 'En M43 el punto de difracción llega antes. Evita f/16 o más cerrado para mantener nitidez.' },
        velocidad:       { value: '0.5s – 8s',         explanation: 'Mismas velocidades que otros sistemas. La luz disponible determina el tiempo, no el sensor.' },
        iso:             { value: 'ISO 100 – 200',      explanation: 'ISO 100 nativo da máxima calidad. El Live ND del OM System permite larga exposición sin filtros físicos.' },
        balanceBlancos:  { value: 'Daylight (5500K)',  explanation: 'Standard para exteriores de día. El procesado de color de OM System en paisaje es muy fiel.' },
        modoEnfoque:     { value: 'Manual',            explanation: 'Trípode y paisaje estático: enfoque manual para máximo control y verificación al 100% en LiveView.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El OM-1 tiene excelente medición evaluativa multi-zona. Muy preciso para escenas de alto contraste.' },
        disparo:         { value: 'Temporizador 2s',   explanation: 'Estándar para larga exposición. El sistema de estabilización del OM-1 incluso detecta el modo trípode.' },
        estabilizacion:  { value: 'Modo Trípode (OM System)', explanation: 'El OM-1 Mark II tiene detección automática de trípode y ajusta el IBIS en consecuencia.' },
        formato:         { value: 'RAW (ORF)',         explanation: 'El procesado RAW de Olympus en Lightroom conserva excelentes detalles de sombras y altas luces.' },
        tips: [
          '¡El Live ND del OM System es una revolución! Simula filtros ND de 2, 4, 8, 16, 32 y hasta 64 paradas sin filtros físicos.',
          'Pro Capture en el OM-1 captura frames anteriores al disparo: útil para el momento exacto de un salto de agua.',
        ],
        advertencias: [
          'La difracción en M43 comienza significativamente a partir de f/11. Prueba f/8 como máximo cierre.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/8 – f/16',        explanation: 'El sensor grande del GFX tiene menor difracción relativa. f/16 sigue siendo usable con buena nitidez.' },
        velocidad:       { value: '0.5s – 30s',        explanation: 'Con el ISO mínimo del GFX (ISO 50 extendido) y f/16, puedes conseguir exposiciones muy largas.' },
        iso:             { value: 'ISO 50 – 100',       explanation: 'El ISO 100 nativo del GFX da el máximo rango dinámico posible para procesar el contraste del agua.' },
        balanceBlancos:  { value: 'Daylight (5500K)',  explanation: 'La fidelidad de color del GFX es excepcional. Daylight como punto de partida en exteriores de día.' },
        modoEnfoque:     { value: 'Manual',            explanation: '100 Mpx demanda un enfoque perfecto. Manual con LiveView ampliado al máximo es la única opción seria.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El medidor del GFX tiene en cuenta el rango dinámico extraordinario del sensor de 100 Mpx.' },
        disparo:         { value: 'Temporizador / Tethering', explanation: 'Con tethering a Capture One, ves cada toma en pantalla grande en tiempo real. Perfecto para paisaje.' },
        estabilizacion:  { value: 'Desactivado',       explanation: 'Trípode sólido y IBIS desactivado. El GFX en trípode con cable remoto es la configuración definitiva para paisaje.' },
        formato:         { value: 'RAW 16-bit',        explanation: 'Los 100 Mpx y 16 bits del GFX capturan cada gota y piedra con un nivel de detalle increíble.' },
        tips: [
          'El GFX para paisaje de cascadas es insuperable en calidad: impresiones de gran formato absolutamente impresionantes.',
          'Usa un trípode de carbono resistente: el GFX con un objetivo grande pesa considerablemente.',
        ],
        advertencias: [
          'A 100 Mpx, cualquier vibración es evidente. Usa trípode de calidad profesional (Really Right Stuff, Gitzo).',
        ],
      },
    },
  },

  // ─── DEPORTES Y ACCIÓN ────────────────────────────────────
  {
    sceneId: 'deportes-accion',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/2.8 – f/5.6',    explanation: 'f/2.8-4 en teleobjetivos luminosos. Equilibrio entre velocidad de obturación alta y suficiente nitidez.' },
        velocidad:       { value: '1/1000s – 1/4000s', explanation: '1/1000s congela atletas. 1/2000s congela sprints. 1/4000s congela balones en el aire.' },
        iso:             { value: 'Auto ISO 400–6400', explanation: 'Usa Auto ISO con límite máximo según tu cámara. Prioridad de velocidad de obturación (Tv/S).' },
        balanceBlancos:  { value: 'AWB / Daylight',   explanation: 'AWB para interiores con luz mixta. Daylight para exteriores. Exterior nublado: Nublado (6500K).' },
        modoEnfoque:     { value: 'AF-C + Tracking',  explanation: 'AF continuo con seguimiento de sujeto/deportista. Sony Real-time Tracking, Canon iTR, Nikon 3D son los mejores.' },
        medicion:        { value: 'Evaluativa / Puntual', explanation: 'Evaluativa para la mayoría de escenas. Puntual si el atleta está contra un fondo muy brillante.' },
        disparo:         { value: 'Ráfaga alta (10-30fps)', explanation: 'El A9 III y EOS R1 disparar 120fps. Más tomas = más probabilidad de capturar el momento decisivo.' },
        estabilizacion:  { value: 'Activado (modo deporte)', explanation: 'Activa IBIS en modo Deporte/Movimiento para compensar el movimiento del fotógrafo sin hundir el seguimiento.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'JPEG para entrega rápida, RAW para procesado detallado. Muchos fotoperiodistas usan solo JPEG para velocidad.' },
        tips: [
          'Anticipa el movimiento: posiciónate donde el atleta pasará, no donde está ahora.',
          'El panning (seguimiento del sujeto en movimiento) crea una sensación de velocidad muy impactante.',
          'Conoce el deporte que fotografías: saber cuándo va a ocurrir el momento decisivo es clave.',
          'Una montura o teleobjetivo de calidad es tan importante como la cámara. 70-200 f/2.8 es el estándar.',
          'Usa la pantalla trasera inclinada para fotografiar desde ángulos bajos sin arrodillarte constantemente.',
        ],
        advertencias: [
          'En recintos con luz artificial (estadios), el flicker de las lámparas de mercurio/haluro afecta la exposición. Usa Anti-Flicker.',
          'Las ráfagas de 120fps llenan tarjetas rápidamente y requieren tarjetas CFexpress de alta velocidad.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/2.8 – f/5.6',    explanation: 'El factor de crop ×1.5 en APS-C multiplica el alcance del teleobjetivo: 300mm real = 450mm equiv. Ventaja en deporte.' },
        velocidad:       { value: '1/1000s – 1/4000s', explanation: 'Las mismas velocidades que full frame para congelar el movimiento. No depende del sensor.' },
        iso:             { value: 'Auto ISO 400–3200', explanation: 'APS-C moderno aguanta 3200 muy bien. Fujifilm X-H2S tiene el mejor rango dinámico en su clase para deporte.' },
        balanceBlancos:  { value: 'AWB / Daylight',   explanation: 'Igual que full frame. El AWB moderno de APS-C es muy preciso en condiciones de cambios rápidos.' },
        modoEnfoque:     { value: 'AF-C + Subject Recognition', explanation: 'El AF de Sony A6700 y Canon R7 reconoce coches, pájaros, deportistas. Activa el modo apropiado.' },
        medicion:        { value: 'Evaluativa',        explanation: 'La medición evaluativa con los sistemas de reconocimiento de sujeto modernos es muy precisa.' },
        disparo:         { value: 'Ráfaga alta (8-30fps)', explanation: 'El A6700 dispara 11fps mecánico, 120fps electrónico. El R7 hace 30fps. Suficiente para cualquier deporte.' },
        estabilizacion:  { value: 'Activado (Deporte)', explanation: 'IBIS activo en modo deporte/movimiento. El A6700 y X-H2S tienen excelente IBIS para su tamaño.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'Film Simulations de Fujifilm en JPEG son perfectas para entrega inmediata con aspecto cinematográfico.' },
        tips: [
          'El factor de crop ×1.5 convierte tu 200mm en 300mm equivalente: ¡ventaja real para deporte sin invertir en super-teleobjetivos!',
          'El tamaño más compacto de APS-C facilita el movimiento rápido para el fotógrafo en eventos.',
        ],
        advertencias: [
          'En estadios con luz deficiente, APS-C puede quedar corto con ISO 3200. Evalúa antes del evento.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/2.8 – f/4.0',    explanation: 'Factor de crop ×2 en M43: un 150mm real equivale a 300mm. El sistema M43 es ideal para alcance en deporte con lentes más pequeños.' },
        velocidad:       { value: '1/1000s – 1/4000s', explanation: 'Las mismas velocidades para congelar el movimiento. El OM-1 Mark II tiene obturador mecánico hasta 1/8000s.' },
        iso:             { value: 'Auto ISO 200–3200', explanation: 'M43 requiere ISO más conservador que full frame. El OM-1 Mark II tiene la mejor relación ruido/resolución del sistema.' },
        balanceBlancos:  { value: 'AWB II',            explanation: 'El AWB II del OM-1 Mark II es uno de los mejores del mercado, perfecto para condiciones de iluminación variables.' },
        modoEnfoque:     { value: 'AF-C + Bird/Animal AI', explanation: 'El OM-1 Mark II tiene detección de pájaros (incluso en vuelo) con un 90% de acierto. Excelente para fauna y deporte.' },
        medicion:        { value: 'Evaluativa',        explanation: 'El OM-1 Mark II tiene medición evaluativa muy precisa incluso en condiciones de alto contraste.' },
        disparo:         { value: 'Ráfaga 120fps (Pro Capture)', explanation: 'Pro Capture del OM-1 graba los 35 frames ANTERIORES al disparo. Nunca perderás el momento decisivo.' },
        estabilizacion:  { value: 'IBIS + E-IS combinado', explanation: 'La combinación IBIS + Lens IS del OM-1 da hasta 8.5 paradas de compensación. Sin igual en el mercado.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'El OM-1 puede procesar JPEG con Picture Modes excelentes a alta velocidad. RAW para procesado posterior.' },
        tips: [
          'El sistema M43 pesa menos: un 300mm f/4 M43 pesa la mitad que su equivalente full frame. Ventaja ergonómica real para el fotógrafo de deporte.',
          'Pro Capture High: 50fps con pre-captura de 35 frames. Imposible perder el gol, el salto, el impacto.',
          'El Olympus/OM System 40-150mm f/2.8 (80-300mm equiv.) con el TC-2x da 600mm equiv.: alcance increíble.',
        ],
        advertencias: [
          'ISO 3200 en M43 puede mostrar ruido en sombras. Prefiere la velocidad de disparo a la profundidad de campo.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/2.8 – f/4.0',    explanation: 'El GFX no es ideal para deportes por su AF más lento y menor velocidad de disparo. f/2.8 si usas el 80mm f/1.7.' },
        velocidad:       { value: '1/500s – 1/2000s', explanation: 'El GFX tiene obturador de 1/4000s. Suficiente para congelar movimiento moderado, no para deporte extremo.' },
        iso:             { value: 'Auto ISO 400–3200', explanation: 'El GFX tiene buen rendimiento hasta ISO 3200 aunque no es su punto fuerte para alta velocidad.' },
        balanceBlancos:  { value: 'AWB',               explanation: 'AWB en el GFX es preciso. Para entornos variables de deporte es lo más práctico.' },
        modoEnfoque:     { value: 'AF-C + Face/Eye',   explanation: 'El AF del GFX es bueno para sujetos en movimiento moderado pero no para deporte de alta velocidad.' },
        medicion:        { value: 'Evaluativa',        explanation: 'Medición evaluativa estándar. El GFX es más adecuado para retrato de deportistas que para acción pura.' },
        disparo:         { value: 'Ráfaga 5fps',       explanation: 'El GFX dispara a 5fps. Suficiente para momentos deportivos selectivos pero no para cobertura continua.' },
        estabilizacion:  { value: 'Activado',          explanation: 'El IBIS del GFX 100S II da hasta 8 paradas en foto estática. En deporte, activa el modo panorámica horizontal.' },
        formato:         { value: 'RAW 16-bit',        explanation: 'Para un retrato de deportista en estudio post-evento, el GFX da calidad inigualable.' },
        tips: [
          'El GFX es más adecuado para fotografía deportiva de posado o ambiente que para acción pura.',
          'Úsalo en los descansos o en los momentos previos/posteriores al partido para retratos de alta calidad.',
        ],
        advertencias: [
          'El buffer del GFX se llena rápidamente a 5fps con archivos de 100Mpx. No es cámara para ráfagas largas.',
        ],
      },
    },
  },

  // ─── FUEGOS ARTIFICIALES ──────────────────────────────────
  {
    sceneId: 'fuegos-artificiales',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/8 – f/11',        explanation: 'Apertura media para mayor nitidez y campo. Los fuegos artificiales son brillantes: no necesitas apertura amplia.' },
        velocidad:       { value: '2s – 6s (Bulb)',    explanation: 'Exposición larga para capturar las estelas completas. Bulb con disparador remoto para control total.' },
        iso:             { value: '100 – 400',          explanation: 'Los fuegos son muy brillantes. ISO 100 evita sobreexposición y da máxima calidad.' },
        balanceBlancos:  { value: 'Daylight / Personalizado (3500K)', explanation: 'Daylight preserva los colores reales. 3500K da colores más saturados y vibrantes.' },
        modoEnfoque:     { value: 'Manual — Infinito', explanation: 'Enfoca manualmente al infinito o a la distancia donde explotan los fuegos. AF puede fallar.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Usa modo Manual. El medidor no sabe medir fuegos artificiales: confía en el histograma tras cada toma.' },
        disparo:         { value: 'Bulb + Disparador remoto', explanation: 'Bulb permite controlar exactamente cuando capturar: abre cuando sube el cohete, cierra después de la explosión.' },
        estabilizacion:  { value: 'IBIS desactivado',  explanation: 'Trípode obligatorio. Desactiva IBIS para evitar movimientos no deseados en la larga exposición.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'Los colores vibrantes de los fuegos se benefician del procesado RAW para ajustar saturación y balance.' },
        tips: [
          'Llega temprano para elegir la mejor posición y encuadrar la zona donde explotan los fuegos.',
          'Incluye un elemento en el primer plano (puente, multitud, edificio) para dar escala y contexto.',
          'Usa una cartulina negra o tapa del objetivo para acumular múltiples explosiones en una sola toma (técnica de ocultación).',
          'Modo Bulb: abre el obturador cuando ves el cohete subir y ciérralo después de la explosión completa.',
        ],
        advertencias: [
          'El humo acumulado al final del espectáculo reduce la calidad. Las mejores tomas son al principio.',
          'La exposición es complicada con fuegos sobre agua: el reflejo puede sobreexponer. Reduce 1 stop.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/8 – f/11',        explanation: 'Mismas reglas que full frame. La apertura no depende del sensor para fuegos artificiales.' },
        velocidad:       { value: '2s – 6s (Bulb)',    explanation: 'Los tiempos de exposición para fuegos no dependen del sensor.' },
        iso:             { value: '100 – 400',          explanation: 'ISO mínimo para máxima calidad. Los fuegos son muy brillantes, no necesitas ISO alto.' },
        balanceBlancos:  { value: 'Daylight / 3500K',  explanation: 'Misma temperatura que full frame.' },
        modoEnfoque:     { value: 'Manual — Infinito', explanation: 'Manual al infinito en todos los sistemas.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Manual con histograma como guía.' },
        disparo:         { value: 'Bulb + Remoto',     explanation: 'Bulb es universal en todas las cámaras APS-C profesionales.' },
        estabilizacion:  { value: 'Desactivado',       explanation: 'Trípode + IBIS desactivado siempre en larga exposición.' },
        formato:         { value: 'RAW',               explanation: 'RAW para máximo control del color en post-procesado.' },
        tips: [
          'El factor de crop ×1.5 puede ser una ventaja: más "zoom" con el mismo teleobjetivo para detalle de los fuegos.',
        ],
        advertencias: [
          'Con trípode y velocidades largas, el viento puede mover ligeramente el trípode. Usa pesos en el gancho central.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/5.6 – f/8',       explanation: 'En M43, f/8 ya puede introducir difracción ligera. Usa f/5.6 para máxima nitidez.' },
        velocidad:       { value: '2s – 6s (Bulb)',    explanation: 'Live Composite del OM System permite acumular fuegos en tiempo real en la pantalla: ideal para esta situación.' },
        iso:             { value: '100 – 200',          explanation: 'ISO mínimo del sistema. El M43 no necesita ISO alto para fuegos artificiales.' },
        balanceBlancos:  { value: 'Daylight / 3500K',  explanation: 'Misma temperatura que otros sistemas.' },
        modoEnfoque:     { value: 'Manual',            explanation: 'Igual que todos los sistemas: manual al infinito.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Live View del OM System muestra en tiempo real la exposición acumulada.' },
        disparo:         { value: 'Live Composite (OM System)', explanation: '¡Live Composite es perfecto para fuegos artificiales! Acumula sólo los píxeles más brillantes en tiempo real, sin sobreexponer.' },
        estabilizacion:  { value: 'Desactivado / Modo Trípode', explanation: 'Modo Trípode del OM System detecta automáticamente y optimiza el sistema.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'Live Composite genera un JPEG en tiempo real; guarda el RAW para procesado final.' },
        tips: [
          'Live Composite del OM-1 Mark II es la función definitiva para fuegos: ve el resultado final mientras se construye.',
          'Usando Live Composite, puedes hacer sesiones de varios minutos sin sobreexponer: resultado espectacular.',
        ],
        advertencias: [
          'La difracción en M43 a f/11 o más puede ser visible a 100%. Usa f/5.6-8 máximo.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/8 – f/11',        explanation: 'El sensor grande del GFX aguanta mejor la difracción. f/11 sigue siendo nítido con el GFX.' },
        velocidad:       { value: '2s – 8s (Bulb)',    explanation: 'Bulb estándar. El GFX tiene disparador electrónico preciso para control exacto del tiempo.' },
        iso:             { value: 'ISO 100',           explanation: 'ISO nativo 100 del GFX para la máxima calidad. Los fuegos son brillantes, no necesitas más.' },
        balanceBlancos:  { value: 'Daylight / 3500K',  explanation: 'Los 16 bits del GFX permiten ajuste de WB en post con total libertad.' },
        modoEnfoque:     { value: 'Manual',            explanation: 'Manual al infinito verificado en LiveView del GFX.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Manual con histograma. Los RAW de 100Mpx del GFX tienen un rango dinámico excepcional.' },
        disparo:         { value: 'Bulb + Cable remoto', explanation: 'Cable o control remoto Fujifilm RR-100. El Bulb del GFX funciona perfectamente con cable remoto.' },
        estabilizacion:  { value: 'Desactivado',       explanation: 'Trípode profesional y IBIS desactivado para máxima nitidez con el GFX.' },
        formato:         { value: 'RAW 16-bit',        explanation: 'Los 100 Mpx del GFX capturan los fuegos con un nivel de detalle y gama de color sin igual.' },
        tips: [
          'Una foto de fuegos artificiales con el GFX impresa en gran formato es absolutamente espectacular.',
          'Usa trípode de carbono profesional: el peso del GFX requiere un trípode muy estable.',
        ],
        advertencias: [
          'El buffer del GFX es lento para ráfagas: para Bulb está bien, pero evita disparos continuos.',
        ],
      },
    },
  },

  // ─── TRÁFICO NOCTURNO ─────────────────────────────────────
  {
    sceneId: 'trafico-nocturno',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/8 – f/11',        explanation: 'Apertura media para obtener mayor nitidez y estrellas en los puntos de luz (star burst effect).' },
        velocidad:       { value: '8s – 30s',          explanation: 'Cuanto más largo el tiempo, más largas las estelas de luz. 20-30s es el estándar clásico.' },
        iso:             { value: 'ISO 100 – 400',      explanation: 'ISO bajo para máxima calidad y reducción de ruido en los fondos oscuros.' },
        balanceBlancos:  { value: 'Tungsten (3200K) / AWB', explanation: 'Tungsten da ese look cinematográfico azulado. AWB da los colores reales de la ciudad.' },
        modoEnfoque:     { value: 'Manual / AF-S',     explanation: 'Enfoca en el asfalto o las marcas viales antes de que pasen los coches. Confirma con LiveView.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Manual. El tráfico variable hace imposible la medición automática. Histograma como guía.' },
        disparo:         { value: 'Bulb / Temporizador / Remoto', explanation: 'Temporizador para evitar vibración. Remoto para control exacto del tiempo de exposición.' },
        estabilizacion:  { value: 'IBIS desactivado',  explanation: 'Trípode sólido. IBIS desactivado siempre en exposiciones de varios segundos.' },
        formato:         { value: 'RAW recomendado',   explanation: 'RAW permite ajustar el balance entre las estelas de luz y el ambiente urbano en post.' },
        tips: [
          'Busca carreteras con curvas, puentes o perspectivas convergentes para máximo impacto visual.',
          'La lluvia multiplica los reflejos en el asfalto: fotografía después de la lluvia para mayor riqueza visual.',
          'Las horas punta tienen más tráfico y más estelas. El tráfico nocturno tardío da estelas más largas y dispersas.',
          'Incluye elementos arquitectónicos (puentes, fachadas) para contextualizar las estelas de luz.',
          'Apertura f/11 crea el efecto "sunstar" en los puntos de luz: las farolas se convierten en estrellas.',
        ],
        advertencias: [
          'Los coches en sentido contrario pueden iluminar partes del encuadre que no quieres. Planifica la dirección del tráfico.',
          'En ciudades con muchos peatones, algunos pueden aparecer como figuras fantasmales en la larga exposición.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/8 – f/11',        explanation: 'Misma apertura que full frame para el efecto de sunstar en las farolas.' },
        velocidad:       { value: '8s – 30s',          explanation: 'Los tiempos de exposición son independientes del sensor.' },
        iso:             { value: 'ISO 100 – 200',      explanation: 'ISO mínimo. APS-C moderno a ISO 100 tiene muy poco ruido en el fondo oscuro.' },
        balanceBlancos:  { value: 'Tungsten / AWB',    explanation: 'Igual que full frame. Fujifilm tiene Film Simulations perfectas para el look nocturno urbano.' },
        modoEnfoque:     { value: 'Manual',            explanation: 'Manual verificado en LiveView. Con el coche en movimiento, el AF no puede enfocar correctamente.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Manual siempre para tráfico nocturno. El histograma es tu medidor.' },
        disparo:         { value: 'Temporizador 2s / Remoto', explanation: 'Estándar. Un pequeño cable remoto en el bolsillo lo facilita todo.' },
        estabilizacion:  { value: 'Desactivado',       explanation: 'Trípode y IBIS desactivado siempre en exposiciones largas.' },
        formato:         { value: 'RAW',               explanation: 'RAW para máximo control del balance entre luces y sombras en el procesado.' },
        tips: [
          'El ángulo de visión del factor de crop ×1.5 puede requerir un gran angular más extremo (10-12mm) para encuadres amplios.',
        ],
        advertencias: [
          'Difracción a f/16 en APS-C: máximo f/11 para máxima nitidez del fondo estático.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/5.6 – f/8',       explanation: 'En M43, f/8 ya puede mostrar difracción. f/5.6 es el máximo cierre recomendable para nitidez.' },
        velocidad:       { value: '8s – 30s',          explanation: 'Mismos tiempos de exposición para las estelas de tráfico.' },
        iso:             { value: 'ISO 100 – 200',      explanation: 'ISO mínimo del sistema M43. Los fondos oscuros se benefician enormemente del ISO bajo.' },
        balanceBlancos:  { value: 'Tungsten / AWB',    explanation: 'Igual que otros sistemas. El AWB del OM-1 Mark II es excelente para condiciones de mezcla de luz.' },
        modoEnfoque:     { value: 'Manual',            explanation: 'Manual siempre. El sistema M43 tiene excelente pantalla LiveView para verificar el enfoque.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Live Composite del OM System es perfecto para tráfico: acumula las estelas de luz sin sobreexponer el fondo.' },
        disparo:         { value: 'Live Composite / Temporizador', explanation: 'Live Composite del OM System: ves las estelas acumularse en la pantalla en tiempo real.' },
        estabilizacion:  { value: 'Modo Trípode',      explanation: 'El OM-1 Mark II detecta el trípode y optimiza el IBIS. Activa el modo explícitamente para seguridad.' },
        formato:         { value: 'RAW + JPEG',        explanation: 'Live Composite genera JPEG en tiempo real; el RAW es para el resultado final definitivo.' },
        tips: [
          'Live Composite del OM System para tráfico: puedes ver en tiempo real cómo se van formando las estelas. Magistral.',
          'El factor de crop ×2 del M43 da más alcance focal: encuadres creativos con "compresión" de perspectiva.',
        ],
        advertencias: [
          'Difracción a f/11 en M43: máximo f/8 para máxima nitidez en los elementos estáticos del encuadre.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/8 – f/16',        explanation: 'El sensor grande del GFX aguanta la difracción mejor. f/11-16 aún es nítido y da el efecto sunstar.' },
        velocidad:       { value: '10s – 60s',         explanation: 'El ISO nativo 100 del GFX permite exposiciones muy largas para estelas de luz espectaculares.' },
        iso:             { value: 'ISO 100',           explanation: 'ISO 100 nativo del GFX. La calidad en los fondos oscuros es absolutamente impresionante.' },
        balanceBlancos:  { value: 'Tungsten / Personalizado', explanation: 'Con 16 bits de RAW, el WB puede ajustarse perfectamente en post sin pérdida de calidad.' },
        modoEnfoque:     { value: 'Manual',            explanation: 'Manual siempre. Los 100 Mpx del GFX hacen crítico el enfoque perfecto.' },
        medicion:        { value: 'N/A (Manual)',       explanation: 'Manual con histograma. Los RAW de 100Mpx tienen un rango dinámico tan amplio que recuperas casi todo.' },
        disparo:         { value: 'Bulb + Cable remoto', explanation: 'Cable remoto para control exacto. El tethering a Capture One da previsualización inmediata en pantalla grande.' },
        estabilizacion:  { value: 'Desactivado',       explanation: 'Trípode profesional obligatorio para el GFX. IBIS desactivado en exposiciones largas.' },
        formato:         { value: 'RAW 16-bit',        explanation: 'Los 100 Mpx del GFX capturan cada estela de luz con un nivel de detalle increíble para gran formato.' },
        tips: [
          'Una imagen de tráfico nocturno del GFX impresa a 1 metro de ancho muestra cada detalle del asfalto y las luces.',
          'El GFX invita a buscar encuadres perfectos por su naturaleza de "trabajo lento y reflexivo".',
        ],
        advertencias: [
          'El tamaño del archivo del GFX (200-400 MB por RAW) requiere tarjetas CFexpress rápidas y gran capacidad.',
        ],
      },
    },
  },


  // ─── RASTROS DE ESTRELLAS ─────────────────────────────────
  {
    sceneId: 'rastros-estrellas',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/4 – f/8',          explanation: 'Apertura media para máxima nitidez en las estrellas. Más abierto introduce aberraciones en los bordes del frame.' },
        velocidad:       { value: '30s por toma (stack) o Bulb', explanation: 'Para stacking: series de 30s + 1s de intervalo durante 1-4 horas. Para Bulb único: 15-60 minutos de exposición.' },
        iso:             { value: '800 – 3200',          explanation: 'ISO moderado: cada toma corta no necesita el ISO máximo que usarías en astrofotografía de campo amplio.' },
        balanceBlancos:  { value: '3800K – 4500K',       explanation: 'Temperatura fija para consistencia entre todas las tomas del stack. El AWB cambia entre frames y arruina el apilado.' },
        modoEnfoque:     { value: 'Manual — Infinito',   explanation: 'Mismo principio que astrofotografía. Enfoca manualmente en LiveView sobre una estrella brillante.' },
        medicion:        { value: 'N/A (Manual)',         explanation: 'Modo Manual obligatorio. El histograma de la primera toma es tu guía para el resto de la serie.' },
        disparo:         { value: 'Intervalómetro (30s + 1s pausa)', explanation: 'La mayoría de cámaras tienen intervalómetro nativo. Programa: tiempo 30s, intervalo 1s, número de tomas según duración deseada.' },
        estabilizacion:  { value: 'IBIS desactivado',    explanation: 'Con trípode sólido, el IBIS puede causar micro-desplazamientos entre frames que imposibilitan el stacking.' },
        formato:         { value: 'RAW obligatorio',     explanation: 'El software de stacking (Startrails, StarStax, Sequator) trabaja con RAW para el mejor resultado en el procesado.' },
        tips: [
          'Apunta al Polo Norte (Polaris) para obtener arcos circulares perfectos. Al sur, las trazas son más lineales.',
          'Una serie de 200-300 tomas de 30s equivale a 1.5-2.5 horas: rastros largos y definidos.',
          'StarStax (gratis) y Startrails.de son las mejores apps para apilar en PC. Lightroom no sirve para esto.',
          'Incluye un primer plano iluminado (linterna, luz de luna) para dar contexto y perspectiva a los rastros.',
          'El modo "Lighten" en el software de stacking acumula solo los píxeles más brillantes: perfecta para star trails.',
        ],
        advertencias: [
          'La batería se agota rápido en sesiones largas. Lleva baterías extra o un power bank con cable USB.',
          'El rocío nocturno puede empañar el objetivo en sesiones largas. Usa una banda calefactora (dew heater).',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/2.8 – f/5.6',      explanation: 'Un stop más abierto que full frame para compensar la menor sensibilidad relativa del sensor APS-C.' },
        velocidad:       { value: '25s – 30s por toma',  explanation: 'Con APS-C y factor de crop ×1.5, el límite de la regla del 500 es menor: con 16mm → 25s máximo antes de trazos.' },
        iso:             { value: '400 – 1600',           explanation: 'APS-C moderno (Fujifilm X-T5, Sony A6700) maneja bien el rango 800-1600 para star trails.' },
        balanceBlancos:  { value: '3800K – 4500K',       explanation: 'WB fijo obligatorio para stacking consistente. Los sensores APS-C de Fujifilm responden muy bien al WB personalizado.' },
        modoEnfoque:     { value: 'Manual — Infinito',   explanation: 'LiveView ampliado al máximo en una estrella brillante antes de iniciar la secuencia.' },
        medicion:        { value: 'N/A (Manual)',         explanation: 'Manual siempre. Ajusta en las primeras tomas y revisa antes de iniciar la secuencia larga.' },
        disparo:         { value: 'Intervalómetro',       explanation: 'Las cámaras Fujifilm y Sony APS-C tienen intervalómetro nativo muy fiable para sesiones largas.' },
        estabilizacion:  { value: 'IBIS desactivado',    explanation: 'Desactivado en trípode. Cualquier micro-movimiento entre frames arruina el apilado.' },
        formato:         { value: 'RAW',                 explanation: 'RAW para el software de stacking. El JPEG comprime los píxeles oscuros y da peor resultado.' },
        tips: [
          'El factor de crop ×1.5 requiere un objetivo más gran angular para el mismo campo de visión que full frame.',
          'Fujifilm X-T5 con lente 10-24mm f/4 da un campo de visión muy amplio para star trails impresionantes.',
        ],
        advertencias: [
          'Con APS-C y f/3.5-5.6 (lentes kit), el ISO necesario puede ser demasiado ruidoso. Necesitas mínimo f/2.8.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/2.0 – f/4.0',      explanation: 'Factor de crop ×2 requiere aperturas más amplias. El Olympus 12mm f/2 y Panasonic 8mm f/3.5 son ideales.' },
        velocidad:       { value: '15s – 25s por toma',  explanation: 'Regla del 500 ajustada: 500/(focal×2). Con 12mm → 500/24 = 20s máximo para no tener trazas en cada frame.' },
        iso:             { value: '400 – 1600',           explanation: 'M43 a ISO 800-1600 da buen resultado para star trails donde cada toma es relativamente corta.' },
        balanceBlancos:  { value: '3800K – 4200K',       explanation: 'WB fijo manual. El OM System tiene WB muy preciso en condiciones de baja luz.' },
        modoEnfoque:     { value: 'Manual',              explanation: 'Manual siempre para astrofotografía. El OM-1 Mark II tiene LiveView excelente para verificar el enfoque.' },
        medicion:        { value: 'N/A (Manual)',         explanation: 'El Live View del OM System muestra en tiempo real la exposición. Ajusta hasta ver las estrellas bien.' },
        disparo:         { value: 'Intervalómetro / Astrotime-Lapse (OM System)', explanation: 'El OM-1 Mark II tiene el modo Astrotime-Lapse nativo: selecciona duración y se encarga de todo.' },
        estabilizacion:  { value: 'IBIS desactivado',    explanation: 'Con trípode. El OM-1 detecta el trípode automáticamente si activas el modo Trípode.' },
        formato:         { value: 'RAW (ORF)',           explanation: 'ORF de Olympus/OM System es perfectamente compatible con Startrails.de y Sequator.' },
        tips: [
          'El modo Astrotime-Lapse del OM-1 Mark II hace el star trail automáticamente en cámara: selecciona tiempo total y número de tomas.',
          'Live Composite acumula las estelas en tiempo real en la pantalla: ves el resultado final mientras se va formando.',
        ],
        advertencias: [
          'Baterías de M43 duran menos: para sesiones de 3+ horas, usa un grip con batería adicional o power bank.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/4 – f/8',           explanation: 'El sensor GFX captura tanta luz que f/4-5.6 ya es muy luminoso. f/8 da mejor nitidez en los bordes.' },
        velocidad:       { value: '30s por toma',         explanation: 'El factor de crop 0.79× del GFX permite exposiciones algo más largas antes de trazas de estrellas.' },
        iso:             { value: '400 – 1600',           explanation: 'El GFX tiene excelente rango dinámico pero su rendimiento en ISO alto no supera al de la A7S III.' },
        balanceBlancos:  { value: '3800K – 4500K',       explanation: 'Los 16 bits del GFX dan libertad de ajustar el WB en post. Fija el WB para consistencia en el stack.' },
        modoEnfoque:     { value: 'Manual — Infinito',   explanation: 'LiveView del GFX a máximo zoom sobre una estrella brillante. Los 100 Mpx hacen crítico el enfoque perfecto.' },
        medicion:        { value: 'N/A (Manual)',         explanation: 'Manual siempre. El GFX en modo Manual con histograma como guía.' },
        disparo:         { value: 'Intervalómetro',       explanation: 'El GFX tiene intervalómetro nativo. Programa la secuencia completa antes de iniciar.' },
        estabilizacion:  { value: 'IBIS desactivado',    explanation: 'Trípode profesional obligatorio para el peso del GFX. IBIS desactivado para stacking limpio.' },
        formato:         { value: 'RAW 16-bit (RAF)',     explanation: 'Los 100 Mpx del GFX crean archivos de star trails absolutamente espectaculares para gran formato.' },
        tips: [
          'El GFX para star trails de gran formato (impresiones de 1.5m+) es insuperable en calidad.',
          'Considera un seguidor ecuatorial para exposiciones muy largas sin trazas en cada frame.',
        ],
        advertencias: [
          'Cada archivo RAF del GFX pesa 200-400 MB: una noche de star trails puede superar 1 TB en almacenamiento.',
        ],
      },
    },
  },

  // ─── MACRO NATURALEZA ─────────────────────────────────────
  {
    sceneId: 'macro-naturaleza',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/8 – f/16',          explanation: 'En macro, la profundidad de campo es extremadamente pequeña. f/11 da el equilibrio entre DOF y difracción.' },
        velocidad:       { value: '1/200s – 1/500s',     explanation: 'Con flash de anillo, la velocidad de sincronización (1/160s-1/250s) es el límite. Sin flash, usa trípode.' },
        iso:             { value: 'ISO 100 – 400',        explanation: 'Con flash el ISO puede mantenerse bajo. Sin flash en exterior con luz natural, ISO 400-800.' },
        balanceBlancos:  { value: 'Daylight (5500K) / Flash (5500K)', explanation: 'Flash y luz de día tienen temperatura similar. Daylight es la referencia estándar para macro exterior.' },
        modoEnfoque:     { value: 'Manual / AF-S con punto único', explanation: 'En macro la profundidad de campo es de mm. El foco manual con LiveView amplificado da el control exacto.' },
        medicion:        { value: 'Evaluativa / Puntual', explanation: 'Puntual si el sujeto es pequeño contra un fondo muy diferente. Evaluativa para escenas más uniformes.' },
        disparo:         { value: 'Temporizador 2s / Disparador remoto', explanation: 'Cualquier vibración es fatal en macro. Con trípode y temporizador o remoto, eliminas el movimiento de la presión.' },
        estabilizacion:  { value: 'Depende del método',  explanation: 'Con trípode: IBIS OFF. A mano alzada (macro handheld con flash): IBIS ON al máximo.' },
        formato:         { value: 'RAW',                 explanation: 'RAW para máximo detalle en post. El focus stacking (Helicon Focus, Zerene) requiere RAW o TIFF.' },
        tips: [
          'El focus stacking combina múltiples tomas con diferente punto de foco para aumentar la zona nítida.',
          'Un anillo de flash (ring flash) o twin flash elimina sombras en macro y permite velocidades altas.',
          'Los trípodes de macro con columna reversible permiten enfocar en el suelo directamente.',
          'Busca sujetos con rocío matutino: las gotas de agua en flores o insectos son espectaculares en macro.',
          'La distancia mínima de enfoque del lente define la ampliación máxima (1:1, 2:1, etc.).',
        ],
        advertencias: [
          'f/16 puede mostrar difracción en sensores de alta resolución. Haz focus stacking en lugar de cerrar tanto.',
          'Los insectos se mueven: trabaja de madrugada cuando la temperatura baja y están adormecidos.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/8 – f/16',          explanation: 'Mismas reglas que full frame para macro. El punto de difracción en APS-C llega ligeramente antes a f/11.' },
        velocidad:       { value: '1/200s – 1/500s',     explanation: 'Con flash de anillo o twin flash: velocidad de sync (1/160-1/250s). Sin flash: trípode obligatorio.' },
        iso:             { value: 'ISO 100 – 400',        explanation: 'Flash mantiene el ISO bajo. El factor de crop ×1.5 da más alcance real: un 60mm macro es como 90mm equiv.' },
        balanceBlancos:  { value: 'Daylight / Flash',    explanation: 'Daylight estándar. El WB del flash es 5500K, igual que Daylight: no hay dominante de color.' },
        modoEnfoque:     { value: 'Manual / AF-S',        explanation: 'El AF en macro es poco fiable incluso en cámaras modernas. Manual con LiveView ampliado es la solución.' },
        medicion:        { value: 'Evaluativa',           explanation: 'El medidor evaluativo funciona bien para macro en condiciones de luz controlada.' },
        disparo:         { value: 'Temporizador / Remoto', explanation: 'Con trípode y temporizador es suficiente. El remoto bluetooth es más cómodo.' },
        estabilizacion:  { value: 'OFF con trípode / ON a mano', explanation: 'Depende del método de trabajo. Handheld macro con IBIS permite capturas espontáneas en campo.' },
        formato:         { value: 'RAW',                 explanation: 'RAW para focus stacking en software. Los detalles del macro requieren máxima calidad de archivo.' },
        tips: [
          'El factor de crop ×1.5 es una ventaja en macro: consigues más ampliación efectiva con el mismo lente.',
          'El Fujifilm 80mm f/2.8 Macro es uno de los mejores lentes macro del sistema APS-C.',
        ],
        advertencias: [
          'La difracción en APS-C a f/16 reduce nitidez. El focus stacking con f/8-11 da mejor resultado.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/5.6 – f/11',        explanation: 'En M43 el punto de difracción llega antes. f/8 máximo para máxima nitidez. El crop ×2 ya multiplica la ampliación.' },
        velocidad:       { value: '1/200s – 1/500s',     explanation: 'Con flash: velocidad de sync. Sin flash en exterior: trípode a 1/60-1/125s con el IBIS del OM System.' },
        iso:             { value: 'ISO 100 – 400',        explanation: 'ISO bajo con flash. El OM-1 Mark II tiene muy buena relación calidad/ruido a ISO 400 incluso en macro.' },
        balanceBlancos:  { value: 'Daylight / Flash',    explanation: 'Estándar para macro exterior. El WB de Olympus/OM System es muy preciso con luz natural.' },
        modoEnfoque:     { value: 'Manual + Focus Bracketing (OM System)', explanation: 'El OM-1 Mark II tiene Focus Bracketing nativo: dispara automáticamente una serie con diferentes puntos de foco para stacking.' },
        medicion:        { value: 'Evaluativa',           explanation: 'Medición evaluativa estándar. El live view del OM-1 permite previsualizar la exposición en tiempo real.' },
        disparo:         { value: 'Temporizador / Focus Bracketing automático', explanation: 'El modo Focus Bracketing del OM-1 dispara automáticamente hasta 999 tomas con incremento de foco definido.' },
        estabilizacion:  { value: 'IBIS ON (mayor en M43)', explanation: 'El IBIS del OM-1 Mark II (8.5 paradas) permite macro handheld a velocidades increíblemente bajas.' },
        formato:         { value: 'RAW (ORF)',            explanation: 'RAW para stacking en Helicon Focus o Zerene Stacker. El Focus Bracketing del OM-1 hace el trabajo preliminar.' },
        tips: [
          'Focus Bracketing del OM-1: selecciona el punto de foco inicial y final, la cámara hace el stack automáticamente en cámara.',
          'El factor de crop ×2 da la mayor ampliación efectiva del mercado con lentes macro: 60mm M43 = 120mm equiv.',
          'El Live ND del OM System permite macro a plena luz del día sin filtros físicos ND para velocidades lentas.',
        ],
        advertencias: [
          'f/11 en M43 ya muestra difracción significativa. Limita la apertura a f/8 y usa focus stacking para el DOF.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/8 – f/16',           explanation: 'El GFX para macro revela cada detalle microscópico. f/11 es el punto de máxima nitidez en el sensor grande.' },
        velocidad:       { value: '1/160s – 1/500s',      explanation: 'Con flash de estudio: velocidad de sync del GFX (1/125s mecánico, 1/4000s electrónico). Trípode para detalle extremo.' },
        iso:             { value: 'ISO 100',               explanation: 'ISO 100 nativo del GFX para la máxima resolución en los detalles microscópicos. Los 100 Mpx lo justifican.' },
        balanceBlancos:  { value: 'Flash / Daylight',     explanation: 'El GFX tiene calibración de color excepcional. Flash 5500K o Daylight son la referencia en macro científico.' },
        modoEnfoque:     { value: 'Manual + Rail de macro', explanation: 'Los 100 Mpx del GFX hacen crítico el enfoque perfecto. Un rail de foco manual (focusing rail) es imprescindible.' },
        medicion:        { value: 'Puntual / Manual',      explanation: 'Para macro científico, exposición manual con histograma. El rango dinámico del GFX recupera sombras y altas luces.' },
        disparo:         { value: 'Tethering + Intervalómetro', explanation: 'Con tethering a Capture One, ves cada macro al 100% en tiempo real. Imprescindible para focus stacking profesional.' },
        estabilizacion:  { value: 'IBIS desactivado (trípode)', explanation: 'Trípode de macro con columna reversible y IBIS desactivado. Los 100 Mpx amplifican cualquier vibración.' },
        formato:         { value: 'RAW 16-bit',            explanation: 'Los 100 Mpx en RAF de 16 bits para macro producen imágenes que revelan detalles invisibles a simple vista.' },
        tips: [
          'El GFX para macro científico o publicitario produce imágenes de calidad incomparable para impresión de gran formato.',
          'Un rail de enfoque macro (Novoflex, RRS) para el GFX permite focus stacking con control milimétrico.',
        ],
        advertencias: [
          'El GFX es caro y pesado para uso en campo. Para macro de campo, los sistemas APS-C o M43 son más prácticos.',
        ],
      },
    },
  },

  // ─── RETRATO EN ESTUDIO ───────────────────────────────────
  {
    sceneId: 'retrato-estudio',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/5.6 – f/11',        explanation: 'En estudio con flash, cierra el diafragma para mayor nitidez y zona de enfoque. f/8 es el favorito de los profesionales.' },
        velocidad:       { value: '1/160s – 1/200s',     explanation: 'Velocidad de sincronización con flash. Excederla causará una banda negra en el fotograma por el obturador mecánico.' },
        iso:             { value: 'ISO 100',              explanation: 'La luz del flash es potente: ISO 100 nativo da la máxima calidad posible. La exposición la controla la potencia del flash, no el ISO.' },
        balanceBlancos:  { value: 'Flash (5500K) / Manual 5500K', explanation: 'Fija el WB en 5500K (Flash) para reproducción de color perfecta y consistente entre tomas de la sesión.' },
        modoEnfoque:     { value: 'AF-S + Eye-AF',       explanation: 'AF-S para cada toma. Eye-AF en Sony, Canon y Nikon modernos es preciso incluso en condiciones de flash de modelado.' },
        medicion:        { value: 'Manual (exposímetro de flash)', explanation: 'En estudio, mide con exposímetro de destello (flash meter). La medición de cámara no sirve con flash externo.' },
        disparo:         { value: 'Individual',           explanation: 'En estudio se trabaja con calma. Cada toma es deliberada y el modelo puede relajarse entre disparos.' },
        estabilizacion:  { value: 'No crítico (velocidades altas)', explanation: 'Con 1/160s y flash, el movimiento de cámara no es problema. El IBIS puede activarse o no sin diferencia.' },
        formato:         { value: 'RAW + JPEG',           explanation: 'RAW para retoque de piel y ajustes finos. JPEG para preview inmediato en el set o pantalla del cliente.' },
        tips: [
          'La relación de potencia entre luz principal y luz de relleno (ratio) define el contraste del retrato: 2:1 suave, 4:1 dramático.',
          'Un softbox de 60×90cm a 45° sobre el sujeto (luz Rembrandt) es el setup de retrato más versátil y favorecedora.',
          'El flash de modelado (pilot light) permite previsualizar el efecto de la luz antes de disparar.',
          'Un fondo gris neutro 18% simplifica el retoque y da un aspecto profesional atemporal.',
          'La distancia entre el softbox y el sujeto controla la suavidad: más cerca = luz más suave.',
        ],
        advertencias: [
          'Nunca excedas la velocidad de sincronización de flash: consulta el manual de tu cámara (generalmente 1/160-1/250s).',
          'Calibra el monitor antes de retocar: lo que ves en pantalla sin calibración puede diferir del resultado impreso.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/5.6 – f/11',        explanation: 'Mismas reglas de estudio que full frame. La apertura controla la profundidad de campo, el flash controla la exposición.' },
        velocidad:       { value: '1/160s – 1/250s',     explanation: 'La velocidad de sync varía según la cámara APS-C. Muchas APS-C tienen sync hasta 1/250s con obturador mecánico.' },
        iso:             { value: 'ISO 100 – 200',        explanation: 'ISO mínimo para máxima calidad con flash. La cámara APS-C a ISO 100 da resultados excelentes en estudio.' },
        balanceBlancos:  { value: 'Flash (5500K)',        explanation: 'WB en Flash siempre en estudio. Consistencia entre tomas y reproducción fiel de los colores de la ropa y piel.' },
        modoEnfoque:     { value: 'AF-S + Eye-AF',       explanation: 'Eye-AF de Sony A6700, Canon R7 y Fujifilm X-H2S son excelentes incluso con luz de modelado baja.' },
        medicion:        { value: 'Manual',               explanation: 'Exposición manual con el exposímetro de flash como referencia. La medición de la cámara no aplica con flash externo.' },
        disparo:         { value: 'Individual',           explanation: 'Trabajo tranquilo y deliberado en estudio.' },
        estabilizacion:  { value: 'Desactivado (no necesario)', explanation: 'Flash congela cualquier movimiento. El IBIS no aporta nada a 1/160s con flash.' },
        formato:         { value: 'RAW',                 explanation: 'RAW para retoque profesional de piel. Las Film Simulations de Fujifilm son un plus en el JPEG directo de cámara.' },
        tips: [
          'El factor de crop ×1.5 te da más distancia efectiva: un 85mm en APS-C da la perspectiva de un 128mm en full frame.',
          'Las Film Simulations de Fujifilm (Classic Chrome, Eterna) son perfectas para retratos de estudio con carácter.',
        ],
        advertencias: [
          'Algunos flashes de terceros no sincronizan perfectamente con las cámaras APS-C. Verifica la compatibilidad TTL.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/5.6 – f/11',        explanation: 'Mismo principio en estudio. El factor de crop ×2 amplía la profundidad de campo: f/5.6 en M43 equivale a f/11 en full frame.' },
        velocidad:       { value: '1/160s – 1/250s',     explanation: 'Velocidad de sync del sistema M43. El OM-1 Mark II soporta flash electrónico a velocidades superiores con HSS.' },
        iso:             { value: 'ISO 100 – 200',        explanation: 'ISO mínimo siempre en estudio con flash. El M43 a ISO 100 da calidad más que suficiente para retrato profesional.' },
        balanceBlancos:  { value: 'Flash (5500K)',        explanation: 'WB Flash fijo para consistencia. OM System tiene excelente calibración de color en condiciones de flash.' },
        modoEnfoque:     { value: 'AF-S + Face/Eye detect', explanation: 'El OM-1 Mark II tiene detección de ojo muy precisa. Suficiente para sesiones de retrato en estudio.' },
        medicion:        { value: 'Manual',               explanation: 'Exposición manual con flash siempre. El medidor TTL del sistema M43 funciona bien con flashes compatibles.' },
        disparo:         { value: 'Individual',           explanation: 'Estudio = trabajo tranquilo y deliberado.' },
        estabilizacion:  { value: 'No crítico',           explanation: 'Con flash y 1/160s, el IBIS no es relevante. Actívalo si quieres para la foto sin flash.' },
        formato:         { value: 'RAW + JPEG',           explanation: 'El M43 procesa JPEG en cámara muy bien. RAW para retoque profesional.' },
        tips: [
          'El sistema M43 es más compacto: ideal para estudios pequeños donde el espacio es limitado.',
          'Los flashes de estudio Godox son totalmente compatibles con el sistema M43 vía receptor TTL.',
        ],
        advertencias: [
          'El bokeh en M43 a f/5.6 equivale a f/11 en full frame: el fondo del estudio puede aparecer más nítido de lo esperado.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/8 – f/16',           explanation: 'El GFX en estudio para retrato de moda es la referencia. f/8-11 da nitidez impecable y profundidad de campo suficiente.' },
        velocidad:       { value: '1/125s',                explanation: 'El GFX tiene velocidad de sync mecánica de 1/125s. Con obturador electrónico: hasta 1/4000s con flash compatible (HSS).' },
        iso:             { value: 'ISO 100',               explanation: 'ISO nativo 100 del GFX con flash de estudio: la máxima calidad posible. Los 100 Mpx capturan cada detalle de la piel.' },
        balanceBlancos:  { value: 'Flash (5500K) / Personalizado', explanation: 'Los 16 bits del GFX permiten ajustar el WB en post con precisión absoluta. Fija 5500K en sesión.' },
        modoEnfoque:     { value: 'AF-S + Face/Eye-AF',   explanation: 'El AF del GFX es preciso para retrato estático de estudio. El Eye-AF es suficientemente rápido para moda.' },
        medicion:        { value: 'Manual (exposímetro de flash)', explanation: 'Exposímetro de destello obligatorio para calibrar la potencia del flash con el GFX. El medidor de cámara no aplica.' },
        disparo:         { value: 'Tethering (Capture One)', explanation: 'El GFX en estudio sin tethering es desperdiciar su potencial. Capture One en Mac/PC para ver cada toma al 100%.' },
        estabilizacion:  { value: 'Activado (no crítico)', explanation: 'Con flash la estabilización no es factor. El GFX 100S II tiene IBIS excelente para between-shots a mano alzada.' },
        formato:         { value: 'RAW 16-bit + TIFF para entrega', explanation: 'Los 100 Mpx del GFX y 16 bits son el estándar de la industria para moda editorial y publicidad de alta gama.' },
        tips: [
          'El GFX en estudio de moda con luz de caja grande da una calidad de piel sin parangón: cada poro, cada cabello.',
          'Tethering con Capture One permite ajustar el WB y la exposición en tiempo real: el cliente lo aprueba en el momento.',
          'La lente GF 110mm f/2 (87mm equiv.) es el objetivo de retrato definitivo para el GFX: bokeh excepcional.',
        ],
        advertencias: [
          'Los archivos del GFX llenan el disco rápido: para una sesión de 500 tomas necesitas 100+ GB libres.',
        ],
      },
    },
  },

  // ─── FOTOGRAFÍA CALLEJERA ─────────────────────────────────
  {
    sceneId: 'fotografia-callejera',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/2.8 – f/8',          explanation: 'f/8 da profundidad de campo amplia para hiperfocal (todo nítido sin enfocar). f/2.8 para bokeh y baja luz.' },
        velocidad:       { value: '1/250s – 1/1000s',     explanation: '1/250s congela a personas caminando. 1/500s o más para gestos rápidos y movimiento espontáneo.' },
        iso:             { value: 'Auto ISO 400 – 6400',   explanation: 'Auto ISO con límite según la cámara. Full frame moderno aguanta 6400 con excelente resultado en calle.' },
        balanceBlancos:  { value: 'AWB',                  explanation: 'AWB moderno es muy inteligente para las condiciones mixtas de la calle. Corriges en post si es necesario.' },
        modoEnfoque:     { value: 'Zone Focus (hiperfocal) / AF-C', explanation: 'Zone focus: enfoca a 2-3m, f/8, y todo en ese rango estará nítido. Alternativa: AF-C con seguimiento de sujeto.' },
        medicion:        { value: 'Evaluativa',            explanation: 'Evaluativa para escenas variadas de calle. Puedes añadir compensación negativa en escenas muy luminosas.' },
        disparo:         { value: 'Individual / Silencioso (electrónico)', explanation: 'El obturador silencioso es ideal para no llamar la atención en la calle. Discreción = mejores momentos.' },
        estabilizacion:  { value: 'Activado',              explanation: 'IBIS activo para mano alzada. En calle no tienes trípode: el IBIS permite velocidades más bajas con seguridad.' },
        formato:         { value: 'RAW + JPEG',            explanation: 'JPEG para rapidez de selección. RAW para las tomas que quieres procesar en profundidad.' },
        tips: [
          'La técnica hiperfocal (f/8, foco a 3m) hace que todo de 1.5m a infinito esté nítido: sin necesidad de enfocar.',
          'Usa lentes fijas de 28mm, 35mm o 50mm. Sus tamaños compactos son menos intimidantes que zooms grandes.',
          'El momento decisivo de Cartier-Bresson: anticipa la acción, posiciónate, espera el instante perfecto.',
          'Trabaja a nivel de ojos de los sujetos: agáchate, sube a una escalera, busca perspectivas inusuales.',
          'La calle temprano en la mañana tiene luz limpia y menos gente: perfecto para el aprendizaje sin presión.',
        ],
        advertencias: [
          'Conoce las leyes de fotografía en tu país: en la mayoría de lugares puedes fotografiar en espacios públicos.',
          'Sé respetuoso: si alguien no quiere ser fotografiado, acepta su decisión y borra la foto si te lo piden.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/2.8 – f/8',          explanation: 'Mismas reglas de zone focus y bokeh que full frame. El factor de crop da más alcance con lentes compactos.' },
        velocidad:       { value: '1/250s – 1/1000s',     explanation: 'Idénticas velocidades para congelar el movimiento en calle.' },
        iso:             { value: 'Auto ISO 400 – 3200',   explanation: 'APS-C moderno aguanta 3200 muy bien. El Fujifilm X100VI tiene sensor y procesado excepcionales para calle.' },
        balanceBlancos:  { value: 'AWB',                  explanation: 'AWB para la variabilidad de la calle. Las Film Simulations de Fujifilm en JPEG dan un carácter único.' },
        modoEnfoque:     { value: 'Zone Focus / AF-C con face detect', explanation: 'Las cámaras compactas APS-C (X100VI, Ricoh GR IIIx) son perfectas para zone focus en calle.' },
        medicion:        { value: 'Evaluativa',            explanation: 'Medición evaluativa estándar para la variabilidad de escenas en calle.' },
        disparo:         { value: 'Silencioso (electrónico)', explanation: 'El obturador silencioso del X100VI, GR IIIx y otros es perfecto para fotografía callejera discreta.' },
        estabilizacion:  { value: 'Activado',              explanation: 'El IBIS/OIS de los sistemas APS-C modernos permite velocidades más bajas en condiciones de poca luz.' },
        formato:         { value: 'JPEG (Film Simulation) + RAW', explanation: 'Las Film Simulations de Fujifilm (Acros, Classic Neg, Classic Chrome) son legendarias para street photography.' },
        tips: [
          'El Fujifilm X100VI es considerada por muchos la mejor cámara para street: compacta, silenciosa, excelente JPEG.',
          'La Ricoh GR IIIx con 40mm equiv. es discreta, bolsillo y con calidad de imagen excepcional para calle.',
        ],
        advertencias: [
          'El modo silencioso (obturador electrónico) puede tener rolling shutter con luces de LED parpadeantes en interiores.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/2.0 – f/5.6',        explanation: 'El sistema M43 con lentes compactos es perfecto para calle. La Olympus 17mm f/1.8 (34mm equiv.) es icónica.' },
        velocidad:       { value: '1/250s – 1/1000s',     explanation: 'Mismas velocidades para congelar movimiento en calle. El IBIS del OM-1 permite bajar más si es necesario.' },
        iso:             { value: 'Auto ISO 400 – 3200',   explanation: 'M43 requiere ISOs más conservadores. La Panasonic G9 II y OM-1 Mark II son las mejores en su sistema para calle.' },
        balanceBlancos:  { value: 'AWB II',                explanation: 'El AWB II del OM-1 Mark II es de los mejores del mercado para condiciones de luz mixta de ciudad.' },
        modoEnfoque:     { value: 'AF-C + Subject Detection / Zone Focus', explanation: 'El OM-1 Mark II detecta personas, cars, bicis automáticamente: activa el modo deseado.' },
        medicion:        { value: 'Evaluativa',            explanation: 'La medición evaluativa M43 es precisa en condiciones variables de calle.' },
        disparo:         { value: 'Silencioso (100% electrónico)', explanation: 'El OM-1 Mark II es 100% silencioso con obturador electrónico. El más discreto del mercado M43.' },
        estabilizacion:  { value: 'Activado',              explanation: 'El IBIS del OM-1 Mark II (8.5 paradas) permite disparar a 1/30s o menos a mano alzada en baja luz de calle.' },
        formato:         { value: 'RAW + JPEG',            explanation: 'El procesado de JPEG en OM System y Panasonic es muy competente para resultados directos de cámara.' },
        tips: [
          'El sistema M43 con lentes Olympus/OM System compactos (17mm f/1.8, 25mm f/1.8) es el más discreto del mercado.',
          'La Panasonic LX100 II tiene sensor M43 en cuerpo compacto con visor: perfecta para calle discreta.',
        ],
        advertencias: [
          'El rolling shutter en modo electrónico M43 puede ser visible con movimiento rápido. Monitoriza en condiciones extremas.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/4 – f/8',             explanation: 'El GFX en calle es inusual pero posible. f/5.6-8 da profundidad de campo suficiente para trabajo rápido.' },
        velocidad:       { value: '1/250s – 1/1000s',      explanation: 'Con el IBIS del GFX 100S II, las velocidades estándar de calle son alcanzables incluso con el sensor grande.' },
        iso:             { value: 'Auto ISO 400 – 3200',    explanation: 'El GFX a ISO 1600-3200 en calle da resultados limpios para el look de "gran formato en la calle".' },
        balanceBlancos:  { value: 'AWB',                   explanation: 'AWB en el GFX es preciso. La gama tonal de 16 bits da enorme libertad en post para el WB.' },
        modoEnfoque:     { value: 'AF-C + Face/Eye',        explanation: 'El AF del GFX ha mejorado mucho. Suficientemente rápido para escenas de calle sin acción extrema.' },
        medicion:        { value: 'Evaluativa',             explanation: 'Evaluativa en el GFX da buenos resultados para la variabilidad de la calle.' },
        disparo:         { value: 'Individual / Pequeña ráfaga', explanation: 'El GFX no es una cámara de ráfaga, pero su AF y respuesta son suficientes para momentos decisivos.' },
        estabilizacion:  { value: 'Activado',               explanation: 'El IBIS del GFX 100S II ayuda enormemente en calle a mano alzada.' },
        formato:         { value: 'RAW 16-bit',             explanation: 'El GFX en calle es una elección estética: su look de gran formato y tonos únicos justifican el esfuerzo.' },
        tips: [
          'El GFX en la calle crea un look único: la perspectiva del sensor grande y los 100 Mpx dan un carácter diferente.',
          'La lente GF 50mm f/3.5 (40mm equiv.) es la más ligera y compacta del sistema: práctica para calle.',
        ],
        advertencias: [
          'El GFX es caro y llamativo: en ciertas zonas puede atraer atención no deseada o ser objetivo de robo.',
        ],
      },
    },
  },

  // ─── AMANECER Y PAISAJE ───────────────────────────────────
  {
    sceneId: 'amanecer-paisaje',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/8 – f/16',           explanation: 'Para máxima nitidez de primer plano a horizonte. f/11 es el punto dulce para la mayoría de lentes gran angular.' },
        velocidad:       { value: '1/4s – 30s',           explanation: 'Varía enormemente: antes del amanecer 15-30s, durante la hora dorada 1/60s-1/250s. El trípode es esencial.' },
        iso:             { value: 'ISO 50 – 400',          explanation: 'ISO nativo mínimo durante el amanecer. Las primeras luces permiten ISO muy bajo para la máxima calidad.' },
        balanceBlancos:  { value: 'Daylight (5000K–5500K) / Nublado', explanation: 'Daylight preserva los tonos naturales del amanecer. Nublado (6500K) calienta ligeramente los tonos azulados del alba.' },
        modoEnfoque:     { value: 'Manual / AF-S (un punto)', explanation: 'En paisaje enfoca en el punto de mayor interés del encuadre. En pre-amanecer, enfoque manual al hiperfocal.' },
        medicion:        { value: 'Evaluativa',            explanation: 'El amanecer tiene rango dinámico muy alto (cielo brillante, primer plano oscuro). Usa gradiente ND o HDR para equilibrar.' },
        disparo:         { value: 'Temporizador 2s / Disparador remoto', explanation: 'Siempre. Con exposiciones de 5-30s, cualquier vibración destruye la nitidez en los detalles del paisaje.' },
        estabilizacion:  { value: 'IBIS desactivado',     explanation: 'Trípode obligatorio para paisaje. IBIS siempre desactivado con trípode para evitar micro-movimientos.' },
        formato:         { value: 'RAW obligatorio',       explanation: 'El rango dinámico del amanecer (5-7 EV) solo puede recuperarse con RAW. JPEG sacrifica sombras y altas luces.' },
        tips: [
          'Llega 30-45 minutos antes del amanecer para preparar el trípode y esperar la hora azul (blue hour).',
          'La hora azul (20-30 min antes del amanecer) da luz difusa, templada y con gran calidad para paisaje.',
          'Un filtro gradiente ND (GND) de 2-3 paradas equilibra el cielo brillante con el primer plano oscuro.',
          'Usa PhotPills para saber exactamente dónde saldrá el sol y cuál es el encuadre óptimo.',
          'Las nubes en el cielo del amanecer se convierten en el sujeto principal: busca formaciones dramáticas.',
        ],
        advertencias: [
          'El tiempo cambia: consulta la previsión meteo con 24h de antelación. Llegaste temprano, no te vayas si hay nubes.',
          'Revisa el histograma siempre: el LCD puede engañar en condiciones de oscuridad o luz brillante.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/8 – f/16',           explanation: 'Mismo principio que full frame para paisaje. La difracción en APS-C comienza a f/16: máximo f/11 para nitidez óptima.' },
        velocidad:       { value: '1/4s – 30s',           explanation: 'Trípode obligatorio: las velocidades en paisaje de amanecer dependen de la luz disponible, no del sensor.' },
        iso:             { value: 'ISO 50 – 200',          explanation: 'ISO mínimo del sistema APS-C para la máxima calidad en paisaje estático de amanecer.' },
        balanceBlancos:  { value: 'Daylight / Nublado',   explanation: 'Mismo principio. Las Film Simulations de Fujifilm (Velvia para saturación, Provia para fidelidad) son únicas para paisaje.' },
        modoEnfoque:     { value: 'Manual / AF-S',         explanation: 'Para paisaje en pre-amanecer, enfoque manual al hiperfocal. AF-S en el punto de interés una vez hay luz.' },
        medicion:        { value: 'Evaluativa',            explanation: 'Evaluativa funciona bien. Revisa el histograma siempre y ajusta con compensación de exposición.' },
        disparo:         { value: 'Temporizador 2s',       explanation: 'Estándar para paisaje en trípode.' },
        estabilizacion:  { value: 'Desactivado con trípode', explanation: 'Siempre desactivado en trípode para paisaje de larga exposición.' },
        formato:         { value: 'RAW',                  explanation: 'Fujifilm X-T5 con 40 Mpx produce RAW de paisaje con una resolución excepcional para impresión de gran formato.' },
        tips: [
          'La Film Simulation Velvia de Fujifilm en amanecer da colores vibrantes directamente de cámara: espectacular.',
          'El X-T5 de 40 Mpx supera a muchos full frame en resolución de paisaje gracias a su sensor BSI de última generación.',
        ],
        advertencias: [
          'Con f/16 en APS-C, el punto de difracción puede ser visible al 100%. Revisa la nitidez en los detalles del paisaje.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/5.6 – f/11',         explanation: 'El punto de difracción en M43 llega antes. f/8 da la máxima nitidez. Usa el hiperfocal de M43 para profundidad total.' },
        velocidad:       { value: '1/4s – 30s',           explanation: 'Trípode con M43 y las mismas velocidades para paisaje de amanecer.' },
        iso:             { value: 'ISO 100 – 200',         explanation: 'ISO nativo 100-200 en M43 para máxima calidad en paisaje estático.' },
        balanceBlancos:  { value: 'Daylight / Nublado',   explanation: 'Standard para paisaje de amanecer. Los OM System tienen excelente calibración de color en exteriores.' },
        modoEnfoque:     { value: 'Manual (hiperfocal)',   explanation: 'El M43 tiene una hiperfocal más corta: con 12mm (24mm equiv.) a f/8, todo de 1.2m a infinito está nítido.' },
        medicion:        { value: 'Evaluativa',            explanation: 'Medición evaluativa con atención al histograma. El Live View del OM-1 muestra la exposición en tiempo real.' },
        disparo:         { value: 'Temporizador 2s',       explanation: 'Standard. El OM-1 también tiene disparador por app Bluetooth sin cables.' },
        estabilizacion:  { value: 'Modo Trípode (OM System)', explanation: 'El OM-1 Mark II detecta el trípode y desactiva el IBIS automáticamente o activa el modo Trípode explícitamente.' },
        formato:         { value: 'RAW (ORF)',             explanation: 'El sistema M43 con OM-1 y 20 Mpx da calidad de paisaje muy competitiva con un sistema mucho más ligero.' },
        tips: [
          'El sistema M43 es el más ligero para senderismo y paisaje de montaña: menos de 1kg cuerpo + objetivo + trípode compacto.',
          'Live ND del OM System permite largas exposiciones sin filtros físicos para suavizar agua y nubes al amanecer.',
        ],
        advertencias: [
          'Difracción visible a f/11 en M43. Usa focus stacking si necesitas máxima nitidez con profundidad de campo total.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/8 – f/16',           explanation: 'El GFX para paisaje de amanecer es insuperable. f/11 da nitidez de borde a borde en los 100 Mpx.' },
        velocidad:       { value: '1/2s – 60s',           explanation: 'El ISO 100 nativo y el GFX en trípode permite exposiciones muy largas para paisaje de amanecer dramático.' },
        iso:             { value: 'ISO 50 – 100',          explanation: 'El ISO 50 extendido del GFX da el máximo rango dinámico posible: ideal para las 7+ paradas del amanecer.' },
        balanceBlancos:  { value: 'Daylight / Personalizado', explanation: 'Los 16 bits del GFX permiten ajustar el WB con total libertad en post sin pérdida de calidad perceptible.' },
        modoEnfoque:     { value: 'Manual / AF-S',         explanation: 'Los 100 Mpx requieren un enfoque perfecto. LiveView del GFX ampliado al máximo en el punto crítico del encuadre.' },
        medicion:        { value: 'Evaluativa',            explanation: 'El medidor del GFX es muy preciso. Con 16 bits de RAW, recuperas hasta 5 paradas de sombras subexpuestas.' },
        disparo:         { value: 'Temporizador / Cable remoto / Tethering', explanation: 'El tethering del GFX a Capture One permite ver cada toma de paisaje a 100% en el monitor de campo.' },
        estabilizacion:  { value: 'IBIS desactivado',     explanation: 'Trípode profesional sólido obligatorio para el peso del GFX. IBIS desactivado para máxima nitidez.' },
        formato:         { value: 'RAW 16-bit',           explanation: 'Los 100 Mpx y 16 bits del GFX para paisaje de amanecer producen imágenes de galería imposibles de replicar.' },
        tips: [
          'El GFX para paisaje es la elección de los fotógrafos que venden impresiones de gran formato: calidad sin igual.',
          'Usa el modo Pixel Shift Multi-Shot del GFX para imágenes de 400 Mpx en escenas completamente estáticas.',
        ],
        advertencias: [
          'El GFX en campo requiere trípode pesado y sólido: el sistema pesa 2-3 kg con objetivo. No es para senderismo extremo.',
        ],
      },
    },
  },

  // ─── BODA Y EVENTOS ───────────────────────────────────────
  {
    sceneId: 'boda-evento',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/1.8 – f/4.0',        explanation: 'f/1.8-2.8 para ceremonias en interiores con poca luz. f/4-5.6 para exteriores y sesiones posadas con más luz.' },
        velocidad:       { value: '1/125s – 1/500s',      explanation: '1/125s mínimo para congelar expresiones y movimiento. 1/500s para el lanzamiento del ramo o el primer baile.' },
        iso:             { value: 'Auto ISO 800 – 12800',  explanation: 'Auto ISO con límite alto: las iglesias y salones oscuros requieren ISO elevado. Full frame moderno lo maneja muy bien.' },
        balanceBlancos:  { value: 'AWB / Flash (con TTL)',  explanation: 'AWB para reportaje espontáneo. Flash TTL para retratos formales. Cuidado con las dominantes de la iluminación del salón.' },
        modoEnfoque:     { value: 'AF-C + Eye/Face-AF',    explanation: 'Eye-AF continuo de Sony/Canon/Nikon es imprescindible para bodas: nunca pierdes el foco en los ojos del protagonista.' },
        medicion:        { value: 'Evaluativa',             explanation: 'Evaluativa para la variabilidad de la boda. Añade +0.7EV para trajes blancos que el medidor tiende a subexponer.' },
        disparo:         { value: 'Ráfaga continua (5-10fps)', explanation: 'Ráfaga moderada para el primer beso, el lanzamiento del ramo, los abrazos. Seleccionar bien después.' },
        estabilizacion:  { value: 'IBIS activado',          explanation: 'IBIS siempre activo en boda: no tienes trípode y las condiciones de luz cambian constantemente.' },
        formato:         { value: 'RAW + JPEG',             explanation: 'RAW para el procesado profesional de entrega. JPEG para previsualización rápida durante el evento.' },
        tips: [
          'Visita el lugar antes del día: conoce la iluminación, los rincones especiales, los ángulos de luz natural.',
          'Lleva siempre dos cuerpos montados con diferentes lentes: uno para retratos (85mm) y otro para ambiente (24-35mm).',
          'El momento decisivo en una boda es irrepetible: anticipa, no reacciones. Estudia el orden del día.',
          'La batería de flash dura menos en condiciones de baja luz: lleva mínimo 3 baterías extra.',
          'Habla con los novios: saber sus momentos más importantes (primer baile, pastel, fuegos) te permite prepararte.',
        ],
        advertencias: [
          'Nunca falles en las fotos de grupo formal: son para el álbum de toda la vida. Haz mínimo 3 tomas de cada.',
          'La batería y tarjetas de memoria: formatea antes del evento y lleva el doble de lo que crees necesitar.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/1.8 – f/4.0',        explanation: 'Mismo rango para boda. El factor de crop ×1.5 con un 50mm f/1.8 da la perspectiva de un 75mm: ideal para retratos.' },
        velocidad:       { value: '1/125s – 1/500s',      explanation: 'Idénticas velocidades para congelar momentos en boda.' },
        iso:             { value: 'Auto ISO 800 – 6400',   explanation: 'APS-C moderno (Sony A7C II, Canon R10, Fujifilm X-S20) aguanta 3200-6400 con buena calidad para reportaje.' },
        balanceBlancos:  { value: 'AWB',                  explanation: 'AWB para la variabilidad de condiciones en boda. Corriges en RAW en post si hay dominante problemática.' },
        modoEnfoque:     { value: 'AF-C + Eye-AF',        explanation: 'El Eye-AF de Sony A6700 y Canon R7 son de los mejores en su clase para seguimiento en boda.' },
        medicion:        { value: 'Evaluativa +0.7EV',     explanation: 'Compensa el traje blanco: el medidor tiende a subexponerlo. +0.7EV preserva el detalle del vestido.' },
        disparo:         { value: 'Ráfaga 5-10fps',        explanation: 'APS-C moderno con ráfaga suficiente para capturar el momento decisivo en bodas.' },
        estabilizacion:  { value: 'Activado',              explanation: 'IBIS activo siempre en boda para la variabilidad de condiciones y velocidades.' },
        formato:         { value: 'RAW + JPEG',            explanation: 'Las Film Simulations de Fujifilm en JPEG son perfectas para entrega rápida con estilo cinematográfico.' },
        tips: [
          'El factor de crop da ventaja en alcance: con un 70-200mm APS-C tienes el equivalente a 300mm para la primera fila.',
          'El sistema APS-C (Fujifilm X-H2, Sony A6700) es más ligero y discreto que full frame para bodas largas.',
        ],
        advertencias: [
          'Con ISO 6400 en APS-C, el ruido en interiores oscuros puede ser visible. Prioriza la apertura amplia sobre el ISO.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/1.2 – f/2.8',        explanation: 'Bodas con M43 requieren lentes luminosos para interiores. El Olympus 17mm f/1.2 y 45mm f/1.2 Pro son esenciales.' },
        velocidad:       { value: '1/125s – 1/500s',      explanation: 'Mismas velocidades para congelar momentos en boda independientemente del sensor.' },
        iso:             { value: 'Auto ISO 800 – 3200',   explanation: 'M43 a 3200 da buen resultado en el OM-1 Mark II. Para condiciones más oscuras, prioriza apertura f/1.2 sobre ISO.' },
        balanceBlancos:  { value: 'AWB II',                explanation: 'El AWB II del OM-1 Mark II es el mejor del sistema M43. Preserva los tonos de piel con luces de salón.' },
        modoEnfoque:     { value: 'AF-C + Eye/Face detect', explanation: 'El AF con detección de sujeto del OM-1 Mark II es excelente para bodas: sigue personas en movimiento con precisión.' },
        medicion:        { value: 'Evaluativa +0.7EV',     explanation: 'Compensación para vestido blanco igual que en otros sistemas.' },
        disparo:         { value: 'Ráfaga silenciosa 120fps (Pro Capture)', explanation: 'Pro Capture del OM-1: 50fps con pre-captura de 35 frames. No perderás el primer beso o el lanzamiento del ramo.' },
        estabilizacion:  { value: 'IBIS máximo',           explanation: 'El IBIS del OM-1 Mark II (8.5 paradas) permite disparar a 1/30s en salones oscuros con resultados nítidos.' },
        formato:         { value: 'RAW + JPEG',            explanation: 'JPEG procesado de OM System con Picture Mode es competente para entrega directa al cliente.' },
        tips: [
          'El sistema M43 es el más ligero para bodas largas: menos cansancio después de 8-10 horas de reportaje.',
          'Pro Capture High del OM-1 graba 35 frames anteriores al disparo: el primer beso o el lanzamiento perfectos.',
        ],
        advertencias: [
          'f/2.8 en M43 da la misma profundidad de campo que f/5.6 en full frame. Para retratos de boda con fondo suave, necesitas f/1.2.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/2.8 – f/5.6',        explanation: 'El GFX en bodas es para los retratos formales y sesiones posadas. No para el reportaje dinámico del evento.' },
        velocidad:       { value: '1/125s – 1/500s',      explanation: 'Velocidades estándar para retratos posados de boda. El IBIS del GFX ayuda a mano alzada.' },
        iso:             { value: 'ISO 400 – 3200',        explanation: 'El GFX maneja bien ISO 800-1600. Para interiores oscuros de iglesias, ISO 3200 es el límite práctico.' },
        balanceBlancos:  { value: 'AWB / Flash (5500K)',   explanation: 'Flash de estudio para retratos de boda con GFX: la combinación definitiva para retratos de lujo.' },
        modoEnfoque:     { value: 'AF-S + Face/Eye-AF',    explanation: 'El AF del GFX es suficientemente rápido para retratos posados de boda. No para reportaje de acción rápida.' },
        medicion:        { value: 'Evaluativa / Manual con flash', explanation: 'Para retratos con flash externo, usa exposímetro de destello y Manual. Para reportaje, Evaluativa.' },
        disparo:         { value: 'Individual / Pequeña ráfaga', explanation: 'El GFX invita a trabajar con calma y atención. Cada toma es un resultado premium.' },
        estabilizacion:  { value: 'Activado',              explanation: 'El IBIS del GFX 100S II ayuda en condiciones de boda a mano alzada.' },
        formato:         { value: 'RAW 16-bit',            explanation: 'Los retratos de boda con el GFX a 100 Mpx son el estándar de la fotografía de lujo. Álbumes de gran formato incomparables.' },
        tips: [
          'El GFX para boda es ideal para la sesión de retratos formales: 30-60 minutos de shoot con flash de estudio portátil.',
          'Combina el GFX para retratos con un sistema mirrorless rápido (Sony A9 III) para el reportaje dinámico.',
        ],
        advertencias: [
          'El GFX no es adecuado como única cámara de boda: su AF es demasiado lento para el reportaje espontáneo del evento.',
        ],
      },
    },
  },

  // ─── RETRATO LUZ NATURAL ──────────────────────────────────
  {
    sceneId: 'retrato-luz-natural',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/1.8 – f/2.8',        explanation: 'Apertura amplia para bokeh suave que aísla al sujeto del fondo interior o exterior. El 85mm f/1.8 es el estándar.' },
        velocidad:       { value: '1/125s – 1/500s',      explanation: '1/125s mínimo para evitar movimiento de cámara y del sujeto. Con IBIS puedes bajar a 1/60s en situaciones difíciles.' },
        iso:             { value: 'ISO 200 – 1600',        explanation: 'Varía según la luz disponible de la ventana. Con luz directa de ventana grande: ISO 200-400. Con luz indirecta: ISO 800-1600.' },
        balanceBlancos:  { value: 'Sombra (6500K–7000K) / Nublado', explanation: 'La luz de ventana es fría (cielo). WB Sombra o Nublado calienta los tonos de piel y da calidez al retrato.' },
        modoEnfoque:     { value: 'AF-S + Eye-AF',         explanation: 'El ojo más cercano a la cámara siempre en foco. Eye-AF de Sony, Canon y Nikon funciona perfectamente con luz de ventana.' },
        medicion:        { value: 'Evaluativa',             explanation: 'La luz de ventana es consistente. Evaluativa da resultados correctos. Ajusta si el fondo es muy claro u oscuro.' },
        disparo:         { value: 'Individual / Ráfaga lenta (3-5fps)', explanation: 'Dispara ráfagas cortas de 3-5 tomas para capturar el mejor momento de expresión y parpadeo.' },
        estabilizacion:  { value: 'Activado',               explanation: 'IBIS siempre activo para retratos a mano alzada con luz de ventana en condiciones de baja iluminación.' },
        formato:         { value: 'RAW + JPEG',             explanation: 'RAW para ajuste fino de tonos de piel. JPEG para preview inmediato. La luz de ventana se procesa muy bien en RAW.' },
        tips: [
          'Posiciona al sujeto a 90° de la ventana (luz lateral) para crear sombras suaves y definer el volumen del rostro.',
          'Un reflector blanco en el lado opuesto a la ventana rellena las sombras suavemente sin flash.',
          'Busca ventanas orientadas al norte (hemisferio norte): dan luz indirecta suave todo el día sin rayos directos.',
          'La cortina blanca semitransparente difumina la luz directa del sol y la convierte en softbox natural.',
          'El suelo de madera, una silla vintage o un sofá neutro son fondos perfectos para retrato de ventana íntimo.',
        ],
        advertencias: [
          'La luz de ventana cambia rápidamente: monitoriza la exposición cada 10-15 minutos si la sesión es larga.',
          'Fondos de ventana muy luminosos pueden subexponer al sujeto. Mide en la piel, no en el fondo.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/1.8 – f/2.8',        explanation: 'Misma apertura para bokeh y luminosidad. El 56mm f/1.2 de Fujifilm (84mm equiv.) es una referencia absoluta.' },
        velocidad:       { value: '1/125s – 1/500s',      explanation: 'Igual que full frame. El IBIS de los sistemas APS-C modernos permite bajar si es necesario.' },
        iso:             { value: 'ISO 200 – 1600',        explanation: 'APS-C moderno a 800-1600 da excelentes resultados para retrato de ventana.' },
        balanceBlancos:  { value: 'Sombra / Nublado',     explanation: 'Mismo principio de calentar la luz fría de ventana. Las Film Simulations de Fujifilm son perfectas para piel.' },
        modoEnfoque:     { value: 'AF-S + Eye-AF',        explanation: 'El Eye-AF de Fujifilm X-H2S, Sony A6700 y Canon R7 es excelente para retratos de ventana.' },
        medicion:        { value: 'Evaluativa',            explanation: 'Evaluativa funciona bien con luz de ventana consistente.' },
        disparo:         { value: 'Individual / Ráfaga lenta', explanation: 'Ráfagas cortas de 3-5 tomas para las mejores expresiones.' },
        estabilizacion:  { value: 'Activado',              explanation: 'IBIS activo siempre en retratos a mano alzada con luz de ventana.' },
        formato:         { value: 'RAW + JPEG (Film Simulation)', explanation: 'Las Film Simulations de Fujifilm (Classic Chrome, Astia) dan un look de piel precioso en retrato de ventana.' },
        tips: [
          'El Fujifilm 56mm f/1.2 (84mm equiv.) y el 90mm f/2 son los estándares de retrato APS-C: bokeh excepcional.',
          'El factor de crop da distancia focal efectiva mayor: más distancia de trabajo que en full frame para el mismo encuadre.',
        ],
        advertencias: [
          'Con f/1.2 en APS-C, la profundidad de campo es muy pequeña aunque no tan extrema como en full frame con f/1.2.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/1.2 – f/2.0',        explanation: 'Para bokeh en M43 necesitas f/0.95 o f/1.2. El Olympus 45mm f/1.2 Pro (90mm equiv.) es perfecto para retrato de ventana.' },
        velocidad:       { value: '1/125s – 1/500s',      explanation: 'Velocidades estándar para retrato. El IBIS del OM-1 permite bajar a 1/60s con seguridad.' },
        iso:             { value: 'ISO 200 – 1600',        explanation: 'M43 en condiciones de ventana con lentes f/1.2 puede mantener ISO bajo incluso en luz de ventana moderada.' },
        balanceBlancos:  { value: 'Sombra / Nublado',     explanation: 'Mismo principio para calentar la luz fría. OM System tiene excelente reproducción de tonos de piel.' },
        modoEnfoque:     { value: 'AF-S + Eye/Face detect', explanation: 'El OM-1 Mark II con detección de ojo es muy preciso para retrato de ventana a f/1.2 donde el DOF es crítico.' },
        medicion:        { value: 'Evaluativa',            explanation: 'Medición evaluativa estándar para la luz consistente de ventana.' },
        disparo:         { value: 'Individual / Ráfaga lenta', explanation: 'El OM-1 permite ráfagas de 3-5 fps silenciosas para sesiones de retrato íntimas.' },
        estabilizacion:  { value: 'IBIS activado',         explanation: 'El IBIS del OM-1 Mark II (8.5 paradas) es clave para retrato de ventana en luz baja.' },
        formato:         { value: 'RAW + JPEG',            explanation: 'OM System procesa JPEG con colores de piel muy precisos. RAW para el retoque profesional.' },
        tips: [
          'El Olympus 45mm f/1.2 Pro (90mm equiv.) es uno de los mejores lentes de retrato del mercado en cualquier sistema.',
          'El bokeh a f/1.2 con M43 es equivalente a f/2.4 en full frame: hermoso pero más manejable.',
        ],
        advertencias: [
          'Con f/1.2 y detección de ojo, cualquier micro-movimiento del sujeto puede sacar el ojo del foco en M43. Ráfaga de 3 tomas por posición.' ,
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/2.8 – f/4.0',        explanation: 'El bokeh del GFX a f/2.8 con el sensor grande es absolutamente excepcional para retrato de ventana íntimo.' },
        velocidad:       { value: '1/125s – 1/500s',      explanation: 'Velocidades estándar para retrato. El GFX 100S II con IBIS da seguridad a mano alzada.' },
        iso:             { value: 'ISO 100 – 800',         explanation: 'El ISO 100 nativo del GFX con luz de ventana generosa da la máxima calidad posible. ISO 800 para ventana pequeña.' },
        balanceBlancos:  { value: 'Sombra / Nublado / Personalizado', explanation: 'Los 16 bits del GFX permiten ajustar el WB en post con total libertad. Fija en Sombra para calentar.' },
        modoEnfoque:     { value: 'AF-S + Face/Eye-AF',   explanation: 'El Face/Eye-AF del GFX es preciso y consistente para retratos de ventana posados.' },
        medicion:        { value: 'Evaluativa',            explanation: 'Evaluativa del GFX con el inmenso rango dinámico del sensor: perfecta para la variabilidad de la luz de ventana.' },
        disparo:         { value: 'Individual',            explanation: 'El GFX para retrato íntimo de ventana invita al trabajo lento: cada toma es deliberada y preciosa.' },
        estabilizacion:  { value: 'Activado',              explanation: 'El IBIS del GFX 100S II ayuda en retratos de ventana a mano alzada con luz moderada.' },
        formato:         { value: 'RAW 16-bit',            explanation: 'Los 100 Mpx del GFX para retrato de ventana revelan una textura y profundidad de piel incomparables.' },
        tips: [
          'El GFX para retrato de ventana editorial da una calidad de imagen que no tiene parangón para publicaciones de moda.',
          'La lente GF 80mm f/1.7 (63mm equiv.) con el GFX produce retratos de ventana absolutamente magistrales.',
        ],
        advertencias: [
          'A 100 Mpx, cualquier micro-movimiento del sujeto o la cámara se amplifican. Trabaja con velocidades de 1/250s o más.',
        ],
      },
    },
  },

  // ─── FAUNA SILVESTRE ──────────────────────────────────────
  {
    sceneId: 'fauna-silvestre',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/4 – f/8',             explanation: 'f/4-5.6 en teleobjetivos luminosos (500mm f/4, 600mm f/4). f/5.6-8 con teleconversor 1.4× para más alcance.' },
        velocidad:       { value: '1/1000s – 1/4000s',     explanation: '1/1000s para aves posadas. 1/2000s para aves en vuelo. 1/4000s para insectos o peces saliendo del agua.' },
        iso:             { value: 'Auto ISO 400 – 25600',   explanation: 'Auto ISO con límite máximo según el cuerpo. La A7S III y A9 III permiten ISO muy alto con calidad excepcional.' },
        balanceBlancos:  { value: 'Daylight / AWB',         explanation: 'Daylight para condiciones de sol estables. AWB para cambios rápidos de condiciones (nubes, sombras).' },
        modoEnfoque:     { value: 'AF-C + Bird/Animal Recognition', explanation: 'Sony Real-time Bird Eye-AF, Canon Animal AF, Nikon Animal Detection: los mejores sistemas del mercado para fauna.' },
        medicion:        { value: 'Evaluativa',             explanation: 'Evaluativa para la variabilidad de la naturaleza. Compensa -1EV con pájaros blancos (cigüeñas) o +1EV con fauna oscura.' },
        disparo:         { value: 'Ráfaga 20-120fps (electrónico)', explanation: 'El A9 III con 120fps o el R1 con 40fps: más tomas = más probabilidad de capturar el despegue perfecto.' },
        estabilizacion:  { value: 'IBIS + Lens IS combinados (modo deporte)', explanation: 'Activa el modo Deporte/Pan del IBIS. La combinación IBIS + IS del objetivo da hasta 7 paradas de compensación.' },
        formato:         { value: 'RAW + JPEG (para velocidad)', explanation: 'JPEG para entrega rápida a revistas o redes. RAW para la selección final y procesado de las mejores tomas.' },
        tips: [
          'La paciencia es la habilidad más importante en fauna: aprende los hábitos del animal antes de fotografiar.',
          'Un hide (escondite) de camuflaje o un coche son los mejores "trípodes" para no asustar a la fauna.',
          'La hora dorada y las primeras horas de la mañana son cuando los animales están más activos.',
          'Aprende el comportamiento del animal: un pájaro que estira las alas va a volar en 2-3 segundos.',
          'El modo de preenfoque y el burst con AF predictivo del A9 III dan una tasa de acierto extraordinaria.',
        ],
        advertencias: [
          'Respeta siempre la distancia de seguridad con la fauna salvaje. El teleobjetivo te permite alejarte y seguir trabajando.',
          'Los nidos de aves son zonas protegidas: nunca te acerques ni fotografíes nidos activos sin autorización.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/4 – f/8',             explanation: 'El factor de crop ×1.5 multiplica el alcance: un 500mm en APS-C equivale a 750mm. Ventaja real sobre full frame para fauna.' },
        velocidad:       { value: '1/1000s – 1/4000s',     explanation: 'Las mismas velocidades para congelar el movimiento animal. No depende del sensor.' },
        iso:             { value: 'Auto ISO 400 – 6400',    explanation: 'APS-C moderno aguanta bien 3200-6400. Fujifilm X-H2S es el campeón APS-C para fauna con su gran buffer.' },
        balanceBlancos:  { value: 'Daylight / AWB',         explanation: 'AWB para condiciones cambiantes de naturaleza. Daylight para sesiones estables en luz solar directa.' },
        modoEnfoque:     { value: 'AF-C + Bird/Animal Recognition', explanation: 'El X-H2S de Fujifilm y el Sony A6700 tienen detección de aves y animales muy precisa. Activa el modo específico.' },
        medicion:        { value: 'Evaluativa',             explanation: 'Evaluativa para la variabilidad de la naturaleza. Ajusta compensación según el tono del sujeto.' },
        disparo:         { value: 'Ráfaga 30-40fps (electrónico)', explanation: 'El X-H2S dispara 40fps en electrónico con AF completo. Suficiente para cualquier fauna, incluso aves en vuelo.' },
        estabilizacion:  { value: 'Activado (modo deporte)', explanation: 'IBIS en modo deporte/seguimiento. El A6700 y X-H2S tienen IBIS que funciona incluso con teleobjetivos.' },
        formato:         { value: 'RAW + JPEG',             explanation: 'JPEG para selección rápida de miles de tomas. RAW para las seleccionadas. El buffer del X-H2S aguanta 3 segundos de RAF.' },
        tips: [
          'El factor de crop ×1.5 convierte tu 300mm en 450mm equiv. en APS-C: alcance de fauna con lentes más ligeros y baratos.',
          'El X-H2S con el 150-600mm de Tamron (225-900mm equiv.) es una combinación de fauna increíblemente efectiva.',
        ],
        advertencias: [
          'El buffer del APS-C se llena más rápido que el full frame a alta ISO con RAW. Ajusta la velocidad de ráfaga si es necesario.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/4 – f/6.3',           explanation: 'Factor de crop ×2: un 300mm f/4 en M43 equivale a 600mm f/8. Los teleobjetivos M43 son mucho más ligeros.' },
        velocidad:       { value: '1/1000s – 1/4000s',     explanation: 'Las mismas velocidades necesarias independientemente del sensor.' },
        iso:             { value: 'Auto ISO 200 – 3200',    explanation: 'M43 requiere ISOs más conservadores para fauna. El OM-1 Mark II es el mejor del sistema para baja luz.' },
        balanceBlancos:  { value: 'AWB II',                 explanation: 'El AWB II del OM-1 Mark II es muy preciso en condiciones cambiantes de naturaleza.' },
        modoEnfoque:     { value: 'AF-C + Bird/Animal AI (OM-1 Mark II)', explanation: 'El OM-1 Mark II detecta y sigue 36 tipos de animales y 80 especies de aves. Considerado el mejor sistema M43 para fauna.' },
        medicion:        { value: 'Evaluativa',             explanation: 'Evaluativa del OM-1 Mark II muy precisa para condiciones naturales variables.' },
        disparo:         { value: 'Pro Capture 120fps',     explanation: 'Pro Capture del OM-1 Mark II graba 35 frames ANTES del disparo. Nunca perderás el momento decisivo en fauna.' },
        estabilizacion:  { value: 'IBIS + Lens IS (8.5 paradas)', explanation: 'La combinación IBIS + IS del OM-1 Mark II es la mejor del mercado. Crucial para teleobjetivos a mano alzada.' },
        formato:         { value: 'RAW + JPEG',             explanation: 'El JPEG del OM-1 con Subject Detection procesado en cámara ahorra tiempo en la selección. RAW para las mejores.' },
        tips: [
          'El sistema M43 para fauna tiene el mejor relación peso/alcance del mercado: el 300mm f/4 Pro (600mm equiv.) pesa solo 1.5kg.',
          'Pro Capture + Bird AI del OM-1 Mark II es considerado el sistema más avanzado para fotografía de aves en el mundo.',
          'El 40-150mm f/2.8 Pro con TC-2x (300mm equiv.) da 600mm f/5.6 en un paquete increíblemente compacto.',
        ],
        advertencias: [
          'A ISO 3200 en M43, el ruido puede ser problemático en sombras para fauna en condiciones de poca luz. Prefiere la velocidad de obturación sobre el ISO.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/4 – f/8',             explanation: 'El GFX no es la elección para fauna activa por su AF más lento. Ideal para fauna cooperativa (zoos, reservas con animales dóciles).' },
        velocidad:       { value: '1/500s – 1/2000s',      explanation: 'El GFX tiene 1/4000s de obturador. Para fauna moderadamente activa es suficiente.' },
        iso:             { value: 'Auto ISO 400 – 3200',    explanation: 'El GFX a 1600-3200 da buenos resultados aunque no compite con la A7S III para baja luz extrema.' },
        balanceBlancos:  { value: 'Daylight / AWB',         explanation: 'AWB en el GFX es preciso. La gama de color del GFX en naturaleza es extraordinaria.' },
        modoEnfoque:     { value: 'AF-C + Animal Recognition', explanation: 'El AF del GFX ha mejorado. Para fauna de movimiento moderado (mamíferos en reposo, aves posadas) funciona bien.' },
        medicion:        { value: 'Evaluativa',             explanation: 'Evaluativa del GFX para naturaleza. El enorme rango dinámico recupera sombras de animales en contraluz.' },
        disparo:         { value: 'Ráfaga 5fps',            explanation: 'El GFX a 5fps es limitado para fauna muy activa. Para fauna cooperativa o posada es más que suficiente.' },
        estabilizacion:  { value: 'Activado',               explanation: 'El IBIS del GFX 100S II da hasta 8 paradas: crucial para teleobjetivos a mano alzada.' },
        formato:         { value: 'RAW 16-bit',             explanation: 'El GFX para fauna en reservas da imágenes de calidad editorial para revistas de naturaleza: insuperables.' },
        tips: [
          'El GFX para fauna dócil o de zoo da una calidad de detalle (piel, plumaje, ojos) absolutamente extraordinaria.',
          'Usa el GFX para las sesiones posadas y tranquilas; lleva un sistema más rápido para la acción.',
        ],
        advertencias: [
          'El AF del GFX es demasiado lento para aves en vuelo o fauna en movimiento rápido. No es la herramienta adecuada.',
        ],
      },
    },
  },

  // ─── ARQUITECTURA ─────────────────────────────────────────
  {
    sceneId: 'arquitectura',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/8 – f/16',            explanation: 'Apertura cerrada para máxima nitidez y profundidad de campo total. La arquitectura requiere nitidez de borde a borde.' },
        velocidad:       { value: '1/30s – 1/250s',        explanation: 'Varía según la luz. Exterior en sol: 1/125-1/500s. Interior: 1/15-1/60s con trípode o ISO alto sin trípode.' },
        iso:             { value: 'ISO 50 – 400',           explanation: 'ISO mínimo posible para máxima calidad. En interiores sin trípode: hasta 1600-3200 según el sensor.' },
        balanceBlancos:  { value: 'Daylight (5500K) exterior / Manual interior', explanation: 'Exterior: Daylight preserva el azul del cielo. Interior: WB personalizado para la iluminación del espacio (3200K-5500K).' },
        modoEnfoque:     { value: 'Manual / AF-S',          explanation: 'Arquitectura es estática: AF-S con punto único o manual en el elemento más importante del encuadre.' },
        medicion:        { value: 'Evaluativa / HDR',       explanation: 'El rango dinámico en arquitectura (ventanas brillantes, sombras) puede requerir HDR: 3-5 tomas a diferentes EV.' },
        disparo:         { value: 'Temporizador 2s / Remoto', explanation: 'Trípode y sin tocar la cámara siempre para máxima nitidez arquitectónica.' },
        estabilizacion:  { value: 'IBIS desactivado con trípode', explanation: 'Trípode obligatorio para fotografía de arquitectura seria. IBIS desactivado con trípode.' },
        formato:         { value: 'RAW obligatorio',        explanation: 'RAW para corrección de perspectiva en Lightroom (Transform / Upright) y para el HDR si es necesario.' },
        tips: [
          'Los lentes de descentramiento (tilt-shift) corrigen la perspectiva convergente en cámara. No necesitas corrección en post.',
          'La "corrección de perspectiva" (Upright) en Lightroom o Photoshop corrige las líneas convergentes fácilmente.',
          'La hora azul (20 min antes/después del amanecer/puesta) da el equilibrio perfecto entre luz interior y exterior.',
          'Los ángulos a 45° muestran más información de un edificio que el frontal. Busca ángulos que cuenten la historia.',
          'El agua, los charcos y los reflejos doblan el impacto visual de la arquitectura: busca superficies reflectantes.',
        ],
        advertencias: [
          'Los interiores con luz mixta (ventanas + lámparas) pueden tener dominantes difíciles. Mezcla de WB requiere RAW.',
          'La distorsión de los lentes gran angular es muy visible en arquitectura: corrige en post o usa tilt-shift.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/8 – f/11',             explanation: 'Mismas reglas para arquitectura. El factor de crop amplía la distancia focal efectiva: gran angular real para encuadres amplios.' },
        velocidad:       { value: '1/30s – 1/250s',         explanation: 'Trípode para interiores. Exteriores con buena luz: velocidades altas suficientes.' },
        iso:             { value: 'ISO 50 – 400',            explanation: 'ISO mínimo en trípode. Sin trípode en interiores: hasta 3200 con el Fujifilm X-T5 de 40 Mpx da calidad excelente.' },
        balanceBlancos:  { value: 'Daylight exterior / Manual interior', explanation: 'Mismo principio. El Fujifilm X-T5 con 40 Mpx produce archivos de arquitectura de calidad casi medium-format.' },
        modoEnfoque:     { value: 'Manual / AF-S',           explanation: 'Arquitectura estática: AF-S o manual con LiveView ampliado para máxima nitidez.' },
        medicion:        { value: 'Evaluativa',              explanation: 'Evaluativa para exteriores. HDR para interiores con ventanas brillantes.' },
        disparo:         { value: 'Temporizador / Remoto',   explanation: 'Estándar para trípode.' },
        estabilizacion:  { value: 'Desactivado con trípode', explanation: 'Siempre desactivado con trípode en fotografía de arquitectura.' },
        formato:         { value: 'RAW',                    explanation: 'RAW para la corrección de perspectiva y el procesado de interiores HDR.' },
        tips: [
          'El Fujifilm X-T5 con 40 Mpx para arquitectura es una alternativa ligera y económica al medium format.',
          'Los lentes gran angular con corrección de distorsión (Fujifilm 10-24mm OIS) son perfectos para interiores.',
        ],
        advertencias: [
          'La difracción a f/16 en APS-C reduce nitidez. Máximo f/11 para las mejores tomas arquitectónicas.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/5.6 – f/11',           explanation: 'El punto de difracción en M43 llega antes. f/8 es el óptimo para arquitectura M43 con nitidez de borde a borde.' },
        velocidad:       { value: '1/30s – 1/250s',         explanation: 'Trípode para interiores y noche. Exteriores en buena luz: velocidades altas.' },
        iso:             { value: 'ISO 100 – 400',           explanation: 'ISO mínimo en trípode. El Live ND del OM System permite interiores sin trípode con velocidades lentas.' },
        balanceBlancos:  { value: 'Daylight exterior / Manual interior', explanation: 'WB manual en interiores es esencial en M43 para reproducción de color fiel de materiales.' },
        modoEnfoque:     { value: 'Manual / AF-S',           explanation: 'Manual en trípode para máximo control del punto de foco en arquitectura.' },
        medicion:        { value: 'Evaluativa',              explanation: 'El medidor del OM-1 Mark II es preciso. Use HDR o exposición múltiple para alto contraste.' },
        disparo:         { value: 'Temporizador / Remoto (app Bluetooth)', explanation: 'OM System tiene app Bluetooth para disparar sin tocar la cámara: perfecta para arquitectura en trípode.' },
        estabilizacion:  { value: 'Modo Trípode',            explanation: 'El OM-1 detecta el trípode automáticamente. Activa explícitamente para máxima estabilidad.' },
        formato:         { value: 'RAW + HDR en cámara',    explanation: 'El OM-1 Mark II tiene modo HDR en cámara: muy práctico para interiores con ventanas. RAW para procesado profesional.' },
        tips: [
          'El Live ND del OM System convierte el M43 en una herramienta versátil para exposiciones largas en arquitectura sin trípode.',
          'El sistema M43 con el Laowa 7.5mm f/2 (15mm equiv.) da el campo de visión ultraamplio para interiores reducidos.',
        ],
        advertencias: [
          'La difracción en M43 a f/11 puede reducir ligeramente la nitidez a 100%. Usa focus stacking si necesitas máxima calidad.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/8 – f/16',             explanation: 'El GFX para arquitectura profesional es la referencia del sector: 100 Mpx con nitidez absoluta de borde a borde.' },
        velocidad:       { value: '1/4s – 30s',             explanation: 'Trípode obligatorio y exposiciones largas para los interiores oscuros. El GFX captura hasta 16 bits en sombras profundas.' },
        iso:             { value: 'ISO 50 – 400',            explanation: 'ISO 100 nativo del GFX para exterior. En interiores oscuros ISO 400-800 da calidad excepcional para arquitectura.' },
        balanceBlancos:  { value: 'Daylight / Manual por zona (para LUT)', explanation: 'Los 16 bits del GFX permiten corrección de WB individual por zona en Capture One. Esencial para interiores complejos.' },
        modoEnfoque:     { value: 'Manual',                  explanation: '100 Mpx requieren enfoque perfecto. Manual con LiveView ampliado al 100% en el punto crítico del encuadre.' },
        medicion:        { value: 'Evaluativa / Puntual / HDR', explanation: 'El rango dinámico del GFX (15 EV) minimiza la necesidad de HDR, pero para interiores con ventanas sigue siendo útil.' },
        disparo:         { value: 'Tethering (Capture One) + Temporizador', explanation: 'El GFX en arquitectura profesional se usa siempre tethered a un Mac/PC. El cliente ve cada toma a 100% en tiempo real.' },
        estabilizacion:  { value: 'IBIS desactivado (trípode)', explanation: 'Trípode profesional pesado (Really Right Stuff, Gitzo) obligatorio. IBIS desactivado siempre.' },
        formato:         { value: 'RAW 16-bit + TIFF para entrega', explanation: 'El GFX para arquitectura editorial es el estándar para publicaciones de diseño interior y arquitectura de lujo.' },
        tips: [
          'El GFX para arquitectura de estudio (diseño interior, inmobiliaria de lujo, publicidad) produce imágenes incomparables.',
          'La corrección de perspectiva en Capture One con los 100 Mpx del GFX permite cortar y enderezar sin perder resolución.',
          'Considera lentes de descentramiento adaptados al GFX (Canon TS-E vía adaptador) para corrección nativa de perspectiva.',
        ],
        advertencias: [
          'Los archivos del GFX a 100 Mpx para arquitectura (HDR, múltiples ángulos) pueden superar los 50 GB por proyecto.',
        ],
      },
    },
  },

  // ─── NIEBLA Y ATMÓSFERA ───────────────────────────────────
  {
    sceneId: 'niebla-atmosfera',
    settings: {
      'full-frame': {
        apertura:        { value: 'f/4 – f/11',             explanation: 'La niebla reduce el contraste: no necesitas la máxima nitidez de f/16. f/5.6-8 da buen equilibrio para paisaje neblinoso.' },
        velocidad:       { value: '1/30s – 1/500s',         explanation: 'Varía según la intensidad de la niebla y la luz disponible. Con poca luz y niebla densa: trípode para velocidades largas.' },
        iso:             { value: 'ISO 200 – 1600',          explanation: 'La niebla reduce la luz disponible. Full frame permite ISOs más altos manteniendo la calidad en las zonas blancas de niebla.' },
        balanceBlancos:  { value: 'Nublado (6500K) / Personalizado', explanation: 'La niebla tiene temperatura fría. Nublado añade calidez. Para niebla azulada-fría, mantén AWB o Daylight.' },
        modoEnfoque:     { value: 'AF-S / Manual',           explanation: 'La niebla puede confundir al AF (bajo contraste). Si el AF falla, cambia a manual y enfoca en el sujeto principal.' },
        medicion:        { value: 'Evaluativa +0.7 – +1.5 EV', explanation: 'La niebla es muy luminosa: el medidor tiende a subexponer el blanco. Añade compensación positiva.' },
        disparo:         { value: 'Temporizador / Individual', explanation: 'Temporizador con trípode para largas exposiciones. Individual a mano alzada para capturas espontáneas.' },
        estabilizacion:  { value: 'IBIS activado',           explanation: 'IBIS siempre activo en niebla: la luz baja requiere velocidades lentas y el IBIS compensa el movimiento de cámara.' },
        formato:         { value: 'RAW',                    explanation: 'RAW para ajustar finamente la exposición del blanco de la niebla sin quemar los detalles en post.' },
        tips: [
          'La niebla matutina se disipa rápidamente después del amanecer: llega antes del alba y trabaja rápido.',
          'Los objetos que emergen de la niebla (árboles, postes, figuras) crean el efecto más dramático.',
          'La exposición larga (varios segundos) convierte la niebla en movimiento: suaviza y crea ondas en la niebla.',
          'La dirección de la luz en la niebla importa: la luz de costado crea capas volumétricas impresionantes.',
          'Los bosques de pinos con niebla matutina y luz cenital dan un ambiente casi místico difícil de replicar en otro momento.',
        ],
        advertencias: [
          'La humedad de la niebla puede empañar el objetivo: lleva siempre un paño de microfibra y cubre la cámara cuando no disparas.',
          'La niebla puede meterse por las juntas del cuerpo: evita cambios de lente en condiciones de niebla muy densa.',
        ],
      },
      'aps-c': {
        apertura:        { value: 'f/4 – f/11',             explanation: 'Mismo rango que full frame para paisaje de niebla.' },
        velocidad:       { value: '1/30s – 1/500s',         explanation: 'Depende de la intensidad de la niebla y la luz. Trípode para velocidades lentas.' },
        iso:             { value: 'ISO 200 – 1600',          explanation: 'APS-C moderno aguanta bien 800-1600 en las zonas de niebla donde el ruido es menos visible.' },
        balanceBlancos:  { value: 'Nublado / AWB',          explanation: 'AWB o Nublado para la temperatura de la niebla. Las Film Simulations de Fujifilm dan carácter único a la niebla.' },
        modoEnfoque:     { value: 'AF-S / Manual',           explanation: 'El AF puede fallar en niebla densa (bajo contraste). Manual en los puntos de interés que emergen de la niebla.' },
        medicion:        { value: 'Evaluativa +1EV',         explanation: 'Compensación positiva para preservar el blanco detallado de la niebla sin quemarlo.' },
        disparo:         { value: 'Individual / Temporizador', explanation: 'Temporizador con trípode. Individual para capturas espontáneas de niebla en movimiento.' },
        estabilizacion:  { value: 'Activado',               explanation: 'IBIS activo siempre en niebla para las velocidades lentas requeridas por la baja luz.' },
        formato:         { value: 'RAW',                    explanation: 'RAW para el ajuste del blanco de la niebla y la recuperación de detalles en zonas de alta luminosidad.' },
        tips: [
          'La Film Simulation "Acros" de Fujifilm en blanco y negro da una atmósfera extraordinaria a la fotografía de niebla.',
          'El factor de crop ×1.5 puede ayudar: más alcance focal para aislar elementos específicos que emergen de la niebla.',
        ],
        advertencias: [
          'La humedad afecta igualmente a todos los sistemas. Protege la cámara APS-C con una funda impermeable si la niebla es muy densa.',
        ],
      },
      'micro-four-thirds': {
        apertura:        { value: 'f/4 – f/8',              explanation: 'f/8 es el máximo recomendable en M43 para niebla y paisaje sin comprometer la nitidez por difracción.' },
        velocidad:       { value: '1/30s – 1/500s',         explanation: 'IBIS del OM-1 permite velocidades lentas a mano alzada en niebla con poca luz.' },
        iso:             { value: 'ISO 200 – 1600',          explanation: 'M43 a ISO 800-1600 da buenos resultados en las zonas de niebla que tienden a ser brillantes y limpias.' },
        balanceBlancos:  { value: 'Nublado / AWB II',       explanation: 'El AWB II del OM-1 Mark II es muy preciso para las condiciones de luz difusa de la niebla.' },
        modoEnfoque:     { value: 'AF-S / Manual',           explanation: 'En niebla muy densa, el AF de bajo contraste puede fallar. Manual sobre el sujeto que emerge de la niebla.' },
        medicion:        { value: 'Evaluativa +0.7EV',       explanation: 'Compensación positiva para el blanco de la niebla. El live view del OM-1 muestra la exposición en tiempo real.' },
        disparo:         { value: 'Individual / Live Composite para niebla en movimiento', explanation: 'Live Composite del OM System permite acumular la luz de la niebla en movimiento en tiempo real.' },
        estabilizacion:  { value: 'IBIS máximo activado',   explanation: 'El IBIS del OM-1 Mark II (8.5 paradas) es clave para niebla a mano alzada con poca luz.' },
        formato:         { value: 'RAW + JPEG',              explanation: 'El procesado de JPEG en OM System con colores suaves es muy apropiado para el mood de la niebla.' },
        tips: [
          'El Live ND del OM System permite exposiciones largas sin trípode para suavizar la niebla en movimiento: único.',
          'El sistema M43 es compacto y ligero: perfecto para salir de madrugada a buscar la niebla matutina sin esfuerzo.',
        ],
        advertencias: [
          'La niebla y la humedad afectan los sistemas electrónicos. Muchos cuerpos M43 tienen sellado climatológico (OM-1, G9 II): aprovéchalo.',
        ],
      },
      'medium-format': {
        apertura:        { value: 'f/5.6 – f/11',           explanation: 'El GFX para paisaje de niebla da una atmósfera y textura excepcionales. f/8 es el punto dulce de nitidez.' },
        velocidad:       { value: '1/15s – 1/250s',         explanation: 'Trípode para velocidades lentas que suavizan la niebla en movimiento. El IBIS del GFX ayuda a mano alzada.' },
        iso:             { value: 'ISO 100 – 800',           explanation: 'ISO 100-200 nativo del GFX con trípode. ISO 400-800 para niebla a mano alzada con el IBIS del GFX 100S II.' },
        balanceBlancos:  { value: 'Nublado / Personalizado', explanation: 'Los 16 bits del GFX permiten ajustar el WB en post perfectamente. Fija Nublado para calentar la atmósfera.' },
        modoEnfoque:     { value: 'AF-S / Manual',           explanation: 'Manual en niebla densa donde el AF puede fallar. Los 100 Mpx del GFX requieren enfoque perfecto.' },
        medicion:        { value: 'Evaluativa +1EV',         explanation: 'Compensación positiva para el blanco de la niebla. El GFX con 16 bits de RAW recupera cualquier detalle de niebla.' },
        disparo:         { value: 'Temporizador / Cable remoto', explanation: 'Con trípode y cable remoto para máxima estabilidad en las velocidades lentas de la niebla.' },
        estabilizacion:  { value: 'IBIS desactivado con trípode / Activado a mano', explanation: 'En trípode: IBIS OFF. A mano alzada: el IBIS del GFX 100S II da 8 paradas de compensación.' },
        formato:         { value: 'RAW 16-bit',             explanation: 'Los 100 Mpx del GFX en niebla crean imágenes de una profundidad y atmósfera absolutamente únicas para galería.' },
        tips: [
          'El GFX en paisaje de niebla para impresión de galería es excepcional: la textura de la niebla a 100 Mpx es de otra dimensión.',
          'Considera el Pixel Shift Multi-Shot del GFX en escenas de niebla estática para resoluciones superiores a 400 Mpx.',
        ],
        advertencias: [
          'El GFX no tiene sellado climatológico tan robusto como el OM-1: en niebla muy densa, usa fundas de protección.',
        ],
      },
    },
  },
];

// ─────────────────────────────────────────────────────────────
// ACCESSOR FUNCTIONS
// ─────────────────────────────────────────────────────────────

export const getSettingsForScene = (
  sceneId: string,
  sensor: SensorType
): SceneSensorSettings | null => {
  const entry = allSceneSettings.find((s) => s.sceneId === sceneId);
  if (!entry) return null;
  return entry.settings[sensor] ?? null;
};

export const hasDetailedSettings = (sceneId: string): boolean =>
  allSceneSettings.some((s) => s.sceneId === sceneId);
