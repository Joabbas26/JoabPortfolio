export default function About() {
  return (
    <div className="grow w-full">
      <div className="max-w-[1152px] mx-auto grid gap-12 px-8 py-16 md:grid-cols-[7fr_4fr] md:gap-[72px]">
        <div>
          <h1 className="font-serif font-semibold text-3xl md:text-[44px] text-ink mb-7">
            Numbers first, then the story.
          </h1>
          <div className="font-sans text-base leading-[1.75] text-body flex flex-col gap-[18px]">
            <p>
              I&apos;m a data analyst in training with a BA in Accounting from UMPI and a
              Computer Science degree from NYC College of Technology. My quantitative
              background drives my passion for turning raw data into clear, actionable
              insights using Python, SQL, Power BI, and Excel.
            </p>
            <p>
              I also have hands-on web development experience — building full-stack
              applications with React, JavaScript, Node.js, and Tailwind CSS — which gives
              me a strong technical foundation for data pipelines, dashboards, and
              automated reporting.
            </p>
            <p>
              When I&apos;m not coding or analyzing data, I enjoy drawing, playing volleyball,
              ping pong, guitar, and chess with friends to keep my creative juices flowing.
            </p>
            <p>
              I&apos;m currently studying French and Japanese, with plans to learn Korean as
              well — and I hope to travel to France, Japan, and South Korea soon.
              Ultimately, I&apos;m looking for opportunities that challenge me analytically and
              let me make a meaningful impact through data.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="border border-line bg-card p-6">
            <p className="font-mono text-xs tracking-[0.12em] text-accent mb-3.5">
              CURRENTLY BUILDING
            </p>
            <div className="flex flex-col gap-2.5 font-sans text-sm text-body">
              <span>Python Data Analysis</span>
              <span>Power BI Dashboard</span>
              <span>SQL Portfolio Project</span>
            </div>
          </div>
          <div className="border border-line bg-card p-6">
            <p className="font-mono text-xs tracking-[0.12em] text-accent mb-3.5">
              EDUCATION
            </p>
            <div className="flex flex-col gap-2.5 font-sans text-sm text-body">
              <span>BA Accounting — UMPI</span>
              <span>Computer Science — NYC College of Technology</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
