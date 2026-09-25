import { HomeHero } from '@/components/home/HomeHero';
import { HomeRooms } from '@/components/home/HomeRooms';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function HomePage() {
  usePageMeta();

  return (
    <>
      <HomeHero />
      <HomeRooms />
    </>
  );
}
