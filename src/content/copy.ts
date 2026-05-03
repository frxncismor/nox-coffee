export const copy = {
  hero: {
    brand: 'NOX',
    tagline: 'Café para las horas que importan.',
    scrollCue: 'desplázate',
  },
  story: {
    blocks: [
      {
        text: 'Hay una hora donde la ciudad se rinde.\nLos coches se apagan. Los mensajes dejan de llegar. El refrigerador suena más fuerte que nunca.',
      },
      {
        text: 'Y tú sigues despierto.\nNo por insomnio. Por elección.',
      },
      {
        text: 'Porque el mejor pensamiento no llega cuando lo programaste.\nLlega tarde. Llega solo. Llega cuando ya nadie pide nada.',
      },
      {
        text: 'Para esa hora no sirve el café de la mañana.\nEsa hora pide otra cosa.',
      },
    ],
  },
  showcase: {
    origin: {
      label: 'Origen',
      body: 'Granos de Chiapas y Nariño.\nCosechados a mano. Lavados con agua de manantial. Secados al sol, no en máquinas.\nLlegan a Houston en sacos de yute, no en contenedores genéricos.',
    },
    roast: {
      label: 'Tueste',
      body: 'Tueste medio-oscuro. Lento.\nCatorce minutos exactos. Suficiente para sacar el chocolate, no tanto como para perder la fruta.\nCada lote lleva la fecha del día que salió del tostador. Si tarda más de tres semanas en llegarte, no lo enviamos.',
    },
    ritual: {
      label: 'Ritual',
      body: 'Una taza, no dos. Filtro, no espresso.\nA las 11pm, no a las 7am.\nNo es para despertarte. Es para acompañarte.',
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
  footer: {
    brand: 'Nox Coffee',
    unsplashUrl: 'https://unsplash.com',
    photoCredit: 'Fotos de Unsplash',
  },
} as const;

// Legacy named exports for backward compatibility with existing components
export const ctaCopy = {
  headline: copy.cta.heading,
  subHeadline: copy.cta.subtext,
  buttonLabel: copy.cta.button,
  buttonHref: '#',
} as const;

export const footerCopy = {
  brand: copy.footer.brand,
  unsplashUrl: copy.footer.unsplashUrl,
  photoCredit: copy.footer.photoCredit,
} as const;

// Showcase panels array for ProductShowcase (derived from copy.showcase)
export const showcasePanels = [
  {
    id: 'origin' as const,
    label: copy.showcase.origin.label,
    title: copy.showcase.origin.label,
    body: copy.showcase.origin.body.replace(/\n/g, ' '),
  },
  {
    id: 'roast' as const,
    label: copy.showcase.roast.label,
    title: copy.showcase.roast.label,
    body: copy.showcase.roast.body.replace(/\n/g, ' '),
  },
  {
    id: 'ritual' as const,
    label: copy.showcase.ritual.label,
    title: copy.showcase.ritual.label,
    body: copy.showcase.ritual.body.replace(/\n/g, ' '),
  },
] as const;
