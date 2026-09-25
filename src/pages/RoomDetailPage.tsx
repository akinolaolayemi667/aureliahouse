import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { getRoomBySlug } from '@/data/rooms';
import { usePageMeta } from '@/hooks/usePageMeta';
import NotFoundPage from './NotFoundPage';

export default function RoomDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const room = getRoomBySlug(slug);

  usePageMeta({ title: room?.name, description: room?.tagline });

  if (!room) return <NotFoundPage />;

  return <PageHeader eyebrow={room.category} title={room.name} description={room.tagline} />;
}
