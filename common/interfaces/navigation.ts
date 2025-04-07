export interface NavigationLink {
  label: string;
  url: string;
  external?: boolean;
  target?: '_self'|'_blank';
}

export const Items: NavigationLink[] = [
  { label: "Home", url: "/" },
  { label: "Tech", url: "/tech" },
  { label: "Lifesyle", url: "/lifestyle" },
  // {label: 'Games', url: '/games'},
  { label: "Contact us", url: "/contact" },
  { label: "Blog", url: "/blog" },
];