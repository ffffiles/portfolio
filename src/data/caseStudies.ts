export interface CaseStudy {
  id: string
  title: string
  category: string
  thumbnailUrl: string
  comingSoon: boolean
  hasPage: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'valorant-esports-hud',
    title: 'Valorant Esports HUD',
    category: 'Product Design',
    thumbnailUrl: '/images/thumb-valorant.webp',
    comingSoon: false,
    hasPage: true,
  },
  {
    id: 'riot-esports-network',
    title: 'Riot Esports Network',
    category: 'Visual Design',
    thumbnailUrl: '/images/thumb-riot-esports.webp',
    comingSoon: true,
    hasPage: false,
  },
  {
    id: 'root-new-user-signup',
    title: 'Root New User Signup',
    category: 'Product Design',
    thumbnailUrl: '/images/thumb-root-signup.webp',
    comingSoon: true,
    hasPage: false,
  },
  {
    id: 'branding-root-insurance',
    title: 'Branding Root Insurance',
    category: 'Visual Design',
    thumbnailUrl: '/images/thumb-branding-root.webp',
    comingSoon: true,
    hasPage: false,
  },
]
