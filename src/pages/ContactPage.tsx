import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/animations';
import { Button } from '@/components/ui/Button';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';
import { arrival, contactPage, enquiryAliases, enquiryTopics, type EnquiryTopic } from '@/data/contact';
import { getRoomBySlug, rooms } from '@/data/rooms';
import { site } from '@/data/site';
import type { Room } from '@/data/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/cn';

type Enquiry = { topic: EnquiryTopic; room?: Room };
type MessageDetails = { name: string; phone: string; dates: string; message: string };

const defaultTopic = enquiryTopics.find((item) => item.id === 'reservations')!;

/* `?enquiry=` names a topic, an alias such as `rooms`, or a room slug — so any page can link straight to the right message. */
function readEnquiry(params: URLSearchParams): Enquiry {
  const value = params.get('enquiry') ?? '';
  const room = getRoomBySlug(value);
  const id = room ? 'reservations' : (enquiryAliases[value] ?? value);
  const topic = enquiryTopics.find((item) => item.id === id) ?? defaultTopic;
  return { topic, room: topic.id === 'reservations' ? room : undefined };
}

const inboxEmail = (topic: EnquiryTopic) =>
  topic.inbox === 'reservations' ? site.contact.reservationsEmail : site.contact.email;

export default function ContactPage() {
  usePageMeta({ title: 'Contact', description: contactPage.description });

  const [params, setParams] = useSearchParams();
  const enquiry = readEnquiry(params);
  const [details, setDetails] = useState<MessageDetails>({ name: '', phone: '', dates: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (topic: EnquiryTopic, room?: Room) => {
    const value = topic.id === 'reservations' && room ? room.slug : topic.id;
    setParams({ enquiry: value }, { replace: true, preventScrollReset: true });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    window.location.href = messageEmail(enquiry, details);
    setSent(true);
  };

  return (
    <>
      <ContactIntro />
      <Section tone="ivory" spacing="none" className="pb-section-lg">
        <div className="grid-editorial-bleed gap-y-20 lg:items-start">
          <div className="col-content lg:col-[2/9]">
            {sent ? (
              <MessageSent email={inboxEmail(enquiry.topic)} onEdit={() => setSent(false)} />
            ) : (
              <EnquiryForm
                enquiry={enquiry}
                details={details}
                onEnquiryChange={update}
                onDetailsChange={setDetails}
                onSubmit={handleSubmit}
              />
            )}
          </div>
          <DirectContacts />
        </div>
      </Section>
      <Arrival />
    </>
  );
}

function ContactIntro() {
  return (
    <Section tone="ivory" spacing="lg" className="pb-section-sm">
      <header className="grid-editorial-bleed gap-y-10">
        <div className="col-content lg:col-[2/9]">
          <Reveal immediate delay={0.2}>
            <p className="eyebrow text-accent">{contactPage.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.35}
            text={contactPage.title}
            emphasis={contactPage.titleEmphasis}
            interval={0.09}
            className="mt-6 font-display text-display text-fg md:mt-8"
          />
        </div>
        <Reveal immediate delay={0.8} className="col-content md:col-[7/14] lg:col-[10/14] lg:self-end lg:pb-3">
          <p className="max-w-sm text-lead text-fg-muted">{contactPage.description}</p>
        </Reveal>
      </header>
    </Section>
  );
}

const labelClasses = 'caps text-label text-fg';
const optional = <span className="text-fg-muted normal-case tracking-normal">(optional)</span>;
const inputClasses =
  'mt-3 w-full border-b border-line-strong bg-transparent py-3 text-body text-fg transition-colors duration-500 ease-luxe placeholder:text-fg-muted/70 focus-visible:border-fg focus-visible:shadow-[0_1px_0_0_currentColor] focus-visible:outline-none';

type EnquiryFormProps = {
  enquiry: Enquiry;
  details: MessageDetails;
  onEnquiryChange: (topic: EnquiryTopic, room?: Room) => void;
  onDetailsChange: (details: MessageDetails) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function EnquiryForm({ enquiry, details, onEnquiryChange, onDetailsChange, onSubmit }: EnquiryFormProps) {
  const ids = { title: useId(), room: useId(), dates: useId(), name: useId(), phone: useId(), message: useId() };
  const { topic, room } = enquiry;
  const set = (next: Partial<MessageDetails>) => onDetailsChange({ ...details, ...next });

  return (
    <form onSubmit={onSubmit} aria-labelledby={ids.title} className="border-t border-line pt-10">
      <h2 id={ids.title} className="font-display text-h3 text-fg">
        {contactPage.form.title}
      </h2>

      <Reveal className="mt-10">
        <fieldset className="min-w-0">
          <legend className={labelClasses}>{contactPage.form.topicLegend}</legend>
          <div className="mt-3 flex flex-wrap gap-x-8 md:gap-x-10">
            {enquiryTopics.map((item) => (
              <label key={item.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="topic"
                  value={item.id}
                  checked={topic.id === item.id}
                  onChange={() => onEnquiryChange(item, room)}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    'caps relative flex min-h-12 items-center text-label text-fg-muted transition-colors duration-500 ease-luxe hover:text-fg',
                    'after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-fg after:transition-transform after:duration-700 after:ease-luxe',
                    'peer-checked:text-fg peer-checked:after:scale-x-100',
                    'peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
                  )}
                >
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </Reveal>

      <Reveal className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {topic.id === 'reservations' && (
          <div>
            <label htmlFor={ids.room} className={labelClasses}>
              {contactPage.form.room}
            </label>
            <div className="relative">
              <select
                id={ids.room}
                value={room?.slug ?? ''}
                onChange={(event) => onEnquiryChange(topic, getRoomBySlug(event.target.value))}
                className={cn(inputClasses, 'cursor-pointer appearance-none pr-8')}
              >
                <option value="">{contactPage.form.anyRoom}</option>
                {rooms.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-4 size-4 stroke-[1.25] text-fg-muted"
              />
            </div>
          </div>
        )}
        <div className={cn(topic.id !== 'reservations' && 'sm:col-span-2 sm:max-w-[calc(50%-1.25rem)]')}>
          <label htmlFor={ids.dates} className={labelClasses}>
            {contactPage.form.dates} {optional}
          </label>
          <input
            id={ids.dates}
            type="text"
            placeholder={topic.datesPlaceholder}
            value={details.dates}
            onChange={(event) => set({ dates: event.target.value })}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor={ids.name} className={labelClasses}>
            Full name
          </label>
          <input
            id={ids.name}
            type="text"
            required
            autoComplete="name"
            value={details.name}
            onChange={(event) => set({ name: event.target.value })}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor={ids.phone} className={labelClasses}>
            Phone {optional}
          </label>
          <input
            id={ids.phone}
            type="tel"
            autoComplete="tel"
            value={details.phone}
            onChange={(event) => set({ phone: event.target.value })}
            className={inputClasses}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={ids.message} className={labelClasses}>
            Your message
          </label>
          <textarea
            id={ids.message}
            required
            rows={5}
            placeholder={topic.placeholder}
            value={details.message}
            onChange={(event) => set({ message: event.target.value })}
            className={cn(inputClasses, 'resize-none')}
          />
        </div>
      </Reveal>

      <Reveal className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
        <Button type="submit" size="lg" icon={<ArrowRight />} className="max-sm:w-full">
          {contactPage.form.cta}
        </Button>
        <p className="max-w-xs text-small text-fg-muted">{contactPage.form.note}</p>
      </Reveal>
    </form>
  );
}

function MessageSent({ email, onEdit }: { email: string; onEdit: () => void }) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <div>
      <div ref={headingRef} tabIndex={-1} className="border-t border-gold/70 pt-10 outline-none">
        <p className="eyebrow text-accent">{contactPage.sent.eyebrow}</p>
        <TextReveal
          as="h2"
          immediate
          text={contactPage.sent.title}
          emphasis={contactPage.sent.titleEmphasis}
          interval={0.08}
          className="mt-6 font-display text-h1 text-fg md:mt-8"
        />
      </div>
      <Reveal immediate delay={0.4}>
        <p className="mt-8 max-w-lg text-body text-fg-muted">{contactPage.sent.body}</p>
        <a
          href={`mailto:${email}`}
          className="mt-6 inline-block font-display text-h4 text-fg underline decoration-line-strong underline-offset-8 transition-luxe hover:decoration-fg"
        >
          {email}
        </a>
        <div className="mt-12">
          <Button variant="secondary" onClick={onEdit}>
            {contactPage.sent.edit}
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

function DirectContacts() {
  const titleId = useId();
  const { direct } = contactPage;
  const valueClasses = 'mt-2 block w-fit text-body text-fg [overflow-wrap:anywhere]';

  return (
    <aside aria-labelledby={titleId} className="col-content lg:col-[10/14]">
      <Reveal className="border-t border-gold/70 pt-8">
        <h2 id={titleId} className="eyebrow text-accent">
          {direct.title}
        </h2>
        <ul className="mt-6 border-t border-line">
          {[direct.reservations, direct.house].map((item) => (
            <li key={item.label} className="border-b border-line py-5">
              <p className="caps text-label-sm text-fg-muted">{item.label}</p>
              <Link href={`mailto:${item.email}`} variant="underline" className={valueClasses}>
                {item.email}
              </Link>
            </li>
          ))}
          <li className="border-b border-line py-5">
            <p className="caps text-label-sm text-fg-muted">{direct.phone.label}</p>
            <Link href={direct.phone.href} variant="underline" className={valueClasses}>
              {direct.phone.value}
            </Link>
            <p className="mt-2 text-small text-fg-muted">{direct.phone.hours}</p>
          </li>
          <li className="border-b border-line py-5">
            <p className="caps text-label-sm text-fg-muted">{direct.address.label}</p>
            <address className="mt-2 text-body not-italic text-fg">
              {site.address.line1}
              <br />
              {site.address.line2}, {site.address.country}
            </address>
            <Link href={site.address.mapUrl} variant="luxury" className="mt-4">
              {direct.address.mapLabel}
            </Link>
          </li>
        </ul>

        <div className="mt-10">
          <p className="text-small text-fg-muted">{contactPage.booking.label}</p>
          <Link to={contactPage.booking.link.to} variant="luxury" className="mt-3">
            {contactPage.booking.link.label}
          </Link>
        </div>
      </Reveal>
    </aside>
  );
}

function Arrival() {
  const titleId = useId();

  return (
    <Section tone="sand" textured aria-labelledby={titleId}>
      <div className="grid-editorial-bleed gap-y-14 lg:items-center">
        <div className="col-content md:col-[2/8] lg:col-[2/6]">
          <ImageWrapper
            src={arrival.image}
            alt={arrival.imageAlt}
            ratio="portrait"
            shape="arch"
            reveal
            sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw"
            className="max-md:mx-auto max-md:max-w-[22rem]"
          />
        </div>

        <div className="col-content lg:col-[7/14]">
          <Reveal>
            <p className="eyebrow text-accent">{arrival.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            id={titleId}
            text={arrival.title}
            emphasis={arrival.titleEmphasis}
            interval={0.08}
            className="mt-6 font-display text-h2 text-fg md:mt-8"
          />
          <Reveal>
            <p className="mt-8 max-w-reading text-body text-fg-muted">{arrival.description}</p>
          </Reveal>

          <Stagger as="ul" interval={0.08} className="mt-12 grid gap-x-12 md:grid-cols-2 xl:gap-x-16">
            {arrival.items.map((item) => (
              <StaggerItem as="li" key={item.label} className="border-t border-line py-6">
                <p className="caps text-label text-fg">{item.label}</p>
                <p className="mt-3 max-w-xs text-small text-fg-muted">{item.detail}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

function messageEmail({ topic, room }: Enquiry, details: MessageDetails) {
  const stay = [
    ...(topic.id === 'reservations' ? [`Room: ${room ? room.name : 'No preference'}`] : []),
    ...(details.dates ? [`Dates: ${details.dates}`] : []),
  ];
  const signature = [details.name, ...(details.phone ? [details.phone] : [])];
  const body = [[details.message], stay, signature]
    .filter((block) => block.length > 0)
    .map((block) => block.join('\n'))
    .join('\n\n');

  const subject = `${topic.subject} — ${details.name}`;
  return `mailto:${inboxEmail(topic)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
