export interface Product {
  id: 'dusk' | 'twilight' | 'midnight' | 'dawn';
  name: string;
  notes: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
}

export const products: Product[] = [
  {
    id: 'dusk',
    name: 'Dusk',
    notes: 'Stone fruit, honey, cedar',
    price: '$18',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=1000&fit=crop',
    imageAlt: 'Dusk single-origin coffee — warm tones with stone fruit and honey notes',
  },
  {
    id: 'twilight',
    name: 'Twilight',
    notes: 'Dark chocolate, smoke, dried cherry',
    price: '$22',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop',
    imageAlt: 'Twilight coffee — dark roast with chocolate and smoke character',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    notes: 'Espresso, black walnut, molasses',
    price: '$24',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=1000&fit=crop',
    imageAlt: 'Midnight coffee — deep espresso with black walnut and molasses finish',
  },
  {
    id: 'dawn',
    name: 'Dawn',
    notes: 'Floral, bergamot, bright acidity',
    price: '$19',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=1000&fit=crop',
    imageAlt: 'Dawn light roast — floral and bergamot with bright citrus acidity',
  },
];
