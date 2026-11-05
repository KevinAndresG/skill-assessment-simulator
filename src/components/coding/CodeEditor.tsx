'use client';

import { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { Compartment } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import type { Language } from '@/content/types';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  label?: string;
  language?: Language;
}

const langExt = (l: Language) => javascript({ typescript: l === 'ts' });

/**
 * Editor CodeMirror 6: resaltado, autocompletado, auto-indent, cierre de llaves,
 * Tab indenta, Ctrl/⌘+Enter ejecuta.
 */
export function CodeEditor({ value, onChange, onRun, label = 'Editor de código', language = 'js' }: CodeEditorProps) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const lang = useRef(new Compartment());
  const cb = useRef({ onChange, onRun });
  useEffect(() => { cb.current = { onChange, onRun }; });

  useEffect(() => {
    const v = new EditorView({
      parent: host.current!,
      doc: value,
      extensions: [
        basicSetup,
        keymap.of([
          { key: 'Mod-Enter', run: () => { cb.current.onRun?.(); return true; } },
          indentWithTab,
        ]),
        lang.current.of(langExt(language)),
        oneDark,
        EditorView.contentAttributes.of({ 'aria-label': label, spellcheck: 'false' }),
        EditorView.updateListener.of(u => { if (u.docChanged) cb.current.onChange(u.state.doc.toString()); }),
      ],
    });
    view.current = v;
    return () => v.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- editor se crea una vez; value/language se sincronizan abajo
  }, []);

  // Cambios externos (reiniciar, cambiar lenguaje).
  useEffect(() => {
    const v = view.current;
    if (v && v.state.doc.toString() !== value) v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: value } });
  }, [value]);
  useEffect(() => { view.current?.dispatch({ effects: lang.current.reconfigure(langExt(language)) }); }, [language]);

  return <div ref={host} className="code-editor" />;
}
