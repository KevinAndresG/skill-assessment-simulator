import type { ReactNode } from 'react';

export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <>
      <h1>{title}</h1>
      {children && <p className="sub">{children}</p>}
    </>
  );
}
