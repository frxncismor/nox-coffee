export const heroCopy = {
  headline: 'NOX',
  tagline: 'Coffee for the hours that matter',
  scrollIndicator: 'Scroll',
} as const;

export const storyCopy = `Some nights the world goes quiet, and it's just you and the work. Not the work that pays the bills — the work that keeps you up. The idea you can't ignore, the problem that won't wait, the page that needs one more draft. Nox was roasted for those hours. Not the polished morning ritual with ceramic cups and weekend newspapers. The other kind. When the city has finally stopped performing and you can hear yourself think. We source from farms at altitude, where the cold slows everything down and the beans develop slowly, honestly. The result is coffee with something to say. Pour it. Drink it black or not. Then get back to what matters.` as const;

export const showcasePanels = [
  {
    id: 'origin' as const,
    label: 'Origin',
    title: 'From elevation to ritual',
    body: `We work with three farms — two in Colombia's Huila region, one in the highlands of Ethiopia. All three sit above 1,800 meters, where slower maturation concentrates sugars and deepens complexity. Our sourcing director visits every harvest season. We pay above Fair Trade floor prices because the math only works if the farmers stay. No certifications theater — just direct relationships and shared stakes.`,
  },
  {
    id: 'roast' as const,
    label: 'Roast',
    title: 'Roasted to the edge of night',
    body: `Every batch is roasted in small lots — never more than 22 kilos at a time — on a cast-iron drum roaster from the seventies that we refuse to replace. Medium-dark, pulled just before second crack, preserving origin character while developing the caramel and smoke notes that define our profile. We roast twice a week. You get it within 48 hours of the drum going cold.`,
  },
  {
    id: 'ritual' as const,
    label: 'Ritual',
    title: 'The 1am cup',
    body: `Heat the kettle to 93°C. Use 1 gram of coffee for every 15 grams of water. Pour slowly — not because the YouTube video said to, but because it forces you to stop rushing. Let it bloom for 45 seconds. Finish the pour in two or three passes. The whole thing takes four minutes. You can afford four minutes, even tonight. Especially tonight.`,
  },
] as const;

export const ctaCopy = {
  headline: 'Your turn.',
  subHeadline: 'The hours between midnight and dawn are yours. Make them count.',
  buttonLabel: 'Shop the Collection',
  buttonHref: '#',
} as const;

export const footerCopy = {
  brand: 'Nox Coffee',
  year: '2025',
  photoCredit: 'Photos: Unsplash',
  unsplashUrl: 'https://unsplash.com',
} as const;

export interface SiteCopy {
  heroCopy: typeof heroCopy;
  storyCopy: typeof storyCopy;
  showcasePanels: typeof showcasePanels;
  ctaCopy: typeof ctaCopy;
  footerCopy: typeof footerCopy;
}
