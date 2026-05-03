export interface Product {
  id: string;
  name: string;
  price: string;
  time: string;
  imageUrl: string;
  subtitle_es: string;
  subtitle_en: string;
  notes_es: string;
  notes_en: string;
  roast_es: string;
  roast_en: string;
}

export const products: Product[] = [
  {
    id: 'dusk',
    name: 'Dusk',
    price: '$24',
    time: '9pm – 11pm',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
    subtitle_es: 'Para empezar la noche.',
    subtitle_en: 'For starting the night.',
    notes_es: 'Suave. Notas de chocolate con leche, almendra tostada, miel.',
    notes_en: 'Smooth. Notes of milk chocolate, toasted almond, honey.',
    roast_es: 'Tueste medio. 250g',
    roast_en: 'Medium roast. 250g',
  },
  {
    id: 'twilight',
    name: 'Twilight',
    price: '$26',
    time: '11pm – 1am',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    subtitle_es: 'Para entrar en flujo.',
    subtitle_en: 'For entering flow.',
    notes_es: 'Equilibrado. Notas de cacao oscuro, ciruela, naranja.',
    notes_en: 'Balanced. Notes of dark cacao, plum, orange.',
    roast_es: 'Tueste medio-oscuro. 250g',
    roast_en: 'Medium-dark roast. 250g',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    price: '$28',
    time: '1am – 4am',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
    subtitle_es: 'Para la hora más larga.',
    subtitle_en: 'For the longest hour.',
    notes_es: 'Profundo. Notas de tabaco, melaza, nuez negra.',
    notes_en: 'Deep. Notes of tobacco, molasses, black walnut.',
    roast_es: 'Tueste oscuro. 250g',
    roast_en: 'Dark roast. 250g',
  },
  {
    id: 'dawn',
    name: 'Dawn',
    price: '$26',
    time: '4am – 7am',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    subtitle_es: 'Para terminar lo que empezaste.',
    subtitle_en: 'For finishing what you started.',
    notes_es: 'Brillante. Notas de cítrico, panela, hibisco.',
    notes_en: 'Bright. Notes of citrus, raw sugar, hibiscus.',
    roast_es: 'Tueste claro. 250g',
    roast_en: 'Light roast. 250g',
  },
];
