import { Fragment } from "react";

// Challenge-card body text carries `**bold**` emphasis markers, authored in
// the GMS brief to mark the crux of each bullet. Rendering them inline keeps
// that emphasis without putting raw HTML into the data module.
const EMPHASIS_RE = /\*\*(.+?)\*\*/g;

/** Renders a string with `**bold**` spans emphasised. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  for (const m of text.matchAll(EMPHASIS_RE)) {
    const start = m.index ?? 0;
    if (start > cursor) {
      parts.push(<Fragment key={parts.length}>{text.slice(cursor, start)}</Fragment>);
    }
    parts.push(
      <strong key={parts.length} className="font-semibold text-foreground">
        {m[1]}
      </strong>
    );
    cursor = start + m[0].length;
  }

  if (cursor < text.length) {
    parts.push(<Fragment key={parts.length}>{text.slice(cursor)}</Fragment>);
  }

  return <>{parts}</>;
}

export default RichText;
