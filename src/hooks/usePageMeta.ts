import { useEffect } from 'react';
import { site } from '@/data/site';

type PageMeta = {
  title?: string;
  description?: string;
  /** Keep the page out of search results (internal/reference pages) */
  noIndex?: boolean;
};

function setMeta(name: string, content: string | null) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (content === null) {
    tag?.remove();
    return;
  }
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function usePageMeta({ title, description, noIndex = false }: PageMeta = {}) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
    setMeta('description', description ?? site.description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : null);
  }, [title, description, noIndex]);
}
