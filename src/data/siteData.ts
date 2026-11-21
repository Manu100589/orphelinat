export interface PillarItem {
  id: string
  number: string
  tag: string
  needLabel: string
  title: string
  description: string
  extendedStory: string
  howToHelp: string
  commitments: string[]
  image: string
  imageAlt: string
  imagePosition?: string
  secondaryImage?: string
  secondaryImageAlt?: string
  accent: 'forest' | 'terracotta' | 'sun' | 'earth'
}

export interface DailyChapter {
  id: string
  number: string
  timeLabel: string
  title: string
  subtitle: string
  narrative: string
  image: string
  imageAlt: string
  imagePosition?: string
  theme: 'forest' | 'terracotta' | 'paper' | 'sun' | 'dusk'
}

export interface GalleryPhoto {
  id: string
  src: string
  alt: string
  caption: string
  category: 'Vie au centre' | 'Éducation' | 'Partage' | 'Jeux & Joie'
  /** Controls organic editorial collage spanning on desktop */
  layout: 'feature' | 'portrait' | 'wide' | 'square'
  /** Explicit focal point so faces and subjects are never cropped */
  objectPosition: string
}

export interface NewsArticle {
  id: string
  slug: string
  category: string
  dateLabel: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
  imagePosition?: string
  readTime: string
  body: string[]
}

export interface OfficialMetric {
  label: string
  value: string
  note?: string
}

export const SITE_CONTACT = {
  organizationName: "Orphelinat l'Espoir du Demain",
  acronym: 'O.E.D.',
  legalTagline: "Centre d'encadrement et d'hébergement des enfants orphelins et vulnérables",
  email: 'contact@orphelinatespoirdudemain.com',
  phoneDisplay: '+243 895 888 202',
  phoneRaw: '243895888202',
  whatsappUrl:
    'https://wa.me/243895888202?text=Bonjour%20Orphelinat%20l%27Espoir%20du%20Demain%2C%20je%20souhaite%20soutenir%20votre%20mission%20aupr%C3%A8s%20des%20enfants.',
  facebookName: 'Orphelinat Espoir du Demain',
  facebookUrl: 'https://www.facebook.com/search/top?q=Orphelinat%20Espoir%20du%20Demain',
  addressLine1: 'Commune de Kimbanseke, à Pascal, sur la Route Mokali',
  addressLine2: 'Avenue Poto poto 98',
  reference: 'Référence : 1ère Station Cobil',
  city: 'Kinshasa, République Démocratique du Congo',
  mapQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=Route+Mokali+Pascal+Kimbanseke+Kinshasa+DRC',
  /**
   * Passerelle de don configurable :
   * Renseignez ici une URL officielle de collecte (Stripe, PayPal, HelloAsso, Mobile Money)
   * dès qu'elle est activée par la direction de l'O.E.D.
   */
  donationCheckoutUrl: null as string | null,
}

/**
 * Interface dédiée aux chiffres officiels vérifiés.
 * Laisser vide tant que les chiffres officiels validés par la direction
 * ne sont pas intégrés (aucune statistique inventée).
 */
export const OFFICIAL_METRICS: OfficialMetric[] = []

export const CORE_VALUES = [
  {
    number: '01',
    name: 'Amour',
    description: 'Une présence bienveillante et une écoute sincère au quotidien.',
  },
  {
    number: '02',
    name: 'Protection',
    description: 'Un refuge sûr où chaque enfant grandit en sécurité et en confiance.',
  },
  {
    number: '03',
    name: 'Éducation',
    description: "L'instruction et l'accompagnement scolaire comme moteur d'émancipation.",
  },
  {
    number: '04',
    name: 'Solidarité',
    description: "L'entraide fraternelle au sein du centre et avec toute la communauté.",
  },
  {
    number: '05',
    name: 'Dignité',
    description: 'Le respect absolu de chaque histoire, de chaque sourire et de chaque enfant.',
  },
  {
    number: '06',
    name: 'Autonomie',
    description: 'Préparer les jeunes à devenir des adultes responsables et confiants.',
  },
] as const

export const ACTION_PILLARS: PillarItem[] = [
  {
    id: 'hebergement',
    number: '01',
    tag: 'Hébergement & Protection',
    needLabel: 'Soins & cadre sécurisant',
    title: 'Un foyer, pas seulement un toit.',
    description:
      'Nous offrons un cadre de vie sûr, propre et chaleureux aux enfants orphelins et vulnérables. Un espace où ils peuvent se sentir protégés, entourés et grandir en toute sérénité.',
    extendedStory:
      "Au-delà d'un simple lieu d'hébergement, l'O.E.D. veille à recréer une véritable atmosphère familiale. Les enfants y trouvent des repères stables, une équipe attentive et la chaleur d'une fratrie unie qui les rassure et les aide à se reconstruire.",
    howToHelp: 'Soutenir les soins, les vêtements et l’entretien quotidien du foyer',
    commitments: [
      'Accueil sécurisé et bienveillant des enfants orphelins et vulnérables',
      'Encadrement quotidien, soins et accompagnement psychosocial attentif',
      'Cadre de vie structuré favorisant le repos, la confiance et la sérénité',
    ],
    image: '/images/solidarite-enfants.jpg',
    imageAlt: "Enfants de l'Orphelinat l'Espoir du Demain réunis ensemble devant le centre",
    imagePosition: '50% 4%',
    accent: 'forest',
  },
  {
    id: 'education',
    number: '02',
    tag: 'Éducation',
    needLabel: 'Scolarité & fournitures',
    title: 'Donner les clés de leur avenir.',
    description:
      "Nous prenons en charge les frais de scolarité, les fournitures scolaires et l'accompagnement éducatif afin que chaque enfant puisse apprendre, progresser et croire en ses capacités.",
    extendedStory:
      "L'école est le premier levier de liberté et de dignité. Chaque rentrée scolaire est préparée avec soin : uniformes, cartables, cahiers et suivi des devoirs permettent à chaque enfant de découvrir ses talents et de rêver grand.",
    howToHelp: 'Contribuer aux frais de scolarité, cahiers, cartables et uniformes',
    commitments: [
      'Prise en charge des frais de scolarité et inscription régulière',
      'Fourniture des uniformes, cartables, livres et cahiers',
      'Soutien aux devoirs et encouragement permanent de la curiosité',
    ],
    image: '/images/hero-ecole.png',
    imageAlt: "Les enfants en uniforme scolaire devant le centre O.E.D.",
    imagePosition: '50% 25%',
    accent: 'terracotta',
  },
  {
    id: 'alimentation',
    number: '03',
    tag: 'Alimentation',
    needLabel: 'Repas quotidiens',
    title: 'Grandir en bonne santé.',
    description:
      'Nous assurons des repas équilibrés chaque jour pour favoriser la santé, le bien-être, la croissance et le développement des enfants.',
    extendedStory:
      "Autour d'un repas partagé se tisse la vie de famille. Assurer une nutrition quotidienne régulière et saine donne aux enfants l'énergie nécessaire pour apprendre, jouer et grandir sereinement.",
    howToHelp: 'Offrir des denrées de base ou participer aux repas du quotidien',
    commitments: [
      'Repas chauds et équilibrés préparés avec attention chaque jour',
      'Moments de partage collectif autour de la table familiale',
      'Suivi du bien-être physique et de la croissance de chaque enfant',
    ],
    image: '/images/cercle-repas.jpg',
    imageAlt: 'Les enfants réunis en cercle partageant un repas chaud au centre',
    imagePosition: '50% 45%',
    accent: 'sun',
  },
  {
    id: 'loisirs',
    number: '04',
    tag: 'Loisirs',
    needLabel: 'Jeux, sport & éveil',
    title: "L'enfance doit aussi être remplie de joie.",
    description:
      'Nous organisons des activités sportives, culturelles, éducatives et récréatives qui contribuent au développement, à l’équilibre et au bonheur des enfants.',
    extendedStory:
      "Jouer, rire, courir après un ballon ou faire du vélo sont essentiels à l'équilibre d'un enfant. Ces instants de liberté cultivent l'esprit d'équipe, la créativité et des souvenirs heureux qui durent toute une vie.",
    howToHelp: 'Partager du matériel sportif, des jeux éducatifs ou du temps bénévole',
    commitments: [
      'Jeux collectifs, football et activités sportives de plein air',
      'Ateliers créatifs, chants, découvertes culturelles et célébrations',
      'Moments de détente qui nourrissent la confiance et la joie de vivre',
    ],
    image: '/images/sourire-ballon.jpg',
    imageAlt: 'Jeune fille souriante tenant un ballon dans la cour du centre',
    imagePosition: '50% 18%',
    secondaryImage: '/images/freres-ballon.jpg',
    secondaryImageAlt: 'Deux enfants souriants avec un ballon au centre',
    accent: 'earth',
  },
]

export const DAILY_LIFE_CHAPTERS: DailyChapter[] = [
  {
    id: 'matin',
    number: '01',
    timeLabel: 'Le matin',
    title: "Se préparer pour l'école.",
    subtitle: "L'éveil, les uniformes impeccables et l'élan d'une nouvelle journée.",
    narrative:
      "Dès les premières lueurs du jour, le centre s'anime dans la bienveillance. On ajuste les chemises blanches, on vérifie les cartables et l'on s'encourage mutuellement avant de prendre le chemin de la classe.",
    image: '/images/hero-ecole.png',
    imageAlt: "Départ pour l'école en uniforme devant le centre O.E.D.",
    imagePosition: '50% 25%',
    theme: 'forest',
  },
  {
    id: 'apprentissage',
    number: '02',
    timeLabel: "L'apprentissage",
    title: 'Découvrir, comprendre, grandir.',
    subtitle: 'Éveiller la curiosité et accompagner chaque progrès pas à pas.',
    narrative:
      "Chaque question posée, chaque page lue et chaque exercice réussi renforcent la confiance en soi. L'encadrement éducatif aide chaque enfant à révéler son potentiel et à croire en son avenir.",
    image: '/images/regard-espoir.jpg',
    imageAlt: "Portrait lumineux d'une enfant attentive pleine de curiosité et d'espoir",
    imagePosition: '50% 58%',
    theme: 'terracotta',
  },
  {
    id: 'partage',
    number: '03',
    timeLabel: 'Le partage',
    title: 'Repas et moments de famille.',
    subtitle: 'Se retrouver ensemble, remercier et savourer la chaleur du collectif.',
    narrative:
      "À l'heure du repas, les enfants se rassemblent en cercle comme une grande famille. Les assiettes circulent, les rires fusent et les aînés veillent naturellement sur les plus petits.",
    image: '/images/cercle-repas.jpg',
    imageAlt: 'Grand cercle fraternel autour du repas quotidien',
    imagePosition: '50% 45%',
    theme: 'paper',
  },
  {
    id: 'jeu',
    number: '04',
    timeLabel: 'Le jeu',
    title: 'Sport, rire et créativité.',
    subtitle: "L'énergie de l'enfance, le ballon, le vélo et la complicité.",
    narrative:
      "L'après-midi laisse place au mouvement et aux éclats de rire. Qu'il s'agisse d'une partie de ballon, d'un tour à vélo ou d'un jeu entre sœurs, la cour résonne de vie et de liberté.",
    image: '/images/sourire-ballon.jpg',
    imageAlt: 'Sourire radieux pendant les jeux de ballon au centre',
    imagePosition: '50% 24%',
    theme: 'sun',
  },
  {
    id: 'reve',
    number: '05',
    timeLabel: 'Le rêve',
    title: 'Préparer demain.',
    subtitle: 'La gratitude, la paix intérieure et la confiance en un avenir lumineux.',
    narrative:
      "Quand la lumière s'adoucit, le calme revient dans la maison. Entourés d'affection et de repères solides, les enfants peuvent fermer les yeux sereinement et imaginer tout ce qu'ils deviendront demain.",
    image: '/images/gratitude-sourire.jpg',
    imageAlt: "Instant de gratitude et de sourire paisible d'une jeune fille au centre",
    imagePosition: '50% 34%',
    theme: 'dusk',
  },
]

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    src: '/images/hero-ecole.png',
    alt: "Les enfants en uniforme scolaire devant le centre O.E.D.",
    caption: "Fierté et sourires en uniforme scolaire avant le départ en classe.",
    category: 'Éducation',
    layout: 'feature',
    objectPosition: '50% 25%',
  },
  {
    id: 'gal-2',
    src: '/images/sourire-ballon.jpg',
    alt: 'Jeune fille souriante tenant un ballon rouge',
    caption: "La joie simple d'un après-midi sportif dans la cour.",
    category: 'Jeux & Joie',
    layout: 'portrait',
    objectPosition: '50% 18%',
  },
  {
    id: 'gal-3',
    src: '/images/rires-ensemble.jpg',
    alt: 'Groupe de jeunes filles riant ensemble devant le logo du centre',
    caption: "Des éclats de rire et une complicité fraternelle au cœur de l'O.E.D.",
    category: 'Vie au centre',
    layout: 'wide',
    objectPosition: '50% 22%',
  },
  {
    id: 'gal-4',
    src: '/images/soeurs-calin.jpg',
    alt: 'Trois jeunes filles enlacées faisant le signe de la paix',
    caption: "Tendresse et solidarité : ici, chacun veille sur l'autre.",
    category: 'Vie au centre',
    layout: 'portrait',
    objectPosition: '50% 18%',
  },
  {
    id: 'gal-5',
    src: '/images/cercle-repas.jpg',
    alt: 'Enfants réunis en cercle pour le repas',
    caption: 'Un grand cercle familial autour du repas partagé.',
    category: 'Partage',
    layout: 'feature',
    objectPosition: '50% 45%',
  },
  {
    id: 'gal-6',
    src: '/images/sourire-petit.jpg',
    alt: "Portrait souriant d'un tout-petit en veste verte",
    caption: 'La lumière et la curiosité dans le regard des plus jeunes.',
    category: 'Vie au centre',
    layout: 'square',
    objectPosition: '50% 22%',
  },
  {
    id: 'gal-7',
    src: '/images/repas-partage.jpg',
    alt: 'Un enfant recevant une assiette chaude de riz et haricots',
    caption: 'Partager un repas nourrissant, geste essentiel du quotidien.',
    category: 'Partage',
    layout: 'wide',
    objectPosition: '50% 35%',
  },
  {
    id: 'gal-8',
    src: '/images/freres-ballon.jpg',
    alt: 'Deux enfants souriants serrant un ballon de football',
    caption: 'Complicité fraternelle autour du ballon de football.',
    category: 'Jeux & Joie',
    layout: 'portrait',
    objectPosition: '50% 18%',
  },
  {
    id: 'gal-9',
    src: '/images/amitie-victoire.jpg',
    alt: "Deux amies bras dessus bras dessous devant l'emblème O.E.D.",
    caption: "L'amitié et la confiance qui grandissent jour après jour.",
    category: 'Vie au centre',
    layout: 'square',
    objectPosition: '50% 18%',
  },
  {
    id: 'gal-10',
    src: '/images/enfant-velo.jpg',
    alt: 'Jeune garçon à vélo',
    caption: 'Liberté, équilibre et découvertes lors des temps de loisirs.',
    category: 'Jeux & Joie',
    layout: 'portrait',
    objectPosition: '50% 20%',
  },
  {
    id: 'gal-11',
    src: '/images/joie-groupe.jpg',
    alt: "Groupe d'enfants souriants faisant le signe de paix",
    caption: 'Des instants de joie spontanée qui illuminent le centre.',
    category: 'Jeux & Joie',
    layout: 'square',
    objectPosition: '50% 22%',
  },
  {
    id: 'gal-12',
    src: '/images/centre-famille.jpg',
    alt: "Toute la famille de l'Orphelinat l'Espoir du Demain devant la façade du centre",
    caption: "Toute la famille O.E.D. rassemblée devant le centre d'encadrement.",
    category: 'Vie au centre',
    layout: 'wide',
    objectPosition: '50% 30%',
  },
]

export const IMPACT_BLOCKS = [
  {
    id: 'scolarise',
    roman: 'I',
    title: 'Un enfant scolarisé',
    subtitle: 'Ouvrir les portes du savoir',
    description:
      "Chaque cahier, chaque uniforme et chaque frais scolaire couvert ouvre une nouvelle perspective d'avenir.",
  },
  {
    id: 'repas',
    roman: 'II',
    title: 'Un repas partagé',
    subtitle: 'Nourrir la croissance et la joie',
    description:
      "Un repas équilibré et convivial apporte force, santé et le sentiment rassurant d'appartenir à une famille.",
  },
  {
    id: 'protege',
    roman: 'III',
    title: 'Un environnement protégé',
    subtitle: 'Offrir un refuge apaisant',
    description:
      'Un foyer encadré, stable et aimant permet de guérir les blessures et de grandir avec sérénité.',
  },
  {
    id: 'reve',
    roman: 'IV',
    title: 'Un rêve encouragé',
    subtitle: 'Croire en demain',
    description:
      "Être écouté, valorisé et accompagné donne à chaque enfant l'élan d'imaginer sa place dans le monde.",
  },
]

export const PARTNER_WAYS = [
  {
    id: 'financier',
    number: '01',
    title: 'Soutien financier',
    description:
      'Contribuer directement à la scolarité, aux soins, aux repas et au fonctionnement du centre.',
    icon: 'HeartHandshake',
  },
  {
    id: 'fournitures',
    number: '02',
    title: 'Dons de fournitures scolaires',
    description:
      'Cahiers, cartables, stylos, livres et uniformes pour accompagner chaque rentrée.',
    icon: 'BookOpen',
  },
  {
    id: 'alimentaire',
    number: '03',
    title: 'Dons alimentaires',
    description:
      'Denrées de base et produits nutritifs pour assurer des repas variés tout au long de la semaine.',
    icon: 'Utensils',
  },
  {
    id: 'vetements',
    number: '04',
    title: 'Vêtements',
    description:
      'Habits propres, chaussures et tenues adaptées aux différents âges des enfants accueillis.',
    icon: 'Shirt',
  },
  {
    id: 'materiel',
    number: '05',
    title: 'Matériel éducatif',
    description:
      'Jeux pédagogiques, manuels, équipements sportifs et outils d’éveil pour enrichir les activités.',
    icon: 'Shapes',
  },
  {
    id: 'partenariats',
    number: '06',
    title: 'Partenariats',
    description:
      'Engagements durables avec des entreprises, associations, fondations et institutions.',
    icon: 'Building2',
  },
  {
    id: 'volontariat',
    number: '07',
    title: 'Volontariat',
    description:
      'Donner de son temps sur place ou à distance pour animer des ateliers et soutenir l’équipe.',
    icon: 'Users',
  },
  {
    id: 'competences',
    number: '08',
    title: 'Accompagnement & compétences',
    description:
      'Soutien scolaire, santé, coaching, artisanat ou mentorat pour transmettre des savoir-faire.',
    icon: 'Sparkles',
  },
] as const

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'art-1',
    slug: 'la-rentree-scolaire-un-nouveau-depart',
    category: 'Éducation',
    dateLabel: 'Rentrée scolaire',
    title: 'La rentrée scolaire : un nouveau départ.',
    excerpt:
      "Uniformes apprêtés, cartables prêts et regards tournés vers l'avenir : la reprise des classes est toujours un moment d'immense fierté au centre.",
    image: '/images/hero-ecole.png',
    imageAlt: 'Les enfants en uniforme scolaire prêts pour la rentrée',
    imagePosition: '50% 25%',
    readTime: '3 min de lecture',
    body: [
      "À l'Orphelinat l'Espoir du Demain, chaque rentrée scolaire résonne comme une promesse tenue. Voir les enfants revêtir leurs chemises blanches et leurs tenues bleu marine avec fierté rappelle pourquoi l'éducation reste au cœur de notre engagement.",
      "Préparer cette étape demande une mobilisation constante : frais de scolarité, cahiers, fournitures et encadrement des devoirs. Chaque contribution solidaire permet aux enfants d'aborder l'année avec sérénité et enthousiasme.",
      "Au-delà des apprentissages académiques, l'école offre un espace d'ouverture, d'amitié et de confiance en soi. Ensemble, nous leur donnons les repères indispensables pour écrire leur propre avenir.",
    ],
  },
  {
    id: 'art-2',
    slug: 'une-journee-placee-sous-le-signe-du-partage',
    category: 'Vie au centre',
    dateLabel: 'Vie quotidienne',
    title: 'Une journée placée sous le signe du partage.',
    excerpt:
      "Autour d'un repas préparé avec soin et d'un grand cercle convivial, les enfants célèbrent la chaleur de la fraternité et de l'entraide.",
    image: '/images/repas-partage.jpg',
    imageAlt: "Partage d'un repas chaud au sein de l'orphelinat",
    imagePosition: '50% 35%',
    readTime: '2 min de lecture',
    body: [
      "Au centre O.E.D., les repas sont bien plus qu'un moment de nutrition : ce sont des instants privilégiés où toute la famille se retrouve, échange et sourit.",
      "Les plus grands aident volontiers au service et veillent sur les plus jeunes, cultivant naturellement des valeurs de solidarité, de respect et de gratitude qui marquent durablement leur quotidien.",
      "Grâce à la générosité des personnes de bonne volonté, des partenaires et des donateurs, ces moments de partage demeurent une source quotidienne de force et de réconfort.",
    ],
  },
  {
    id: 'art-3',
    slug: 'ensemble-preparons-un-avenir-meilleur',
    category: 'Solidarité',
    dateLabel: 'Engagement',
    title: 'Ensemble, préparons un avenir meilleur.',
    excerpt:
      "Chaque geste de solidarité — qu'il s'agisse d'un don, d'un partenariat ou d'un message d'encouragement — contribue à faire grandir l'espoir.",
    image: '/images/rires-ensemble.jpg',
    imageAlt: "Groupe d'enfants souriants réunis devant l'emblème de l'Orphelinat l'Espoir du Demain",
    imagePosition: '50% 20%',
    readTime: '3 min de lecture',
    body: [
      "Construire un cadre stable et aimant pour des enfants orphelins et vulnérables est une aventure collective. À Kimbanseke, notre équipe se mobilise jour après jour pour offrir protection, soins, éducation et joie.",
      "Particuliers, diaspora, entreprises et associations : chacun peut prendre part à cette chaîne d'espoir selon ses moyens, en soutenant les besoins éducatifs, alimentaires ou matériels du centre.",
      "Parce que l'espoir d'aujourd'hui construit les adultes de demain, votre présence à nos côtés transforme concrètement le présent des enfants.",
    ],
  },
]
