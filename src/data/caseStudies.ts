export interface CaseStudy {
  id: string
  title: string
  category: string
  year: string
  thumbnailUrl: string
  comingSoon: boolean
  hasPage: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'valorant-esports-hud',
    title: 'Valorant Esports HUD',
    category: 'Product',
    year: '2021-25',
    thumbnailUrl: '/images/thumb-valorant.jpg',
    comingSoon: false,
    hasPage: true,
  },
  {
    id: 'riot-esports-network',
    title: 'Riot Esports Network',
    category: 'Visual Design',
    year: '2021-23',
    thumbnailUrl: '/images/thumb-riot-esports.jpg',
    comingSoon: true,
    hasPage: false,
  },
  {
    id: 'root-new-user-signup',
    title: 'Root New User Signup',
    category: 'Product Design',
    year: '2020',
    thumbnailUrl: '/images/thumb-root-signup.jpg',
    comingSoon: true,
    hasPage: false,
  },
  {
    id: 'branding-root-insurance',
    title: 'Branding Root Insurance',
    category: 'Visual Design',
    year: '2018',
    thumbnailUrl: '/images/thumb-branding-root.jpg',
    comingSoon: true,
    hasPage: false,
  },
]
