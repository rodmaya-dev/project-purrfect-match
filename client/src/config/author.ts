// En la página "About the author" (components/About) lo
// dibuja como un botón por cada elemento de la lista.
import type { ExternalLink } from '../types/link';

export const AUTHOR_NAME = 'Rodrigo Maya';

export const AUTHOR_LINKS: ExternalLink[] = [
  { label: 'GitHub', url: 'https://github.com/rodmaya-dev' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rod-maya/' },
  { label: 'Personal website', url: 'https://rodmaya-dev.github.io/' },
];