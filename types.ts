export interface Competency {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  category: string;
  client: string;
  scope: string;
  contribution: string;
  excerpt: string;
  link: string;
  result?: string;
  isFeatured?: boolean;
}

export interface GeneralInfo {
  headerName: string;
  headerNavAbout: string;
  headerNavPortfolio: string;
  headerNavContact: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaButton: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  competenciesTitle: string;
  competenciesSubtitle: string;
  portfolioSectionTitle: string;
  portfolioSectionSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  contactEmail: string;
  contactCtaButton: string;
  footerCopyright: string;
}
