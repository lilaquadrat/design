export default
[
  {
    name: 'blog-intro',
    variants: [],
    component: () => import(/* webpackChunkName: "design-blog-intro-module" */'../../../src/modules/blog-intro.module.vue'),
  },
  {
    name: 'compare',
    variants: [],
    component: () => import(/* webpackChunkName: "design-compare-module" */'../../../src/modules/compare.module.vue'),
  },
  {
    name: 'content',
    variants: [],
    component: () => import(/* webpackChunkName: "design-content-module" */'../../../src/modules/content.module.vue'),
  },
  {
    name: 'emotion',
    variants: [
      {
        key: 'variant1',
        name: 'Inhalte zentriert',
      },
      {
        key: 'height50',
        name: 'Modul 50%',
        description: 'Modulhöhe 50%',
      },
      {
        key: 'height80',
        name: 'Modul 80%',
        description: 'Modulhöhe 80%',
      },
      {
        key: 'scrollNotice',
        name: 'Scroll Icon anzeigen',
        description: 'Das Scroll Icon wird unten im Modul angezeigt damit der Kunde weiss dass er nach unten scrollen soll',
      },
      {
        key: 'pictureSwitch',
        name: 'Text und Bild tauschen',
        description: 'Wenn ein Bild hinterlegt ist, wird der Text im Vordergrund angezeigt',
      },
      {
        key: 'textBackground',
        name: 'Text bekommt einen Hintergrund',
        description: 'Hinter den Text wird ein Hintergrund gelegt um diesen besser sichtbar zu machen',
      },
      {
        key: 'content-inline',
        name: 'Modulgröße an Text angepasst',
        description: 'Modulhöhe ist abhängig von den Inhalten',
      },
    ],
    component: () => import(/* webpackChunkName: "design-emotion-module" */'../../../src/modules/emotion.module.vue'),
  },
  {
    name: 'facts',
    variants: [
      {
        key: 'variant1',
        name: 'alternatives Design',
        description: 'Some description for this module',
      },
      {
        key: 'variant2',
        name: 'zweites alternatives Design',
        description: 'Some description for this module',
      },
      {
        key: 'Fit images',
        name: 'Bildergrößen werden vereinheitlicht',
        description: 'verschieden grosse Bilder werden in eine einheitliche Grosse umgewandelt',
      },
    ],
    component: () => import(/* webpackChunkName: "design-facts-module" */'../../../src/modules/facts.module.vue'),
  },
  {
    name: 'faq',
    variants: [
      {
        key: 'medium',
        name: 'Größe: Medium',
        description: 'Die maximale Breite des Modules wird erhöht',
      },
    ],
    component: () => import(/* webpackChunkName: "design-faq-module" */'../../../src/modules/faq.module.vue'),
  },
  {
    name: 'footer',
    variants: [],
    component: () => import(/* webpackChunkName: "design-footer-module" */'../../../src/modules/footer.module.vue'),
  },
  {
    name: 'gallery',
    variants: [
      {
        key: 'variant2',
        name: 'alternatives Design',
        description: 'alternatives Design, andere Bilderanzeige',
      },
      {
        key: 'fullscreen',
        name: 'fullscreen',
        description: 'Das Bild wird an die gesamte Bildschirmgröße angepasst',
      },
    ],
    component: () => import(/* webpackChunkName: "design-gallery-module" */'../../../src/modules/gallery.module.vue'),
  },
  {
    name: 'index',
    variants: [
      {
        key: 'auto',
        name: 'Automatischer Modus',
        description: 'Der Index wird automatisch anhand der Module aufgebaut',
      },
      {
        key: 'numbered',
        name: 'Numberische Indikatoren',
        description: 'Es werden fortlaufendes Zahlen anstatt Icons angezeigt',
      },
      {
        key: 'medium',
        name: 'Größe: Medium',
        description: 'Die maximale Breite des Modules wird erhöht',
      },
      {
        key: 'backgroundColor1',
        name: 'Hauptfarbe als Hintergrund',
      },
      {
        key: 'backgroundColor3',
        name: 'Sekunddarfarbe als Hintergrund',
      },
      {
        key: 'backgroundGrey',
        name: 'Grauer Hintergrund',
      },
    ],
    component: () => import(/* webpackChunkName: "design-index-module" */'../../../src/modules/index.module.vue'),
  },
  {
    name: 'menu',
    variants: [
      {
        key: 'left',
        name: 'das Menü öffnet sich auf der linken Seite',
        description: 'alle Menüpunkte werden nun auf der linken Seite angezeigt',
      },
      {
        key: 'color',
        name: 'Hintergrundfarbe',
        description: 'Das Menu bekommt die Hauptfarbe als Hintergrund',
      },
    ],
    component: () => import(/* webpackChunkName: "design-menu-module" */'../../../src/modules/menu.module.vue'),
  },
  {
    name: 'partial',
    variants: [],
    component: () => import(/* webpackChunkName: "design-partial-module" */'../../../src/modules/partial.module.vue'),
  },
  {
    name: 'picture',
    variants: [
      {
        key: 'middle',
        name: 'Module wird in mittlerer Grösse dargestellt',
      },
      {
        key: 'small',
        name: 'Module wird kleiner dargestellt',
      },
      {
        key: 'variant1',
        name: 'Text im Bild rechts',
        description: 'Der Text wird statt unter dem Bild rechts im Bild angezeigt',
      },
      {
        key: 'fullscreen',
        name: 'fullscreen',
        description: 'Das Bild wird an die gesamte Bildschirmgröße angepasst',
      },
    ],
    component: () => import(/* webpackChunkName: "design-picture-module" */'../../../src/modules/picture.module.vue'),
  },
  {
    name: 'pictureandtext',
    variants: [
      {
        key: 'variant1',
        name: 'Bild und Text tauschen',
        description: 'das Bild wird rechts und der Text links davon angezeigt',
      },
      {
        key: 'focusImage',
        name: 'Bild fokussieren',
        description: 'Das Bild wird hervorgehoben auf Kosten des Texts',
      },
    ],
    component: () => import(/* webpackChunkName: "design-pictureandtext-module" */'../../../src/modules/pictureandtext.module.vue'),
  },
  // 'variant1',
  // 'variant2',
  // 'variant3',
  // 'variant4',
  // 'variant5',
  // 'small',
  // 'noText',
  // 'fullscreen',
  // 'contact',
  // 'color1',
  // 'color3',
  // 'product',
  // 'fit',
  // 'centerText',
  {
    name: 'picturegroup',
    variants: [
      {
        key: 'variant1',
        name: '3 Bilder nebeneinander',
      },
      {
        key: 'variant4',
        name: '4 Bilder in einer Reihe',
      },
      {
        key: 'variant2',
        name: '1 großes und 3 kleine Bilder',
        description: 'das erste Bild ist groß oben angezeigt und die 3 folgenden kleinen Bilder darunter',
      },
      {
        key: 'variant5',
        name: '1 großes und 4 kleine Bilder',
        description: 'das erste Bild ist groß oben angezeigt und die 4 folgenden kleinen Bilder darunter',
      },
      {
        key: 'variant3',
        name: '1 großes und 3 kleine Bilder vertikal',
        description: 'das erste Bild ist groß links angezeigt und die 3 folgenden kleinen Bilder rechts daneben',
      },
      {
        key: 'noText',
        name: 'der Text wird ausgeblendet',
      },
      {
        key: 'color1',
        name: 'Das Module bekommt die Hauptfarbe als Hintergrund',
      },
      {
        key: 'color3',
        name: 'Das Module bekommt die Sekundarfärbe als Hintergrund',
      },
      {
        key: 'contact',
        name: 'Variante um Kontake darzustellen',
      },
      {
        key: 'product',
        name: 'Bild wird zentriert und somit in den Fokus gestellt.',
      },
      {
        key: 'centerText',
        name: 'Text vor den Bildern wird zenrtiert',
      },
      {
        key: 'fit',
        name: 'Bildergrößen werden vereinheitlicht',
        description: 'verschieden grosse Bilder werden in eine einheitliche Grosse umgewandelt',
      },
    ],
    component: () => import(/* webpackChunkName: "design-picturegroup-module" */'../../../src/modules/picturegroup.module.vue'),
  },
  {
    name: 'prices',
    variants: [],
    component: () => import(/* webpackChunkName: "design-prices-module" */'../../../src/modules/prices.module.vue'),
  },
  {
    name: 'quellcode',
    variants: [],
    component: () => import(/* webpackChunkName: "design-quellcode-module" */'../../../src/modules/quellcode.module.vue'),
  },
  {
    name: 'quote',
    variants: [],
    component: () => import(/* webpackChunkName: "design-quote-module" */'../../../src/modules/quote.module.vue'),
  },
  {
    name: 'text',
    variants: [
      {
        key: 'center',
        name: 'Text zentriert',
      },
      {
        key: 'notice',
        name: 'Module ist mit der Hauptfarbe hinterlegt',
      },
      {
        key: 'actions',
        name: 'Links werden zu Call To Action Buttons',
      },
    ],
    component: () => import(/* webpackChunkName: "design-text-module" */'../../../src/modules/text.module.vue'),
  },
  {
    name: 'training',
    variants: [
      {
        key: 'offsetTop',
        name: 'Erste Variante',
        description: 'der Index wird etwas nach unten verschoben',
      },
      {
        key: 'indexVariant',
        name: 'Zweite Variante',
        description: 'im Index wird nur der Titel ohne Beschreibung angezeigt',
      },
      {
        key: 'indexIndicator',
        name: 'Dritte Variante',
        description: 'im Index werden die Titel nummeriert',
      },
    ],
    component: () => import(/* webpackChunkName: "design-training-module" */'../../../src/modules/training.module.vue'),
  },
  {
    name: 'video',
    variants: [
      {
        key: 'bright',
        name: 'heller Text im Video',
      },
      {
        key: 'dark',
        name: 'dunkler Text im Video',
      },
      {
        key: 'middle',
        name: 'das Video wird in mittlerer Größe angezeigt',
      },
      {
        key: 'small',
        name: 'das Video wird klein angezeigt',
      },
      {
        key: 'fullscreen',
        name: 'Das Video wird an die gesamte Bildschirmgröße angepasst',
      },
    ],
    component: () => import(/* webpackChunkName: "design-video-module" */'../../../src/modules/video.module.vue'),
  },
];