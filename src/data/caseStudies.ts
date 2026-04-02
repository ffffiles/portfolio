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
    thumbnailUrl: 'https://www.figma.com/api/mcp/asset/1114c29e-2ea5-4fbd-a50a-79f111fa81d8',
    comingSoon: false,
    hasPage: true,
  },
  {
    id: 'riot-esports-network',
    title: 'Riot Esports Network',
    category: 'Visual Design',
    year: '2021-23',
    thumbnailUrl: 'https://www.figma.com/api/mcp/asset/4586bf90-ac26-479c-8f86-c3b0363518dd',
    comingSoon: true,
    hasPage: false,
  },
  {
    id: 'root-new-user-signup',
    title: 'Root New User Signup',
    category: 'Product Design',
    year: '2020',
    thumbnailUrl: 'https://www.figma.com/api/mcp/asset/fdb7250d-b5c3-4d6c-8990-3ec527886e4d',
    comingSoon: true,
    hasPage: false,
  },
  {
    id: 'branding-root-insurance',
    title: 'Branding Root Insurance',
    category: 'Visual Design',
    year: '2018',
    thumbnailUrl: 'https://www.figma.com/api/mcp/asset/76742bc5-478a-49cf-95b1-e6a9d881177e',
    comingSoon: true,
    hasPage: false,
  },
]
