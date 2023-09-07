module.exports = [
  {
    name: 'blog-intro',
    variants: [
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-blog-intro-module" */'../../../src/modules/blog-intro.module.vue'),
  },
  {
    name: 'compare',
    variants: [
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
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
        key: 'picture-switch',
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
      {
        key: 'bright',
        name: 'Heller Text',
      },
      {
        key: 'dark',
        name: 'Dunkler Text',
      },
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-emotion-module" */'../../../src/modules/emotion.module.vue'),
  },
  {
    name: 'facts',
    variants: [
      {
        key: 'variant1',
        name: 'Ein Fakt mit Auswahlliste',
        description: 'Es wird nur ein Fakt angezeigt, eine Auswahlliste wird links dargestellt',
      },
      {
        key: 'variant2',
        name: 'Fakten nebeneinander in mehreren Reihen',
        description: 'Zwei Fakten nebeneinander pro Reihe',
      },
      {
        key: 'variant3',
        name: 'Grosse Auswahlliste',
        description: 'Ganze Sätze in der Auswahlliste mit ',
      },
      {
        key: 'threeRow',
        name: 'Drei Bilder in einer Reihe',
        description: 'Drei Bilder anstatt zwei pro Reihe angezeigt.',
      },
      {
        key: 'Fit images',
        name: 'Bildergrößen werden vereinheitlicht',
        description: 'verschieden grosse Bilder werden in eine einheitliche Grosse umgewandelt',
      },
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
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
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-faq-module" */'../../../src/modules/faq.module.vue'),
  },
  {
    name: 'footer',
    variants: [
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      }],
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
      {
        key: 'disableOverlay',
        name: 'Overlay deaktivieren',
        description: 'Deaktiviert die Möglichkeit, die Gallery im Overlay anzuzeigen.',
      },
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
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
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-index-module" */'../../../src/modules/index.module.vue'),
  },
  {
    name: 'menu',
    variants: [
      {
        key: 'left',
        name: 'Menü öffnet sich links',
        description: 'alle Menüpunkte werden nun auf der linken Seite angezeigt',
      },
      {
        key: 'colorScheme1',
        name: 'Hintergrundfarbe',
        description: 'Wenn des Menu links angezeigt wird, bekommt es die Hauptfarbe als Hintergrund',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
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
        key: 'textPictureVertical',
        name: 'Text bevor Bild',
        description: 'Der Text wird zentriert vor dem Bild angezeigt',
      },
      {
        key: 'pictureTextVertical',
        name: 'Bild bevor Text',
        description: 'Der Text wird zentriert nach dem Bild angezeigt',
      },
      {
        key: 'fullscreen',
        name: 'fullscreen',
        description: 'Das Bild wird so breit wie der aktuelle Container es zulässt.',
      },
      {
        key: 'fullscreenOverlayEnabled',
        name: 'Bild in Fullscreen als Overlay ermöglichen',
        description: 'Es wird ein Button angezeigt um das Bild in einem Overlay in Fullscreen anzuzeigen.',
      },
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
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
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-pictureandtext-module" */'../../../src/modules/pictureandtext.module.vue'),
  },
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
        name: 'Variante um Kontakte darzustellen',
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
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-picturegroup-module" */'../../../src/modules/picturegroup.module.vue'),
  },
  {
    name: 'prices',
    variants: [
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-prices-module" */'../../../src/modules/prices.module.vue'),
  },
  {
    name: 'quellcode',
    variants: [
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-quellcode-module" */'../../../src/modules/quellcode.module.vue'),
  },
  {
    name: 'quote',
    variants: [
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
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
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-text-module" */'../../../src/modules/text.module.vue'),
  },
  {
    name: 'training',
    variants: [
      {
        key: 'offsetTop',
        name: 'Index Abstand nach oben',
        description: 'Index wird nach unten verschoben',
      },
      {
        key: 'indexVariant',
        name: 'Index Liste von Texten',
        description: 'Simple Darstellung der Indexelemente',
      },
      {
        key: 'indexIndicator',
        name: 'Nummerierter Index',
      },
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
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
        key: 'small',
        name: 'das Video wird klein angezeigt',
      },
      {
        key: 'fullscreen',
        name: 'Das Video wird an die gesamte Bildschirmgröße angepasst',
      },
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-video-module" */'../../../src/modules/video.module.vue'),
  },
  {
    name: 'quote',
    variants: [
      {
        key: 'authRight',
        name: 'Author wird rechts angezeigt',
      },
      {
        key: 'authCenter',
        name: 'Author wird zentriert angezeigt',
      },
      {
        key: 'quoteRight',
        name: 'Zitat wird rechts angezeigt',
      },
      {
        key: 'quoteCenter',
        name: 'Zitat wird zentriert angezeigt',
      },
      {
        key: 'small',
        name: 'Zitat und Author werden mittig und kleiner angezeigt',
      },
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-quote-module" */'../../../src/modules/quote.module.vue'),
  },
  {
    name: 'quellcode',
    variants: [
      {
        key: 'center',
        name: 'Text vor Code wird zentriert',
      },
      {
        key: 'darkmode',
        name: 'Code Hintergrund wird schwarz',
      },
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-quellcode-module" */'../../../src/modules/quellcode.module.vue'),
  },
  {
    name: 'cookies',
    variants: [
      {
        key: 'overlay',
        name: 'Wird als Dialog Overlay angezeigt.',
      },
      {
        key: 'overlayRight',
        name: 'Overlay wird rechts unten angezeigt',
      },
      {
        key: 'pdf-single-page',
        name: 'Eigene Seite',
        description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-after',
        name: 'Neue Seite nach diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-new-page-before',
        name: 'Neue Seite vor diesem Module',
        description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
        group: 'pdf',
      },
      {
        key: 'pdf-invisible',
        name: 'Wird nicht in PDF angezeigt',
        group: 'pdf',
      },
    ],
    component: () => import(/* webpackChunkName: "design-cookies-module" */'../../../src/modules/cookies.module.vue'),
  },
  {
    name: 'contact',
    variants: [],
    component: () => import(/* webpackChunkName: "design-contact-module" */'../../../src/modules/contact.module.vue'),
  },
];
