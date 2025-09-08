export default function About() {
  
  return (
    <div className="bg-gray-800 py-20 grow">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">About Me</h1>
        <div className="grid gap-6 p-6 md:grid-cols-4">
          <div className="bg-gray-700 rounded-lg p-6 shadow-md md:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-white">Current Projects</h2>
            <p className="mb-2 text-white">Shazam for Theme Songs: Expected October 2025</p>
            <p className="mb-2 text-white">Imposter Game: Expected November 2025</p>
            <p className="mb-2 text-white">Battle Islands Game: Expected December 2025</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 shadow-md md:col-span-3">
            <h2 className="text-xl font-bold mb-4 text-white">Introduction</h2>
            <p className="mb-4 text-white">
            My name is Joab Bastidas, a student working on my BA in Mathematics at Queens College and with a degree in Computer Science from NYC College of Technology. I&apos;m profiecent in HTML, CSS, JavaScript, React, Swift and Tailwind CSS. I am also learning NodeJS, Express and Python to improve my web development/programming skills.
            </p>
            <p className="mb-4 text-white">
            When I&apos;m not coding, I enjoy drawing, playing volleyball, ping pong, guitar, and chess with friends to keep my creative juices flowing. 
            </p>
            <p className="mb-4 text-white">
            Aside from those, I am currently studying French and Japanese, with plans to learn Portuguese as well. My goal is to be able to travel abroad soon and visit the beautiful countries of France, Japan and Portugal.
            </p>
            <p className="mb-4 text-white">
            Ultimately, I&apos;m on the lookout for opportunities that not only challenge me intellectually but also allow me to make a meaningful impact. After all, life&apos;s about the journey, and I&apos;m excited to see where the path leads next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

