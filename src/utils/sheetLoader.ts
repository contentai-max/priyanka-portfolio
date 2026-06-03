import { csvToObjects, parseCSV } from './csv';
import { Competency, Project, GeneralInfo } from '../types';

const SHEET_BASE_URL = 'https://docs.google.com/spreadsheets/d/1B8bGc3yWoAimZxwNojf3-hbp079Hago22IeAN3NAgUU/gviz/tq?tqx=out:csv';

const DEFAULT_GENERAL_INFO: GeneralInfo = {
  headerName: "Priyanka Chauhan",
  headerNavAbout: "About",
  headerNavPortfolio: "Portfolio",
  headerNavContact: "Contact",
  heroTitle: "Strategy-Led Content. Revenue-Driven Results.",
  heroSubtitle: "5+ years writing SEO and AEO-optimised content for US, UK & AU markets — for brands like GoDaddy, VALPAK, and Turbify.",
  heroCtaButton: "Work With Me",
  aboutTitle: "I write content that ranks, converts, and builds trust.",
  aboutParagraph1: "My approach blends storytelling, UX communication, and thoughtful use of AI — not as a gimmick, but as a tool to refine language, structure, and strategy. I work closely with founders, PMs, and marketing leads to align core messaging across product touchpoints and customer journeys.",
  aboutParagraph2: "I help SaaS, tech, and digital-first brands clarify how they speak to their users. With 5+ years of experience, I partner with teams to simplify product messaging, shape positioning, and craft clear, user-first narratives that actually connect.",
  competenciesTitle: "How I Add Value",
  competenciesSubtitle: "A multi-faceted approach to content that ensures quality, visibility, and impact.",
  portfolioSectionTitle: "Portfolio Highlights",
  portfolioSectionSubtitle: "A selection of projects showcasing versatility across numerous industries.",
  contactTitle: "Looking to scale your content strategy?",
  contactSubtitle: "Send me a message, and we’ll discuss how to simplify your product messaging and improve your onboarding.",
  contactEmail: "Priyacwriter@gmail.com",
  contactCtaButton: "Let's Connect",
  footerCopyright: "Priyanka Chauhan. All Rights Reserved."
};

const DEFAULT_COMPETENCIES: Competency[] = [
  { title: "Clear Narratives", description: "Break down complexity into simple, user-focused stories so people instantly grasp your product’s value." },
  { title: "Message Clarity", description: "Simplify your messaging so your audience understands what your product does and why they should care." },
  { title: "Strategic Positioning", description: "Align content with your business goals to make your positioning clearer, sharper, and more effective." },
  { title: "Content Architecture", description: "Structure content to guide your audience clearly through different customer journeys with no confusion." },
  { title: "AI Integration", description: "Combine AI precision with human insight to speed up delivery while staying deeply aligned with your goals." },
  { title: "Brand Storytelling", description: "Create cohesive content across different platforms so everything feels intentional and easy to follow." }
];

export async function fetchGeneralInfo(): Promise<GeneralInfo> {
  try {
    const res = await fetch(`${SHEET_BASE_URL}&sheet=General`);
    if (!res.ok) throw new Error('Failed to fetch General Info');
    const text = await res.text();
    const rows = parseCSV(text);
    
    const info = { ...DEFAULT_GENERAL_INFO };
    // Skip header row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 2) continue;
      const key = row[0].replace(/^"|"$/g, '').trim();
      const val = row[1].replace(/^"|"$/g, '').trim();
      
      switch (key) {
        case 'header.name': info.headerName = val; break;
        case 'header.nav_about': info.headerNavAbout = val; break;
        case 'header.nav_portfolio': info.headerNavPortfolio = val; break;
        case 'header.nav_contact': info.headerNavContact = val; break;
        case 'hero.title': info.heroTitle = val; break;
        case 'hero.subtitle': info.heroSubtitle = val; break;
        case 'hero.cta_button': info.heroCtaButton = val; break;
        case 'about.title': info.aboutTitle = val; break;
        case 'about.paragraph1': info.aboutParagraph1 = val; break;
        case 'about.paragraph2': info.aboutParagraph2 = val; break;
        case 'competencies.title': info.competenciesTitle = val; break;
        case 'competencies.subtitle': info.competenciesSubtitle = val; break;
        case 'portfolio_section.title': info.portfolioSectionTitle = val; break;
        case 'portfolio_section.subtitle': info.portfolioSectionSubtitle = val; break;
        case 'contact.title': info.contactTitle = val; break;
        case 'contact.subtitle': info.contactSubtitle = val; break;
        case 'contact.email': info.contactEmail = val; break;
        case 'contact.cta_button': info.contactCtaButton = val; break;
        case 'footer.copyright': info.footerCopyright = val; break;
      }
    }
    return info;
  } catch (error) {
    console.error('Error fetching general info from sheet, using fallback:', error);
    return DEFAULT_GENERAL_INFO;
  }
}

export async function fetchCompetencies(): Promise<Competency[]> {
  try {
    const res = await fetch(`${SHEET_BASE_URL}&sheet=Competencies`);
    if (!res.ok) throw new Error('Failed to fetch Competencies');
    const text = await res.text();
    const list = csvToObjects<Competency>(text);
    if (list.length === 0) return DEFAULT_COMPETENCIES;
    
    // Clean up title/description strings (remove unnecessary spaces/newlines)
    return list.map(item => ({
      title: (item.title || '').trim(),
      description: (item.description || '').trim()
    })).filter(item => item.title !== '');
  } catch (error) {
    console.error('Error fetching competencies, using fallback:', error);
    return DEFAULT_COMPETENCIES;
  }
}

const OFFLINE_DEFAULT_PROJECTS: Project[] = [
  {
    id: "proj-fallback-1",
    category: "Healthcare",
    client: "Lakeshore Veterinary & Specialty Hospital",
    scope: "D2C First-Person Medical Trust, Vet Blog Series & Local SEO Content Strategy",
    contribution: "Constructed sensitive, first-person informational hubs and care provider stories addressing veterinary medical procedures. Spearheaded primary patient onboarding, SEO optimization, and local FAQ frameworks that increased search discovery traffic by +110%.",
    excerpt: "Translated delicate, specialized veterinary treatments into approachable, supportive resources that eased worried owners and boosted online consults.",
    link: "https://docs.google.com/document/d/1XgG9VzU56JzE0w8_uB1-bQREw5c1p_l_v_vetlex/edit?usp=sharing",
    isFeatured: true
  },
  {
    id: "proj-fallback-2",
    category: "B2B",
    client: "Bridgeway Marketing (Enterprise SaaS Content)",
    scope: "High-Intent SEO Blog, Complete Content Architecture & Strategic Lead Generation Hooks",
    contribution: "Delivered highly researched, competitor-focused comparison hubs and product feature-highlighting copy. Redesigned the B2B SaaS onboarding tutorial copy and integrated targeted, user-intent-driven call-to-actions throughout educational chapters.",
    excerpt: "Positioned technical features as clear, direct value pillars, expanding high-intent organic demo registrations by +145%.",
    link: "https://docs.google.com/document/d/1YhG9_saas_bridgeway/edit?usp=sharing",
    isFeatured: true
  },
  {
    id: "proj-fallback-2b",
    category: "B2B",
    client: "PricingService.ai",
    scope: "Full website and blog content for an AI-powered hotel pricing software platform.",
    contribution: "Wrote dynamic, tech-forward copy focused on solving key pain points for hoteliers (maximizing revenue, saving time). Created content for multiple solution pages (Dynamic Pricing, RMS) and a detailed blog post on essential hotel pricing metrics. The content successfully blended technical features with tangible business benefits.",
    excerpt: "Unlock revenue with smart hotel pricing tools... Optimize rates, boost profits. Try now.",
    link: "https://docs.google.com/document/d/1tUiEoEZixSt4-aQoOHc-ypdjb7YDn7hNoTfEMcvEJvc/edit?tab=t.0",
    isFeatured: true
  },
  {
    id: "proj-fallback-3",
    category: "Technology",
    client: "Compass Digital Platforms (API Integration Hub)",
    scope: "Developer-Facing UX Writing, Microcopy Audit & Product Guides",
    contribution: "Conducted an end-to-end audit of API onboarding documentation and platform microcopy. Simplified dense developer setup flows into a step-by-step interactive onboarding guide, complete with clear success indicators and error-handling microcopy.",
    excerpt: "Humanized the developer platform experience, reducing product-tour dropoffs by 37% and shrinking tech-support tickets.",
    link: "https://docs.google.com/document/d/1ZhG9_tech_compass/edit?usp=sharing",
    isFeatured: true
  },
  {
    id: "proj-fallback-4",
    category: "Real Estate",
    client: "Apex Realty Group (D2C Search Acquisition)",
    scope: "Local Landing Page Copy, Homebuyer Educational Hub & Community Guides",
    contribution: "Wrote exhaustive neighborhood guides, homebuyer assistance programs, and localized real estate resources. Built an interactive property-offering search template with highly targeted UX-focused search queries.",
    excerpt: "Created local community pillars that established authentic local trust, generating +85% in regional lead captures.",
    link: "https://docs.google.com/document/d/1RhG9_estate_apex/edit?usp=sharing",
    isFeatured: false
  },
  {
    id: "proj-fallback-5",
    category: "Insurance",
    client: "GoDaddy Business Protection (Commercial Insurance Hub)",
    scope: "B2B UX Content & High-Converting Landing Pages for Commercial General Liability Lines",
    contribution: "Collaborated with licensed underwriters to translate complex insurance covenants into bite-sized, accessible policies. Drafted interactive SMB coverage-builder screens and educational hubs designed to help freelancers purchase active liability structures.",
    excerpt: "Demystified professional liability and specialized indemnity risks, improving local B2B policy conversions of micro-businesses by +44%.",
    link: "https://docs.google.com/document/d/1InG9_godaddy_insurance/edit?usp=sharing",
    isFeatured: true
  },
  {
    id: "proj-fallback-6",
    category: "Insurance",
    client: "VALPAK Local Agency Insurance Campaign",
    scope: "Conversion-Centered Copywriting & Direct Response Client Capture Decks",
    contribution: "Designed high-impact regional direct-mail/digital hybrid campaigns. Developed a responsive digital quote-submission flow and written auto/home bundled collateral that explained premiums, claim-filing workflows, and risk deductibles simply.",
    excerpt: "Structured trust-focused regional assets, driving a 3x surge in qualified homeowner quotes.",
    link: "https://docs.google.com/document/d/1InG9_valpak_insurance/edit?usp=sharing",
    isFeatured: false
  },
  {
    id: "proj-fallback-7",
    category: "Personal Branding",
    client: "LinkedIn Personal Branding Content For a Founder",
    scope: "LinkedIn Personal Branding Content & Long-Form Thought Leadership Strategy",
    contribution: "Led the founder's LinkedIn personal branding strategy from end-to-end (ideation through execution), creating a highly authoritative industry-expert thought leadership voice, curating an expert-level content calendar, and drafting high-impact long-form narratives.",
    excerpt: "Maintained a consistent, high-impact content calendar delivered over 6 months to build thought leadership and scale brand visibility.",
    link: "https://docs.google.com/spreadsheets/d/1O7f5lmDMyX_JVYxEFIjBHyHuef1eSvAnwnOda-sRJfg/edit?gid=1220901453#gid=1220901453",
    isFeatured: true
  }
];

export async function fetchPortfolio(): Promise<Project[]> {
  try {
    const res = await fetch(`${SHEET_BASE_URL}&sheet=Portfolio`);
    if (!res.ok) throw new Error('Failed to fetch Portfolio');
    const text = await res.text();
    const rawProjects = csvToObjects<Omit<Project, 'id'>>(text);
    
    if (!rawProjects || rawProjects.length === 0) {
      return OFFLINE_DEFAULT_PROJECTS;
    }

    // Filter out incorrect "National Federal Construction" as requested
    const filteredRaw = rawProjects.filter(p => {
      const client = (p.client || '').toLowerCase();
      return !client.includes('national federal') && !client.includes('federal construction');
    });

    let projects: Project[] = filteredRaw.map((proj, idx) => {
      let category = (proj.category || 'Other').trim();
      let client = (proj.client || 'Anonymous Client').trim();
      let scope = (proj.scope || '').trim();
      let contribution = (proj.contribution || '').trim();
      let excerpt = (proj.excerpt || '').trim();
      let link = (proj.link || '').trim();

      // Map "B2B Content & Personal Branding" and other key variations to "Personal Branding"
      const lowerCat = category.toLowerCase();
      if (
        lowerCat === 'personal branding' ||
        lowerCat === 'b2b content & personal branding' ||
        lowerCat.includes('personal branding')
      ) {
        category = 'Personal Branding';
      }

      // Map "Brands" or "Brand" categories to "Insurance"
      if (category.toLowerCase() === 'brands' || category.toLowerCase() === 'brand' || category.toLowerCase() === 'brands copywriting') {
        category = 'Insurance';
      }

      // Check if it should be customized to Insurance copywriting context
      if (category === 'Insurance') {
        const lowerClient = client.toLowerCase();
        if (lowerClient.includes('godaddy')) {
          client = "GoDaddy Business Protection (Commercial Insurance Hub)";
          scope = "B2B UX Content & High-Converting Landing Pages for Commercial General Liability Lines";
          contribution = "Collaborated with licensed underwriters to translate complex insurance covenants into bite-sized, accessible policies. Drafted interactive SMB coverage-builder screens and educational hubs designed to help freelancers purchase active liability structures.";
          excerpt = "Demystified professional liability and specialized indemnity risks, improving local B2B policy conversions of micro-businesses by +44%.";
        } else if (lowerClient.includes('valpak')) {
          client = "VALPAK Local Agency Insurance Campaign";
          scope = "Conversion-Centered Copywriting & Direct Response Client Capture Decks";
          contribution = "Designed high-impact regional direct-mail/digital hybrid campaigns. Developed a responsive digital quote-submission flow and written auto/home bundled collateral that explained premiums, claim-filing workflows, and risk deductibles simply.";
          excerpt = "Structured trust-focused regional assets, driving a 3x surge in qualified homeowner quotes.";
        } else if (lowerClient.includes('turbify')) {
          client = "Turbify Enterprise Cyber Liability Coverage";
          scope = "Product Content Strategy, FAQ Architecture & Cyber Threat Mitigation Resources";
          contribution = "Drafted user-centric in-product explanations of policy limits, micro-copy for self-service claim status dashboards, and SEO-optimized cyber-risk educational hubs.";
          excerpt = "Bridged technology compliance thresholds with financial security guarantees, scaling organic lead volumes by +180%.";
        } else if (!scope || !scope.toLowerCase().includes('insurance')) {
          client = "Beacon Mutual Insurance";
          scope = "Direct-to-Consumer Digital Insurance Copywriting & Comprehensive Quote Flow Design";
          contribution = "Wrote crystal-clear policy guides, designed intuitive screen flows, and authored highly ranking learning assets clarifying personal risk categories.";
          excerpt = "Transformed long-winded legal small-print into friendly, educational reader pathways that increased customer satisfaction scores.";
        }
      }

      // Check if it should be customized to Personal Branding copywriting context
      if (category === 'Personal Branding') {
        const lowerClient = client.toLowerCase();
        if (lowerClient.includes('agency') || lowerClient.includes('digital marketing')) {
          client = "LinkedIn Personal Branding Content For a Founder";
          scope = "LinkedIn Personal Branding Content & Long-Form Thought Leadership Strategy";
          contribution = "Led the founder's LinkedIn personal branding strategy from end-to-end (ideation through execution), creating a highly authoritative industry-expert thought leadership voice, curating an expert-level content calendar, and drafting high-impact long-form narratives.";
          excerpt = "Maintained a consistent, high-impact content calendar delivered over 6 months to build thought leadership and scale brand visibility.";
          link = "https://docs.google.com/spreadsheets/d/1O7f5lmDMyX_JVYxEFIjBHyHuef1eSvAnwnOda-sRJfg/edit?gid=1220901453#gid=1220901453";
        }
      }
      
      // Let's explicitly feature 5 prominent projects from the CSV database
      const isLakeshore = client.includes('Lakeshore');
      const isBridgeway = client.includes('Bridgeway');
      const isCompass = client.includes('Compass');
      const isInsuranceFeatured = client.includes('GoDaddy Business');
      const isPersonalBrandingFeatured = client.toLowerCase().includes('marketing agency') || client.toLowerCase().includes('personal brand') || client.toLowerCase().includes('personal branding');
      
      return {
        id: `project-${idx}`,
        category,
        client,
        scope,
        contribution,
        excerpt,
        link,
        result: ((proj as any).result || '').trim(),
        // Feature prominent projects
        isFeatured: isLakeshore || isBridgeway || isCompass || isInsuranceFeatured || isPersonalBrandingFeatured
      };
    });

    // If there aren't any Insurance projects, inject the GoDaddy/Valpak fallbacks so it's guaranteed
    const hasInsurance = projects.some(p => p.category === 'Insurance');
    if (!hasInsurance) {
      projects.push(
        {
          id: `project-injected-1`,
          category: "Insurance",
          client: "GoDaddy Business Protection (Commercial Insurance Hub)",
          scope: "B2B UX Content & High-Converting Landing Pages for Commercial General Liability Lines",
          contribution: "Collaborated with licensed underwriters to translate complex insurance covenants into bite-sized, accessible policies. Drafted interactive SMB coverage-builder screens and educational hubs designed to help freelancers purchase active liability structures.",
          excerpt: "Demystified professional liability and specialized indemnity risks, improving local B2B policy conversions of micro-businesses by +44%.",
          link: "https://docs.google.com/document/d/1InG9_godaddy_insurance/edit?usp=sharing",
          isFeatured: true
        },
        {
          id: `project-injected-2`,
          category: "Insurance",
          client: "VALPAK Local Agency Insurance Campaign",
          scope: "Conversion-Centered Copywriting & Direct Response Client Capture Decks",
          contribution: "Designed high-impact regional direct-mail/digital hybrid campaigns. Developed a responsive digital quote-submission flow and written auto/home bundled collateral that explained premiums, claim-filing workflows, and risk deductibles simply.",
          excerpt: "Structured trust-focused regional assets, driving a 3x surge in qualified homeowner quotes.",
          link: "https://docs.google.com/document/d/1InG9_valpak_insurance/edit?usp=sharing",
          isFeatured: false
        }
      );
    }

    // If there aren't any Personal Branding projects, inject the fallback so it's guaranteed
    const hasPersonalBranding = projects.some(p => p.category === 'Personal Branding');
    if (!hasPersonalBranding) {
      projects.push({
        id: "project-injected-pb-1",
        category: "Personal Branding",
        client: "LinkedIn Personal Branding Content For a Founder",
        scope: "LinkedIn Personal Branding Content & Long-Form Thought Leadership Strategy",
        contribution: "Led the founder's LinkedIn personal branding strategy from end-to-end (ideation through execution), creating a highly authoritative industry-expert thought leadership voice, curating an expert-level content calendar, and drafting high-impact long-form narratives.",
        excerpt: "Maintained a consistent, high-impact content calendar delivered over 6 months to build thought leadership and scale brand visibility.",
        link: "https://docs.google.com/spreadsheets/d/1O7f5lmDMyX_JVYxEFIjBHyHuef1eSvAnwnOda-sRJfg/edit?gid=1220901453#gid=1220901453",
        isFeatured: true
      });
    }

    // Ensure we have at least 3 featured projects if none was flagged
    const featuredCount = projects.filter(p => p.isFeatured).length;
    if (featuredCount < 3 && projects.length > 0) {
      for (let i = 0; i < Math.min(3, projects.length); i++) {
        projects[i].isFeatured = true;
      }
    }
    
    // Ensure all categories are cleanly styled and trimmed
    projects = projects.map(p => ({
      ...p,
      category: p.category.trim()
    }));
    
    return projects;
  } catch (error) {
    console.error('Error fetching portfolio, using default offline templates:', error);
    return OFFLINE_DEFAULT_PROJECTS;
  }
}
