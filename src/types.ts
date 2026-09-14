export type NavigationPage = 'home' | 'about' | 'research' | 'projects' | 'asmitha' | 'ventures' | 'contact';

export interface DomainNode {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  details: string;
  color: string;
  connections: string[];
}

export interface TechnologyArea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  techMetrics: { label: string; value: string }[];
  interactiveType: 'ai' | 'robotics' | 'computing' | 'health';
}

export type ResearchStatus = 'Theoretical Framework' | 'Laboratory Prototyping' | 'Active Investigation' | 'Experimental Validation' | 'Pre-Clinical Stage';

export interface ResearchTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  researchQuestions: string[];
  currentStatus: ResearchStatus;
  relatedTechnologies: string[];
  investigationLead: string;
  facility: string;
}

export type ProjectStatus = 'Research' | 'Prototype' | 'Development' | 'Product';

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  oneLiner: string;
  description: string;
  technologyStack: string[];
  status: ProjectStatus;
  specs: { label: string; value: string }[];
}

export interface AsmithaTrack {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  modules: string[];
  focus: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  organization: string;
  areaOfInterest: string;
  message: string;
}
