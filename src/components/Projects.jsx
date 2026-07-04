import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import table from '../assets/CRUDApp.png';
import weather from '../assets/Weather.png';
import pokedex from '../assets/Pokedex.png';
import payCheck from '../assets/Paycheck.png';
import tracklore from '../assets/TrackLore.jpeg';
import powerBI from '../assets/PowerBI.png';

const projects = [
  {
    id: 1,
    category: 'data',
    tag: 'DATA ANALYTICS',
    title: 'Insurance Claims Data Quality',
    description:
      '1,028 raw claim records cleaned with SQLite, SQL and Excel; Power BI dashboards for claim trends, fraud rate and data quality.',
    imageUrl: powerBI,
    githubLink: 'https://github.com/Joabbas26/insurance-claims-data-quality-analysis',
    demoLink: null,
    demoLabel: null,
    wip: false,
  },
  {
    id: 2,
    category: 'data',
    tag: 'DATA ANALYTICS',
    title: 'Python Data Analysis',
    description:
      'Exploratory data analysis with Pandas, NumPy and Matplotlib/Seaborn on real-world datasets.',
    imageUrl: 'https://placehold.co/400x200/E9E4DA/6B675F?text=Python+Data+Analysis',
    githubLink: 'https://github.com/Joabbas26',
    demoLink: null,
    demoLabel: null,
    wip: true,
  },
  {
    id: 3,
    category: 'data',
    tag: 'DATA ANALYTICS',
    title: 'SQL Portfolio Project',
    description: 'Advanced querying and data modeling on a public dataset.',
    imageUrl: 'https://placehold.co/400x200/E9E4DA/6B675F?text=SQL+Portfolio+Project',
    githubLink: 'https://github.com/Joabbas26',
    demoLink: null,
    demoLabel: null,
    wip: true,
  },
  {
    id: 4,
    category: 'ios',
    tag: 'iOS APP',
    title: 'TrackLore',
    description:
      'Identify theme songs from your favorite TV shows, movies and anime. Live on the App Store.',
    imageUrl: tracklore,
    githubLink: 'https://apps.apple.com/us/app/tracklore/id6747784234',
    demoLink: 'https://apps.apple.com/us/app/tracklore/id6747784234',
    demoLabel: 'App Store',
    external: true,
    wip: false,
  },
  {
    id: 5,
    category: 'web',
    tag: 'WEB DEV',
    title: 'CRUD App',
    description:
      'Data management with modal entry, dynamic tables and calculations. React + Redux Toolkit.',
    imageUrl: table,
    githubLink: 'https://github.com/Joabbas26/CRUD-Table',
    demoLink: '/table',
    demoLabel: 'Live demo',
    wip: false,
  },
  {
    id: 6,
    category: 'web',
    tag: 'WEB DEV',
    title: 'Weather App',
    description:
      'Local weather from the OpenWeatherMap API with a clean, detailed display. React + Axios.',
    imageUrl: weather,
    githubLink: 'https://github.com/Joabbas26/WeatherApp',
    demoLink: '/weather',
    demoLabel: 'Live demo',
    wip: false,
  },
  {
    id: 7,
    category: 'web',
    tag: 'WEB DEV',
    title: 'Paycheck App',
    description:
      'Calculates how much you make per second based on your hourly wage. React + Axios.',
    imageUrl: payCheck,
    githubLink: 'https://github.com/Joabbas26/Paycheck-App',
    demoLink: '/paycheck',
    demoLabel: 'Live demo',
    wip: false,
  },
  {
    id: 8,
    category: 'web',
    tag: 'WEB DEV',
    title: 'Pokedex',
    description:
      'Comprehensive Pokémon info from the official API with real-time data. React + Axios.',
    imageUrl: pokedex,
    githubLink: 'https://github.com/Joabbas26/Pokedex-App',
    demoLink: '/pokedex',
    demoLabel: 'Live demo',
    wip: false,
  },
];

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'data', label: 'Data' },
  { key: 'web', label: 'Web' },
  { key: 'ios', label: 'iOS' },
];

export default function Projects() {
  const location = useLocation();
  const [filter, setFilter] = useState('all');

  // Support /projects#data, #web, #ios deep links (e.g. from Home buttons)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (['data', 'web', 'ios'].includes(hash)) {
      setFilter(hash);
    }
  }, [location.hash]);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="grow w-full">
      <div className="max-w-[1152px] mx-auto px-8 py-16">
        <h1 className="font-serif font-semibold text-3xl md:text-[44px] text-ink mb-3">
          Selected work
        </h1>
        <p className="font-sans text-[17px] text-body mb-9">
          Data analytics first, then full-stack and iOS work.
        </p>

        {/* Filter tabs */}
        <div className="flex gap-2.5 mb-9">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`font-mono text-[13px] px-5 py-2 rounded-full border cursor-pointer ${
                filter === t.key
                  ? 'bg-ink text-btnfg border-ink'
                  : 'bg-transparent text-subtle border-line'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="border border-line bg-card flex flex-col hover:border-accent transition-colors"
            >
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-[170px] object-cover block border-b border-line"
              />
              <div className="p-5 flex flex-col gap-2.5 grow">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-accent">{p.tag}</span>
                  {p.wip && (
                    <span className="font-mono text-[11px] text-warn">IN PROGRESS</span>
                  )}
                </div>
                <h3 className="font-serif font-semibold text-xl text-ink m-0">{p.title}</h3>
                <p className="text-[13px] leading-relaxed text-body grow m-0">{p.description}</p>
                <div className="flex gap-[18px] mt-1.5 font-mono text-xs">
                  <a
                    href={p.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink border-b border-ink pb-0.5"
                  >
                    GitHub →
                  </a>
                  {p.demoLink && (
                    p.external ? (
                      <a
                        href={p.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent border-b border-accent pb-0.5"
                      >
                        {p.demoLabel} →
                      </a>
                    ) : (
                      <Link to={p.demoLink} className="text-accent border-b border-accent pb-0.5">
                        {p.demoLabel} →
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
