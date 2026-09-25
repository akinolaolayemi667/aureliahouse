import { HomeHero } from '@/components/home/HomeHero';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function HomePage() {
  usePageMeta();

  return <HomeHero />;
}
