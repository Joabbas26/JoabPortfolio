import { Link } from 'react-router-dom';
import Joab from '../assets/Joab.png';

export default function Home() {
  return (
    <div className="grow w-full">
      <div className="max-w-[1152px] mx-auto grid gap-16 px-8 py-16 md:py-24 md:grid-cols-[7fr_5fr] md:gap-[72px] items-center">
        <div>
          <p className="font-mono text-[13px] tracking-[0.12em] text-accent mb-5">
            DATA ANALYST · NEW YORK, NY
          </p>
          <h1 className="font-serif font-semibold text-4xl md:text-[58px] md:leading-[1.08] text-ink mb-6">
            I turn raw data into clear, defensible decisions.
          </h1>
          <p className="font-sans text-lg md:text-[19px] leading-relaxed text-body mb-9">
            Python, SQL, Power BI and Excel — backed by an accounting degree and
            hands-on full-stack development experience.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              to="/projects#data"
              className="bg-ink text-btnfg px-6 py-3.5 font-mono text-sm"
            >
              View data projects →
            </Link>
            <Link
              to="/about"
              className="border border-ink text-ink px-6 py-3.5 font-mono text-sm"
            >
              About me
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <img
            src={Joab}
            alt="Joab Bastidas"
            className="w-[260px] h-[260px] object-cover rounded-full border border-line self-center"
          />
          <div className="border-t border-line pt-5 grid grid-cols-3 gap-4 font-sans">
            <div>
              <p className="font-mono text-[11px] tracking-[0.1em] text-accent mb-1.5">DATA</p>
              <p className="text-sm leading-[1.7] text-body">Python · SQL<br />Power BI · Excel</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.1em] text-accent mb-1.5">WEB</p>
              <p className="text-sm leading-[1.7] text-body">React · Node.js<br />JavaScript · Tailwind</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.1em] text-accent mb-1.5">iOS</p>
              <p className="text-sm leading-[1.7] text-body">Swift<br />App Store shipped</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
