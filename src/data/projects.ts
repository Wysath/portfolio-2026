import fisa from '../img/fisa.png';
import gstarcad from '../img/gstarcad.jpg';
import louna from '../img/louna.png';
import helloPomelo from '../img/hello-pomelo.png';
import crossbrowser from '../img/crossbrowser.png';

export const projects = [
  {
    id: '01',
    title: 'CROSSBROWSER UTILITY',
    category: 'DEV TOOLING',
    year: '2024',
    description: 'Développement d\'un outil CLI personnalisé pour automatiser les tests de compatibilité visuelle sur plusieurs moteurs de rendu.',
    tags: ['NODE.JS', 'AUTOMATION', 'JAVASCRIPT'],
    link: crossbrowser,
    slug: 'crossbrowser-utility',
    role: 'Développeuse',
    period: '2024',
    context: 'Développement d\'un outil interne pour l\'assurance qualité et les tests de compatibilité croisée.',
    missions: [
      'Développement d\'un outil CLI personnalisé pour les tests visuels automatisés',
      'Intégration avec plusieurs moteurs de rendu',
      'Automatisation des flux de travail de compatibilité'
    ],
    skills: ['Node.js', 'Automation', 'JavaScript', 'CLI Development']
  },
  {
    id: '02',
    title: 'GSTARCAD FRANCE',
    category: 'E-COMMERCE',
    year: '2024',
    description: 'Refonte complète d\'une plateforme de vente de logiciels. Focus sur l\'optimisation du tunnel de conversion et du classement SEO.',
    tags: ['E-COMMERCE', 'SEO STRATEGY', 'UX'],
    link: gstarcad,
    slug: 'gstarcad-france',
    role: 'Développeuse Web & Designer UI',
    period: 'Août 2025',
    context: 'Juste avant la fin de mon alternance chez FISA en août 2025, on m\'a confié l\'amorçage du nouveau projet GstarCAD. Ce défi de dernière minute nécessitait une grande capacité d\'adaptation et d\'organisation pour garantir un flux de travail fluide pour la suite.',
    missions: [
      'Analyse des besoins et début du prototypage et de la réflexion UX',
      'Mise en place de l\'environnement de travail technique',
      'Documentation du travail amorcé pour assurer une transition claire et sans accroc à l\'équipe technique'
    ],
    skills: ['Recherche UX', 'Git', 'Méthodologie de gestion de projet', 'Stratégie SEO']
  },
  {
    id: '03',
    title: 'FAUCONNET ENGINEERING',
    category: 'CORPORATE',
    year: '2023',
    description: 'Modernisation de l\'écosystème digital d\'un cabinet d\'ingénierie. Approche d\'éco-conception et conformité stricte à l\'accessibilité.',
    tags: ['INSTITUTIONAL', 'ACCESSIBILITY', 'UI/UX'],
    link: fisa,
    slug: 'fauconnet-engineering',
    role: 'Développeuse Web & Designer UI',
    period: 'Septembre 2023 - Août 2025',
    context: 'Dans le cadre de mon alternance chez FAUCONNET INGENIERIE (FISA), j\'ai pris en charge la conception et le développement du site web de l\'entreprise de A à Z. L\'objectif était de moderniser la présence en ligne de l\'entreprise en alliant performance technique et design créatif.',
    missions: [
      'Prise en charge du design UX/UI complet et refonte de l\'identité visuelle',
      'Développement front-end et back-end via la création d\'un thème WordPress sur-mesure',
      'Création de la documentation interne complète',
      'Formation des équipes en interne à la gestion et l\'administration du nouveau site'
    ],
    skills: ['WordPress', 'ACF', 'Figma', 'UI/UX Design', 'Accessibilité', 'PHP']
  },
  {
    id: '04',
    title: 'PORTFOLIO 2022',
    category: 'DIGITAL IDENTITY',
    year: '2022',
    description: 'Itération précédente de mon branding personnel. Développé sans frameworks pour maîtriser les fondamentaux de la DOM.',
    tags: ['VANILLA JS', 'CSS ARCHITECTURE'],
    link: louna,
    slug: 'portfolio-2022',
    role: 'Développeuse Full Stack',
    period: '2022',
    context: 'Projet de branding personnel pour démontrer les fondamentaux du développement web sans frameworks modernes.',
    missions: [
      'Design et développement complet du site portfolio',
      'Implémentation d\'interactions personnalisées sans frameworks',
      'Optimisation de la manipulation DOM et de l\'architecture CSS'
    ],
    skills: ['Vanilla JavaScript', 'Architecture CSS', 'HTML', 'Manipulation DOM']
  },
  {
    id: '05',
    title: 'HELLO POMELO',
    category: 'AGENCY',
    year: '2025 - Présent',
    description: 'Agence de développement logiciel sur-mesure spécialisée dans les applications web et mobile. Construire la tech au service des métiers.',
    tags: ['AGENCY', 'WEB', 'MOBILE'],
    link: helloPomelo,
    slug: 'hello-pomelo',
    role: 'Chef de projet UX/UI & Développeuse Web',
    period: 'Septembre 2025 - Présent',
    context: 'Depuis septembre 2025 au sein de l\'agence Hello Pomelo, je pilote la refonte de leur propre site corporate en appliquant une méthodologie rigoureuse et une approche profondément centrée sur l\'utilisateur.',
    missions: [
      'Recherche & UX : Création de personas pour cibler précisément les attentes des utilisateurs',
      'Design & Intégration : Conception des interfaces sur Figma et développement avec une intégration "pixel-perfect" sous WordPress',
      'Visibilité & Stratégie : Gestion complète du SEO et de la stratégie de contenu pour l\'acquisition de trafic',
      'Business : Réalisation de supports de présentation visuels destinés aux appels d\'offres de l\'agence'
    ],
    skills: ['Figma', 'WordPress', 'SEO', 'Recherche UX', 'Gestion de projet', 'Stratégie de contenu']
  },
];
