export default function About() {
  
  return (
    <div className="bg-gray-800 py-20 grow">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">About Me</h1>
        <div className="grid gap-6 p-6 md:grid-cols-4">
          <div className="bg-gray-700 rounded-lg p-6 shadow-md md:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-white">Current Focus</h2>
            <p className="mb-2 text-white">Python Data Analysis: In Progress</p>
            <p className="mb-2 text-white">Power BI Dashboard: In Progress</p>
            <p className="mb-2 text-white">SQL Portfolio Project: In Progress</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 shadow-md md:col-span-3">
            <h2 className="text-xl font-bold mb-4 text-white">Introduction</h2>
            <p className="mb-4 text-white">
            My name is Joab Bastidas, a data analyst in training with a BA in Accounting from UMPI and a degree in Computer Science from NYC College of Technology. My quantitative background drives my passion for turning raw data into clear, actionable insights using Python, SQL, Power BI, and Excel.
            </p>
            <p className="mb-4 text-white">
            I also have hands-on web development experience — building full-stack applications with React, JavaScript, Node.js, and Tailwind CSS — which gives me a strong technical foundation for working with data pipelines, dashboards, and automated reporting.
            </p>
            <p className="mb-4 text-white">
            When I&apos;m not coding or analyzing data, I enjoy drawing, playing volleyball, ping pong, guitar, and chess with friends to keep my creative juices flowing.
            </p>
            <p className="mb-4 text-white">
            I&apos;m currently studying French and Japanese, with plans to learn Korean as well, and I hope to travel to France, Japan, and South Korea soon. Ultimately, I&apos;m looking for opportunities that challenge me analytically and allow me to make a meaningful impact through data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

