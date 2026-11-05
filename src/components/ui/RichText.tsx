import { cx } from '@/lib/utils';

/**
 * Renderiza HTML simple que viene del contenido propio (code, b, br).
 * Si el contenido llega a venir de usuarios externos, sanitízalo antes (p. ej. DOMPurify).
 */
export function RichText({ html, className, as: Tag = 'div' }: { html: string; className?: string; as?: 'div' | 'span' | 'td' }) {
  return <Tag className={cx(className)} dangerouslySetInnerHTML={{ __html: html.replace(/\n/g, ' ') }} />;
}
