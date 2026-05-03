export interface Product {
  id: string;
  name: string;
  subtitle: string;
  notes: string;
  roast: string;
  price: string;
  time: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 'dusk',
    name: 'Dusk',
    subtitle: 'Para empezar la noche.',
    notes: 'Suave. Notas de chocolate con leche, almendra tostada, miel.',
    roast: 'Tueste medio. 250g',
    price: '$24',
    time: '9pm – 11pm',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
  },
  {
    id: 'twilight',
    name: 'Twilight',
    subtitle: 'Para entrar en flujo.',
    notes: 'Equilibrado. Notas de cacao oscuro, ciruela, naranja.',
    roast: 'Tueste medio-oscuro. 250g',
    price: '$26',
    time: '11pm – 1am',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    subtitle: 'Para la hora más larga.',
    notes: 'Profundo. Notas de tabaco, melaza, nuez negra.',
    roast: 'Tueste oscuro. 250g',
    price: '$28',
    time: '1am – 4am',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
  },
  {
    id: 'dawn',
    name: 'Dawn',
    subtitle: 'Para terminar lo que empezaste.',
    notes: 'Brillante. Notas de cítrico, panela, hibisco.',
    roast: 'Tueste claro. 250g',
    price: '$26',
    time: '4am – 7am',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
  },
];
