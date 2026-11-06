const icons = {
  paw: <> <g fill="currentColor" stroke="none"><ellipse cx="5" cy="9" rx="2.6" ry="3.4" transform="rotate(-22 5 9)"/><ellipse cx="10" cy="5" rx="2.6" ry="3.4"/><ellipse cx="16.4" cy="5.8" rx="2.6" ry="3.4" transform="rotate(15 16 6)"/><ellipse cx="21" cy="10.7" rx="2.4" ry="3.1"/><path d="M5 18q.3-2.5 3-5.4 4-6 8-.4 1 1.7 3 4 3.2 6-3 5-3.9-1.6-7.4-.2Q4 22 5 18Z"/></g> </>,
  user: <> <circle cx="12" cy="8" r="4"/><path d="M4 21q1-12 12-8 3 1 4 8"/> </>,
  arrow: <> <path d="M3 12h17m-6-6 6 6-6 6"/> </>,
  cross: <> <path fill="currentColor" stroke="none" d="M8 1h8v7h7v8h-7v7H8v-7H1V8h7z"/> </>,
  home: <> <path d="m2 10 10-8 10 8M5 9v12h14V9m-9 12v-8h4v8"/> </>,
  calendar: <> <rect x="3" y="5" width="18" height="16" rx="3" fill="#faf7dd"/><path d="M3 10h18M8 2v6m8-6v6m-7 8 2 2 4-5"/> </>,
  doctor: <> <path d="M4 3H2v6a5 5 0 0 0 10 0V3h-2M7 14v2a6 6 0 0 0 12 0v-2"/><circle cx="19" cy="10.5" r="3" fill="#f6e1bf"/> </>,
  vaccine: <> <g transform="rotate(40 12 12)"><path fill="#f7e5c6" d="M8 7h8v9l-4 3-4-3Z"/><path d="M12 2v5M9 2h6M6 7h12m-6 12v4m1-13h3m-3 3h3"/></g> </>,
  record: <> <path d="M5 3h10l4 4v14H5Z" fill="#f8edcc"/><path d="M14 3v5h5M8 12h8m-8 4h5"/> </>,
};

export default function Icon({ name }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}
