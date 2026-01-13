
export interface SignatureData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  connectUrl: string;
  logoUrl: string;
  tagline: string;
  companyName: string;
}

export const INITIAL_DATA: SignatureData = {
  fullName: "Alex Rivera",
  jobTitle: "Systems Architect",
  email: "alex@controlplusa.com",
  phone: "+1 (888) CTRL-ALT",
  website: "www.controlplusa.com",
  address: "San Francisco, CA",
  linkedin: "https://linkedin.com/company/controlplusa",
  twitter: "https://twitter.com/controlplusa",
  instagram: "https://instagram.com/controlplusa",
  connectUrl: "https://controlplusa.com/contact",
  logoUrl: "https://i.ibb.co/LdpS7M4/control-logo.png",
  tagline: "Systems that just work.",
  companyName: "ControlplusA"
};
