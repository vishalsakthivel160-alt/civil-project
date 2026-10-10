import { Project, Service, SiteSettings } from '../types/index.js';

export const initialProjects: Project[] = [
  {
    id: 'proj-001',
    title: 'Apex Horizon Commercial Superstructure',
    location: 'Metro Central District',
    category: 'Commercial Construction',
    description: 'Execution of deep bored piling foundation, post-tensioned reinforced concrete slabs, and a 24-storey structural core with high-precision formwork engineering.',
    status: 'Completed',
    year: '2024',
    cover_image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1200&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop'
    ],
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-11-20').toISOString()
  },
  {
    id: 'proj-002',
    title: 'Interchange Expressway Flyover & Viaducts',
    location: 'Northern Corridor Link',
    category: 'Infrastructure Works',
    description: 'Heavy civil infrastructure including 14 pre-stressed concrete span girders, continuous box girder decking, pile cap construction, and seismic expansion joint installations.',
    status: 'Completed',
    year: '2023',
    cover_image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1200&auto=format&fit=crop'
    ],
    created_at: new Date('2023-03-10').toISOString(),
    updated_at: new Date('2023-12-18').toISOString()
  },
  {
    id: 'proj-003',
    title: 'High-Bay Industrial Logistics Hub',
    location: 'Eastern Maritime Freight Park',
    category: 'Industrial Works',
    description: 'Large-scale industrial floor slab with super-flat tolerances (FM2 standard), structural steel portal frames spanning 45 meters clear span, and specialized storm drainage culverts.',
    status: 'Completed',
    year: '2023',
    cover_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop'
    ],
    created_at: new Date('2023-06-01').toISOString(),
    updated_at: new Date('2023-10-30').toISOString()
  },
  {
    id: 'proj-004',
    title: 'Harbor Gateway Multi-Tier Residential Towers',
    location: 'Bayside Waterfront Sector',
    category: 'Residential & Mixed-Use',
    description: 'Twin 18-storey residential towers built with aluminum system formwork, waterproof basement retaining diaphragms, and monolithic concrete core cast in continuous pours.',
    status: 'Completed',
    year: '2022',
    cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'
    ],
    created_at: new Date('2022-02-14').toISOString(),
    updated_at: new Date('2022-12-05').toISOString()
  },
  {
    id: 'proj-005',
    title: 'Metro Transit Interchange & Underground Concourse',
    location: 'Civic Center Station 4',
    category: 'Infrastructure Works',
    description: 'Top-down underground civil construction comprising diaphragm wall secant piling, ground anchor tiebacks, heavy steel shoring, and thick grade beams beneath dense urban roadways.',
    status: 'Ongoing',
    year: '2025 – Present',
    cover_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1200&auto=format&fit=crop'
    ],
    created_at: new Date('2025-01-10').toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-006',
    title: 'Precision Bio-Tech Research Complex Superstructure',
    location: 'Innovation Tech Valley',
    category: 'Commercial Construction',
    description: 'Low-vibration specialized floor slabs, reinforced shear walls, structural steel trusses for mechanical penthouse, and cleanroom civil envelope readiness.',
    status: 'Ongoing',
    year: '2025 – Present',
    cover_image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
    ],
    created_at: new Date('2025-02-01').toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialServices: Service[] = [
  {
    id: 'serv-001',
    title: 'Structural Concrete & Framing',
    description: 'Precision casting of reinforced concrete foundations, grade beams, columns, shear walls, and post-tensioned suspended slabs adhering to rigorous structural tolerances.',
    icon: 'Layers',
    display_order: 1,
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString()
  },
  {
    id: 'serv-002',
    title: 'Deep Foundations & Earth Retention',
    description: 'Specialized bored cast-in-place piling, secant pile walls, diaphragm cut-off walls, pre-stressed ground anchors, and deep excavation bracing in challenging soil conditions.',
    icon: 'Anchor',
    display_order: 2,
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString()
  },
  {
    id: 'serv-003',
    title: 'Civil Infrastructure Works',
    description: 'Execution of transportation flyovers, bridge abutments, box culverts, retaining structures, arterial road embankments, and stormwater management systems.',
    icon: 'Truck',
    display_order: 3,
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString()
  },
  {
    id: 'serv-004',
    title: 'Industrial & Pre-Engineered Steel Buildings',
    description: 'Erection of heavy structural steel framing, portal frames, long-span trusses, high-tolerance industrial super-flat slabs, and exterior cladding coordination.',
    icon: 'Building2',
    display_order: 4,
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString()
  },
  {
    id: 'serv-005',
    title: 'Site Supervision & Quality Assurance',
    description: 'On-site technical superintendence, concrete cube testing verification, rebar placement surveying, formwork deflection monitoring, and safety compliance audits.',
    icon: 'ShieldCheck',
    display_order: 5,
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString()
  },
  {
    id: 'serv-006',
    title: 'Seismic Retrofit & Structural Repair',
    description: 'Carbon fiber (CFRP) composite wrapping, structural column jacketing, micro-piling underpinning, epoxy pressure grouting, and structural rehabilitation for existing facilities.',
    icon: 'Wrench',
    display_order: 6,
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString()
  }
];

export const initialSiteSettings: SiteSettings = {
  id: 'default',
  business_name: 'Tectonic Precision Civil Engineering & Building Works',
  phone: '+1 (555) 234-8901',
  whatsapp: '+1 (555) 234-8901',
  email: 'contact@tectonic-civilworks.com',
  address: '450 Engineering Parkway, Suite 300, Metro Civil Hub',
  about_text: 'Dedicated to structural permanence, engineering precision, and rigorous execution across commercial, industrial, and heavy civil construction projects. Over a decade of hands-on site management and structural execution.',
  updated_at: new Date().toISOString()
};

export const workExperience = [
  {
    period: '2021 – Present',
    role: 'Lead Resident Civil Engineer & Project Superintendent',
    organization: 'Apex Civil Infrastructure Group',
    highlights: [
      'Site command over multi-tier commercial superstructures and municipal infrastructure packages exceeding $85M total value.',
      'Directed daily coordination of rebar fabrication, high-strength concrete delivery schedules, and tower crane logistics.',
      'Enforced zero-tolerance QA/QC inspection protocols, maintaining zero structural defect citations across all completed phases.'
    ]
  },
  {
    period: '2017 – 2021',
    role: 'Senior Structural Site Engineer',
    organization: 'Vanguard Industrial & Commercial Builders',
    highlights: [
      'Supervised cast-in-place concrete frameworks, deep secant retaining walls, and pre-engineered steel buildings.',
      'Formulated formwork stripping sequence models and concrete hydration temperature monitoring on mass concrete pours.',
      'Managed sub-contractor technical deliverables, structural shop drawing approvals, and RFI resolution on active sites.'
    ]
  },
  {
    period: '2014 – 2017',
    role: 'Site Civil Engineer & Quality Inspector',
    organization: 'Horizon Heavy Construction Ltd.',
    highlights: [
      'Executed site leveling surveys, structural piling load tests, soil compaction testing, and stormwater drainage installations.',
      'Coordinated daily concrete slump and compressive strength specimen logs in compliance with ASTM and EN standards.'
    ]
  }
];
