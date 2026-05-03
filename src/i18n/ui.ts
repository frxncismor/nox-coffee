export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const translations = {
  es: {
    hero: {
      brand: 'NOX',
      tagline: 'Café para las horas que importan.',
      scrollCue: 'desplázate',
    },
    story: {
      blocks: [
        'Hay una hora donde la ciudad se rinde.\nLos coches se apagan. Los mensajes dejan de llegar. El refrigerador suena más fuerte que nunca.',
        'Y tú sigues despierto.\nNo por insomnio. Por elección.',
        'Porque el mejor pensamiento no llega cuando lo programaste.\nLlega tarde. Llega solo. Llega cuando ya nadie pide nada.',
        'Para esa hora no sirve el café de la mañana.\nEsa hora pide otra cosa.',
      ],
    },
    showcase: {
      origin: {
        label: 'Origen',
        tagline: 'El origen importa. La fruta lo demuestra.',
        body: 'Granos de Chiapas y Nariño. Altitud entre 1,400 y 1,900 metros.\nCosechados a mano, uno por uno. Lavados con agua de manantial. Secados al sol, no en máquinas, no al vapor.\nLlegan a Houston en sacos de yute, no en contenedores genéricos. Cada lote tiene nombre, origen y fecha.',
      },
      roast: {
        label: 'Tueste',
        tagline: 'Catorce minutos entre el grano y el carácter.',
        body: 'Tueste medio-oscuro. Lento.\nCatorce minutos exactos. Suficiente para sacar el chocolate, no tanto como para perder la fruta.\nCada lote lleva la fecha del día que salió del tostador. Si tarda más de tres semanas en llegarte, no lo enviamos.',
      },
      ritual: {
        label: 'Ritual',
        tagline: 'El café de las 11pm tiene sus propias reglas.',
        body: 'Una taza, no dos. Filtro, no espresso. Sin azúcar.\nA las 11pm, no a las 7am. La noche tiene su propio tempo.\nNo es para despertarte. Es para acompañarte en la parte del día que el resto del mundo ya olvidó.',
      },
    },
    lineup: {
      heading: 'La línea Nox',
      subheading: 'Cuatro tuestes para cuatro momentos de la noche.',
    },
    cta: {
      heading: 'Tu turno.',
      subtext: 'Empieza por donde sea. La noche no juzga.',
      button: 'Probar la línea — desde $24',
      shipping: 'Envíos a toda la república. Tres semanas máximo desde el tueste.',
    },
    nav: {
      langToggle: 'EN',
    },
  },
  en: {
    hero: {
      brand: 'NOX',
      tagline: 'Coffee for the hours that matter.',
      scrollCue: 'scroll',
    },
    story: {
      blocks: [
        "There's an hour when the city gives up.\nCars go quiet. Messages stop arriving. The refrigerator sounds louder than ever.",
        "And you're still awake.\nNot from insomnia. By choice.",
        "Because the best thinking doesn't arrive when you planned for it.\nIt arrives late. Alone. When no one is asking anything of you.",
        "For that hour, morning coffee doesn't work.\nThat hour calls for something else.",
      ],
    },
    showcase: {
      origin: {
        label: 'Origin',
        tagline: 'Origin matters. The fruit is the proof.',
        body: 'Beans from Chiapas and Nariño. Altitude between 1,400 and 1,900 meters.\nHand-harvested, one by one. Washed with spring water. Sun-dried, not machine-dried, not steam-dried.\nThey arrive in Houston in burlap sacks, not generic containers. Every batch has a name, an origin, and a date.',
      },
      roast: {
        label: 'Roast',
        tagline: 'Fourteen minutes between the bean and its character.',
        body: "Medium-dark roast. Slow.\nExactly fourteen minutes. Enough to bring out the chocolate, not so much as to lose the fruit.\nEvery batch carries the date it left the roaster. If it takes more than three weeks to reach you, we don't ship it.",
      },
      ritual: {
        label: 'Ritual',
        tagline: '11pm coffee has its own rules.',
        body: 'One cup, not two. Filter, not espresso. No sugar.\nAt 11pm, not 7am. The night has its own tempo.\nNot to wake you up. To keep you company in the part of the day everyone else has already forgotten.',
      },
    },
    lineup: {
      heading: 'The Nox Line',
      subheading: 'Four roasts for four moments of the night.',
    },
    cta: {
      heading: 'Your turn.',
      subtext: "Start anywhere. The night doesn't judge.",
      button: 'Try the line — from $24',
      shipping: 'Ships nationwide. Three weeks max from roast date.',
    },
    nav: {
      langToggle: 'ES',
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];
