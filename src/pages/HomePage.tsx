import { HomeDestination } from '@/components/home/HomeDestination';
import { HomeDining } from '@/components/home/HomeDining';
import { HomeExperiences } from '@/components/home/HomeExperiences';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeOffers } from '@/components/home/HomeOffers';
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
      <HomeOffers />
      <HomeDestination />
    </>
  );
}
