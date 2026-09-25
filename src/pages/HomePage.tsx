import { HomeDestination } from '@/components/home/HomeDestination';
import { HomeDining } from '@/components/home/HomeDining';
import { HomeExperiences } from '@/components/home/HomeExperiences';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeMoment } from '@/components/home/HomeMoment';
import { HomeRooms } from '@/components/home/HomeRooms';
import { HomeSpa } from '@/components/home/HomeSpa';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function HomePage() {
  usePageMeta();

  return (
    <>
      <HomeHero />
      <HomeRooms />
      <HomeExperiences />
      <HomeDining />
      <HomeSpa />
      <HomeDestination />
      <HomeMoment />
    </>
  );
}
