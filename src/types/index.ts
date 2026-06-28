export interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  businessType: string;
  selectedPackage: string;
  requirements: string;
  budget?: string;
  timestamp?: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  metrics: { label: string; value: string }[];
}
