// Start of Selection
import { siteText } from '@/config/site';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const containerClass =
  'min-h-[calc(100vh-var(--navbar-height)-var(--primary-offset)*2)] flex items-center justify-center';
const containerInline = 'flex flex-col items-center text-center gap-6 p-8 max-w-md';
const titleClass = 'text-6xl font-extrabold text-red-500 drop-shadow animate-pulse';
const descClass = 'text-lg';
const linkClass =
  'inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-400 text-red-900';

export default function NotFoundSection() {
  return (
    <section className={containerClass}>
      <div className={containerInline}>
        <h1 className={titleClass}>{siteText.notFound.title}</h1>
        <h2 className={descClass}>{siteText.notFound.description}</h2>
        <Link href="/" className={linkClass} aria-label={siteText.notFound.returnHomeButton}>
          <ArrowLeft />
          <span>{siteText.notFound.returnHomeButton}</span>
        </Link>
      </div>
    </section>
  );
}
