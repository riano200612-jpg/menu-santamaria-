import { Idioma } from '../types';

export type CategoriaBebidaId =
  | 'cocteles-piratas'
  | 'vinos-y-sangrias'
  | 'whisky'
  | 'cervezas'
  | 'limonadas'
  | 'jugos'
  | 'aguas'
  | 'gaseosas'
  | 'cafe';

export interface PresentacionPrecio {
  presentacion: string; // ej: 'Copa', 'Botella', 'Trago'
  presentacionEn?: string; // ej: 'Glass', 'Bottle', 'Shot'
  precio: number;
  precioFormateado: string; // ej: '$ 20.000' o '$ 90.000'
}

export interface ItemBebida {
  id: string;
  nombre: string;
  nombreEn?: string;
  subtitulo?: string;
  subtituloEn?: string;
  ingredientes: {
    es: string;
    en?: string;
  };
  precio: number;
  precioTexto: string;
  preciosDetalle?: PresentacionPrecio[];
}

export interface CategoriaBebidas {
  id: CategoriaBebidaId;
  nombre: {
    es: string;
    en: string;
  };
  subtitulo?: {
    es: string;
    en: string;
  };
  items: ItemBebida[];
}

export const CATEGORIAS_BEBIDAS: CategoriaBebidas[] = [
  // --------------------------------------------------------------------------
  // 1. CÓCTELES PIRATAS (Página 5)
  // --------------------------------------------------------------------------
  {
    id: 'cocteles-piratas',
    nombre: {
      es: 'CÓCTELES PIRATAS',
      en: 'PIRATE COCKTAILS',
    },
    subtitulo: {
      es: 'Creaciones de autor con rones añejos y frutas del trópico',
      en: 'Signature creations with aged rums and tropical fruits',
    },
    items: [
      {
        id: 'coctel-el-tesoro-escondido',
        nombre: 'EL TESORO ESCONDIDO',
        nombreEn: 'The Hidden Treasure',
        ingredientes: {
          es: 'Ron añejo, piña, maracuyá, jarabe de canela, limón',
          en: 'Aged rum, pineapple, passion fruit, cinnamon syrup, lime',
        },
        precio: 45000,
        precioTexto: '45.000 COP',
      },
      {
        id: 'coctel-perla-negra',
        nombre: 'PERLA NEGRA',
        nombreEn: 'Black Pearl',
        ingredientes: {
          es: 'Vodka, licor de café, crema de coco, hielo frappé.',
          en: 'Vodka, coffee liqueur, coconut cream, crushed ice',
        },
        precio: 50000,
        precioTexto: '50.000 COP',
      },
      {
        id: 'coctel-tormenta-del-caribe',
        nombre: 'TORMENTA DEL CARIBE',
        nombreEn: 'Caribbean Storm',
        ingredientes: {
          es: 'Ron blanco, ron oscuro, jugo de naranja, limón, granadina',
          en: 'White rum, dark rum, orange juice, lime, grenadine',
        },
        precio: 55000,
        precioTexto: '55.000 COP',
      },
      {
        id: 'coctel-sirena-encantada',
        nombre: 'SIRENA ENCANTADA',
        nombreEn: 'Enchanted Mermaid',
        ingredientes: {
          es: 'Ginebra, pepino, albahaca fresca, limón, soda',
          en: 'Gin, cucumber, fresh basil, lemon, soda',
        },
        precio: 40000,
        precioTexto: '40.000 COP',
      },
      {
        id: 'coctel-barbanegra',
        nombre: 'BARBANEGRA',
        nombreEn: 'Blackbeard',
        ingredientes: {
          es: 'Ron especiado, cerveza de jengibre, lima, angostura',
          en: 'Spiced rum, ginger beer, lime, Angostura',
        },
        precio: 55000,
        precioTexto: '55.000 COP',
      },
      {
        id: 'coctel-mapa-del-tesoro',
        nombre: 'MAPA DEL TESORO',
        nombreEn: 'Treasure Map',
        ingredientes: {
          es: 'Tequila, triple sec, maracuyá, limón, sal marina',
          en: 'Tequila, triple sec, passion fruit, lemon, sea salt',
        },
        precio: 50000,
        precioTexto: '50.000 COP',
      },
      {
        id: 'coctel-brisa-de-altamar',
        nombre: 'BRISA DE ALTAMAR',
        nombreEn: 'High Seas Breeze',
        ingredientes: {
          es: 'Vodka, arándanos, limón, soda',
          en: 'Vodka, cranberries, lemon, soda',
        },
        precio: 35000,
        precioTexto: '35.000 COP',
      },
      {
        id: 'coctel-canonazo',
        nombre: 'CAÑONAZO',
        nombreEn: 'Cannon Shot',
        ingredientes: {
          es: 'Mezcal, jugo de tamarindo, chile en polvo, limón',
          en: 'Mezcal, tamarind juice, chili powder, lemon',
        },
        precio: 60000,
        precioTexto: '60.000 COP',
      },
      {
        id: 'coctel-corsario-dorado',
        nombre: 'CORSARIO DORADO',
        nombreEn: 'Golden Corsair',
        ingredientes: {
          es: 'Ron dorado, miel, limón, jengibre fresco',
          en: 'Golden rum, honey, lemon, fresh ginger',
        },
        precio: 50000,
        precioTexto: '50.000 COP',
      },
      {
        id: 'coctel-isla-perdida',
        nombre: 'ISLA PERDIDA',
        nombreEn: 'Lost Island',
        ingredientes: {
          es: 'Ron blanco Havana, piña, mango, crema de coco',
          en: 'Havana white rum, pineapple, mango, coconut cream',
        },
        precio: 45000,
        precioTexto: '45.000 COP',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. VINOS, SANGRIAS Y TINTO DE VERANO (Página 6)
  // --------------------------------------------------------------------------
  {
    id: 'vinos-y-sangrias',
    nombre: {
      es: 'VINOS',
      en: 'WINES',
    },
    subtitulo: {
      es: 'Cavas por botella y copa, sangrías y tinto de verano',
      en: 'Cellar by bottle and glass, sangrias, and summer wine',
    },
    items: [
      {
        id: 'vino-rosaleda-merlot',
        nombre: 'Rosaleda',
        ingredientes: {
          es: 'Vino tinto chileno merlot',
          en: 'Chilean red wine merlot',
        },
        precio: 90000,
        precioTexto: 'Copa: $20.000 | Botella: $90.000',
        preciosDetalle: [
          { presentacion: 'Copa', presentacionEn: 'Glass', precio: 20000, precioFormateado: '$20.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 90000, precioFormateado: '$90.000' },
        ],
      },
      {
        id: 'vino-rosaleda-cabernet-sauvignon',
        nombre: 'Rosaleda',
        ingredientes: {
          es: 'Vino chileno rosado cabernet sauvignon',
          en: 'Chilean rosé wine cabernet sauvignon',
        },
        precio: 90000,
        precioTexto: 'Copa: $20.000 | Botella: $90.000',
        preciosDetalle: [
          { presentacion: 'Copa', presentacionEn: 'Glass', precio: 20000, precioFormateado: '$20.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 90000, precioFormateado: '$90.000' },
        ],
      },
      {
        id: 'vino-rosaleda-sauvignon-blanc',
        nombre: 'Rosaleda',
        ingredientes: {
          es: 'Vino chileno sauvignon blanc',
          en: 'Chilean sauvignon blanc',
        },
        precio: 90000,
        precioTexto: 'Copa: $20.000 | Botella: $90.000',
        preciosDetalle: [
          { presentacion: 'Copa', presentacionEn: 'Glass', precio: 20000, precioFormateado: '$20.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 90000, precioFormateado: '$90.000' },
        ],
      },
      {
        id: 'vino-de-los-rios-chardonnay',
        nombre: 'De los ríos',
        ingredientes: {
          es: 'Chardonay (Argentina)',
          en: 'Chardonnay (Argentina)',
        },
        precio: 90000,
        precioTexto: 'Copa: $20.000 | Botella: $90.000',
        preciosDetalle: [
          { presentacion: 'Copa', presentacionEn: 'Glass', precio: 20000, precioFormateado: '$20.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 90000, precioFormateado: '$90.000' },
        ],
      },
      {
        id: 'vino-santa-carolina-reservado',
        nombre: 'Santa Carolina Reservado',
        subtitulo: 'VINO BLANCO',
        ingredientes: {
          es: 'Vino chileno chardonnay',
          en: 'Chilean wine chardonnay',
        },
        precio: 140000,
        precioTexto: 'Copa: $30.000 | Botella: $140.000',
        preciosDetalle: [
          { presentacion: 'Copa', presentacionEn: 'Glass', precio: 30000, precioFormateado: '$30.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 140000, precioFormateado: '$140.000' },
        ],
      },
      {
        id: 'vino-frontera-michel-torino',
        nombre: 'Frontera Michel Torino',
        subtitulo: 'VINO BLANCO',
        ingredientes: {
          es: 'Vino blanco',
          en: 'White wine',
        },
        precio: 190000,
        precioTexto: 'Botella: $190.000',
        preciosDetalle: [
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 190000, precioFormateado: '$190.000' },
        ],
      },
      {
        id: 'vino-santa-helena-reservado',
        nombre: 'Santa Helena Reservado',
        subtitulo: 'VINO BLANCO',
        ingredientes: {
          es: 'Vino blanco',
          en: 'White wine',
        },
        precio: 160000,
        precioTexto: 'Botella: $160.000',
        preciosDetalle: [
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 160000, precioFormateado: '$160.000' },
        ],
      },
      {
        id: 'vino-jp-chenet',
        nombre: 'Jp chenet',
        ingredientes: {
          es: 'Vino espumoso rosado francés',
          en: 'French sparkling rosé wine',
        },
        precio: 49000,
        precioTexto: 'Botella: $49.000',
        preciosDetalle: [
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 49000, precioFormateado: '$49.000' },
        ],
      },
      {
        id: 'sangrias',
        nombre: 'SANGRIAS',
        nombreEn: 'Sangrias',
        ingredientes: {
          es: 'Vino tinto o blanco con frutas frescas y toques de licor',
          en: 'Red or white wine with fresh fruits and touch of liqueur',
        },
        precio: 130000,
        precioTexto: 'Copa: $35.000 | Botella: $130.000',
        preciosDetalle: [
          { presentacion: 'Copa', presentacionEn: 'Glass', precio: 35000, precioFormateado: '$35.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 130000, precioFormateado: '$130.000' },
        ],
      },
      {
        id: 'tinto-de-verano',
        nombre: 'TINTO DE VERANO',
        nombreEn: 'Tinto de Verano',
        ingredientes: {
          es: 'Vino tinto con gaseosa de limón y rodajas de cítricos',
          en: 'Red wine with lemon soda and citrus slices',
        },
        precio: 120000,
        precioTexto: 'Copa: $30.000 | Botella: $120.000',
        preciosDetalle: [
          { presentacion: 'Copa', presentacionEn: 'Glass', precio: 30000, precioFormateado: '$30.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 120000, precioFormateado: '$120.000' },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 3. WHISKY (Página 6)
  // --------------------------------------------------------------------------
  {
    id: 'whisky',
    nombre: {
      es: 'WHISKY',
      en: 'WHISKY',
    },
    subtitulo: {
      es: 'Single Malt y Blended Scotch por trago o botella',
      en: 'Single Malt & Blended Scotch by shot or bottle',
    },
    items: [
      {
        id: 'whisky-singleton-12',
        nombre: 'Singleton 12 años',
        subtitulo: 'SINGLE MALT',
        ingredientes: {
          es: 'Single Malt Scotch Whisky 12 años',
          en: '12-year-old Single Malt Scotch Whisky',
        },
        precio: 420000,
        precioTexto: 'Trago: $40.000 | Botella: $420.000',
        preciosDetalle: [
          { presentacion: 'Trago', presentacionEn: 'Shot', precio: 40000, precioFormateado: '$40.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 420000, precioFormateado: '$420.000' },
        ],
      },
      {
        id: 'whisky-johnny-walker-black',
        nombre: 'Johnny Walker Black label 12 años',
        subtitulo: 'BLENDED SCOTCH',
        ingredientes: {
          es: 'Blended Scotch Whisky 12 años',
          en: '12-year-old Blended Scotch Whisky',
        },
        precio: 360000,
        precioTexto: 'Trago: $35.000 | Botella: $360.000',
        preciosDetalle: [
          { presentacion: 'Trago', presentacionEn: 'Shot', precio: 35000, precioFormateado: '$35.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 360000, precioFormateado: '$360.000' },
        ],
      },
      {
        id: 'whisky-old-parr-12',
        nombre: 'Old parr 12 años',
        subtitulo: 'BLENDED SCOTCH',
        ingredientes: {
          es: 'Blended Scotch Whisky 12 años',
          en: '12-year-old Blended Scotch Whisky',
        },
        precio: 360000,
        precioTexto: 'Trago: $35.000 | Botella: $360.000',
        preciosDetalle: [
          { presentacion: 'Trago', presentacionEn: 'Shot', precio: 35000, precioFormateado: '$35.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 360000, precioFormateado: '$360.000' },
        ],
      },
      {
        id: 'whisky-buchanans-deluxe-12',
        nombre: 'Buchanans de luxe 12 años',
        subtitulo: 'BLENDED SCOTCH',
        ingredientes: {
          es: 'Blended Scotch Whisky 12 años',
          en: '12-year-old Blended Scotch Whisky',
        },
        precio: 380000,
        precioTexto: 'Trago: $40.000 | Botella: $380.000',
        preciosDetalle: [
          { presentacion: 'Trago', presentacionEn: 'Shot', precio: 40000, precioFormateado: '$40.000' },
          { presentacion: 'Botella', presentacionEn: 'Bottle', precio: 380000, precioFormateado: '$380.000' },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 4. CERVEZA (Página 7)
  // --------------------------------------------------------------------------
  {
    id: 'cervezas',
    nombre: {
      es: 'CERVEZA',
      en: 'BEER',
    },
    subtitulo: {
      es: 'Nacionales, importadas, línea artesanal 3 Cordilleras y michelada',
      en: 'Domestic, imported, 3 Cordilleras craft line, and michelada',
    },
    items: [
      {
        id: 'cerveza-club-colombia-dorado',
        nombre: 'Club Colombia',
        ingredientes: { es: 'Cerveza tipo lager dorada tradicional' },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'cerveza-aguila-original',
        nombre: 'Águila Original',
        ingredientes: { es: 'Cerveza clásica tipo lager colombiana' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'cerveza-aguila-light',
        nombre: 'Águila Light',
        ingredientes: { es: 'Cerveza lager ligera y refrescante' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'cerveza-corona',
        nombre: 'Corona',
        ingredientes: { es: 'Cerveza mexicana servida con limón' },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'cerveza-corona-cero',
        nombre: 'Corona Cero',
        ingredientes: { es: 'Cerveza sin alcohol 0.0%' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'cerveza-heineken',
        nombre: 'Heineken',
        ingredientes: { es: 'Cerveza premium pura malta lager' },
        precio: 14000,
        precioTexto: '$ 14.000',
      },
      {
        id: 'cerveza-stella-artois',
        nombre: 'Stella Artois',
        ingredientes: { es: 'Cerveza premium lager belga' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'cerveza-3-cordilleras-negra',
        nombre: '3 Cordilleras Negra',
        ingredientes: { es: 'Cerveza artesanal tipo Stout con notas a café y chocolate' },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'cerveza-3-cordilleras-mulata',
        nombre: '3 Cordilleras Mulata',
        ingredientes: { es: 'Cerveza artesanal tipo Amber Ale tostada' },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'cerveza-3-cordilleras-rose',
        nombre: '3 Cordilleras Rose',
        ingredientes: { es: 'Cerveza artesanal tipo Rosé con frutos rojos' },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'cerveza-3-cordilleras-mestiza',
        nombre: '3 Cordilleras Mestiza',
        ingredientes: { es: 'Cerveza artesanal tipo American Pale Ale' },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'cerveza-3-cordilleras-mona',
        nombre: '3 Cordilleras Mona',
        ingredientes: { es: 'Cerveza artesanal tipo Blonde Ale' },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'cerveza-3-cordilleras-blanca',
        nombre: '3 Cordilleras Blanca',
        ingredientes: { es: 'Cerveza artesanal de trigo tipo Witbier' },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'cerveza-michelada',
        nombre: 'Michelada',
        ingredientes: { es: 'Preparación con zumo de limón y borde escarchado en sal' },
        precio: 3000,
        precioTexto: '$ 3.000',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 5. LIMONADAS (Página 7)
  // --------------------------------------------------------------------------
  {
    id: 'limonadas',
    nombre: {
      es: 'LIMONADAS',
      en: 'LEMONADES',
    },
    subtitulo: {
      es: 'Preparadas frescas al instante con recetas caribeñas',
      en: 'Freshly prepared with authentic Caribbean recipes',
    },
    items: [
      {
        id: 'limonada-de-coco',
        nombre: 'Limonada De Coco',
        ingredientes: {
          es: 'Limón y leche de coco cremosa natural',
          en: 'Fresh lime and natural coconut milk',
        },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'limonada-cerezada',
        nombre: 'Limonada Cerezada',
        ingredientes: {
          es: 'Limón fresco con infusión de cerezas',
          en: 'Fresh lime with cherry infusion',
        },
        precio: 20000,
        precioTexto: '$ 20.000',
      },
      {
        id: 'limonada-de-hierbabuena',
        nombre: 'Limonada de Hierbabuena',
        ingredientes: {
          es: 'Limón fresco con hojas maceradas de hierbabuena',
          en: 'Fresh lime muddled with fresh mint leaves',
        },
        precio: 18000,
        precioTexto: '$ 18.000',
      },
      {
        id: 'limonada-natural',
        nombre: 'Limonada Natural',
        ingredientes: {
          es: 'Zumo de limón natural recién exprimido',
          en: 'Freshly squeezed natural lime juice',
        },
        precio: 15000,
        precioTexto: '$ 15.000',
      },
      {
        id: 'limonada-brasilera',
        nombre: 'Limonada Brasilera',
        ingredientes: {
          es: 'Limón batido con leche condensada y hielo',
          en: 'Lime blended with condensed milk and ice',
        },
        precio: 18000,
        precioTexto: '$ 18.000',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 6. JUGOS (Página 7)
  // --------------------------------------------------------------------------
  {
    id: 'jugos',
    nombre: {
      es: 'JUGOS',
      en: 'JUICES',
    },
    subtitulo: {
      es: 'Frutas tropicales colombianas en agua o en leche ($16.000 c/u)',
      en: 'Colombian tropical fruits in water or milk ($16.000 each)',
    },
    items: [
      {
        id: 'jugo-mango',
        nombre: 'Mango',
        ingredientes: { es: 'Jugo natural de mango (en agua o en leche)' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'jugo-guanabana',
        nombre: 'Guanabana',
        ingredientes: { es: 'Jugo natural de guanábana (en agua o en leche)' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'jugo-lulo',
        nombre: 'Lulo',
        ingredientes: { es: 'Jugo natural de lulo (en agua o en leche)' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'jugo-fresa',
        nombre: 'Fresa',
        ingredientes: { es: 'Jugo natural de fresa (en agua o en leche)' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'jugo-maracuya',
        nombre: 'Maracuyá',
        ingredientes: { es: 'Jugo natural de maracuyá (en agua o en leche)' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'jugo-corozo',
        nombre: 'Corozo',
        ingredientes: { es: 'Jugo artesanal tradicional de corozo cartagenero' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'jugo-pina',
        nombre: 'Piña',
        ingredientes: { es: 'Jugo natural de piña fresca' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'jugo-mandarina',
        nombre: 'Mandarina',
        ingredientes: { es: 'Zumo recién exprimido de mandarina' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'jugo-mango-biche',
        nombre: 'Mango Biche',
        ingredientes: { es: 'Preparación caribeña con mango verde, sal y limón' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
      {
        id: 'jugo-mora',
        nombre: 'Mora',
        ingredientes: { es: 'Jugo natural de mora (en agua o en leche)' },
        precio: 16000,
        precioTexto: '$ 16.000',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 7. AGUAS (Página 7)
  // --------------------------------------------------------------------------
  {
    id: 'aguas',
    nombre: {
      es: 'AGUAS',
      en: 'WATERS & MIXERS',
    },
    subtitulo: {
      es: 'Aguas puras, gasificadas, tónicas y mezcladores',
      en: 'Still, sparkling water, tonics, and mixers',
    },
    items: [
      {
        id: 'agua-sin-gas',
        nombre: 'Agua Sin Gas',
        nombreEn: 'Still Water',
        ingredientes: { es: 'Agua pura sin gas en botella' },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'agua-con-gas',
        nombre: 'Agua Con Gas',
        nombreEn: 'Sparkling Water',
        ingredientes: { es: 'Agua mineral con gas en botella' },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'schweppes-agua-tonica',
        nombre: 'Schwppes Agua Tonica',
        nombreEn: 'Schweppes Tonic Water',
        ingredientes: { es: 'Agua tónica con quinina' },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'schweppes-soda',
        nombre: 'Schwppes Soda',
        nombreEn: 'Schweppes Club Soda',
        ingredientes: { es: 'Agua con gas / soda Schweppes' },
        precio: 7000,
        precioTexto: '$ 7.000',
      },
      {
        id: 'schweppes-ginger',
        nombre: 'Schwppes Ginger',
        nombreEn: 'Schweppes Ginger Ale',
        ingredientes: { es: 'Gaseosa sabor ginger ale de jengibre' },
        precio: 7000,
        precioTexto: '$ 7.000',
      },
      {
        id: 'soda-bretana',
        nombre: 'Soda Bretaña',
        ingredientes: { es: 'Agua con gas carbonatada Bretaña' },
        precio: 10000,
        precioTexto: '$ 10.000',
      },
      {
        id: 'zumo-limon',
        nombre: 'Zumo Limón',
        nombreEn: 'Lime Juice Shot',
        ingredientes: { es: 'Porción de zumo de limón natural fresco' },
        precio: 3000,
        precioTexto: '$ 3.000',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 8. GASEOSAS (Página 7)
  // --------------------------------------------------------------------------
  {
    id: 'gaseosas',
    nombre: {
      es: 'GASEOSAS',
      en: 'SOFT DRINKS & TEAS',
    },
    subtitulo: {
      es: 'Refrescos clásicos, Kola Román tradicional y tés Hatsu',
      en: 'Classic soft drinks, traditional Kola Román, and Hatsu teas',
    },
    items: [
      {
        id: 'gaseosa-coca-cola',
        nombre: 'Coca Cola',
        ingredientes: { es: 'Refresco carbonatado clásico' },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'gaseosa-coca-cola-sin-azucar',
        nombre: 'Coca Cola Sin Azucar',
        ingredientes: { es: 'Refresco carbonatado sin azúcar ni calorías' },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'gaseosa-kola-roman',
        nombre: 'Kola Roman',
        ingredientes: {
          es: 'Gaseosa tradicional cartagenera centenaria color rubí',
          en: 'Traditional red sparkling soda from Cartagena',
        },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'gaseosa-quattro',
        nombre: 'Quattro',
        ingredientes: { es: 'Gaseosa sabor a toronja' },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'gaseosa-sprite',
        nombre: 'Sprite',
        ingredientes: { es: 'Refresco sabor lima-limón' },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'gaseosa-pepsi',
        nombre: 'Pepsi',
        ingredientes: { es: 'Refresco clásico sabor cola' },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'gaseosa-manzana-postobon',
        nombre: 'Manzana Postobon',
        ingredientes: { es: 'Gaseosa colombiana sabor manzana' },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'agua-hatsu',
        nombre: 'Agua Hatsu',
        ingredientes: { es: 'Agua mineral embotellada Hatsu' },
        precio: 14000,
        precioTexto: '$ 14.000',
      },
      {
        id: 'te-hatsu',
        nombre: 'Te Hatsu',
        ingredientes: { es: 'Té gourmet embotellado Hatsu' },
        precio: 14000,
        precioTexto: '$ 14.000',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 9. CAFÉ (Página 7)
  // --------------------------------------------------------------------------
  {
    id: 'cafe',
    nombre: {
      es: 'CAFÉ',
      en: 'COFFEE',
    },
    subtitulo: {
      es: 'Café 100% colombiano de origen e infusiones calientes',
      en: '100% single origin Colombian coffee and hot herbal teas',
    },
    items: [
      {
        id: 'cafe-americano',
        nombre: 'Americano',
        ingredientes: {
          es: 'Café colombiano servido largo con agua caliente',
          en: 'Colombian coffee served long with hot water',
        },
        precio: 10000,
        precioTexto: '$ 10.000',
      },
      {
        id: 'cafe-cappuccino',
        nombre: 'Cappuccino',
        ingredientes: {
          es: 'Espresso con leche vaporizada y capa de espuma densa',
          en: 'Espresso with steamed milk and thick foam',
        },
        precio: 12000,
        precioTexto: '$ 12.000',
      },
      {
        id: 'cafe-expreso',
        nombre: 'Expreso',
        ingredientes: {
          es: 'Extracción concentrada de café 100% colombiano',
          en: 'Concentrated shot of 100% Colombian coffee',
        },
        precio: 8000,
        precioTexto: '$ 8.000',
      },
      {
        id: 'cafe-expreso-doble',
        nombre: 'Expreso doble',
        ingredientes: {
          es: 'Doble extracción concentrada de café espresso',
          en: 'Double shot of concentrated espresso',
        },
        precio: 14000,
        precioTexto: '$ 14.000',
      },
      {
        id: 'te-caliente',
        nombre: 'Té caliente',
        nombreEn: 'Hot Tea',
        ingredientes: {
          es: 'Infusión caliente en selección de hierbas',
          en: 'Selection of hot herbal tea infusions',
        },
        precio: 10000,
        precioTexto: '$ 10.000',
      },
      {
        id: 'cafe-latte',
        nombre: 'Cafe latte',
        ingredientes: {
          es: 'Café espresso con abundante leche caliente cremosa',
          en: 'Espresso with steamed silky milk',
        },
        precio: 12000,
        precioTexto: '$ 12.000',
      },
    ],
  },
];
