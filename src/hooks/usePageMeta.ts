import { useEffect } from 'react';
import { site } from '@/data/site';

type PageMeta = {
  title?: string;
  description?: string;
};

function setMetaDescription(content: string) {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = 'description';
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function usePageMeta({ title, description }: PageMeta = {}) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
    setMetaDescription(description ?? site.description);
  }, [title, description]);
}
