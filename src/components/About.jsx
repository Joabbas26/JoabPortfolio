export default function About() {
  
  return (
    <div className="bg-gray-800 py-20 grow">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">About Me</h1>
        <div className="grid gap-6 p-6 md:grid-cols-4">
          <div className="bg-gray-700 rounded-lg p-6 shadow-md md:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-white">Current Projects</h2>
            <p className="mb-2 text-white">Web Scraper: Expected May 2024</p>
            <p className="mb-2 text-white">Clash Royale Computer Vision: Expected June 2024</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 shadow-md md:col-span-3">
            <h2 className="text-xl font-bold mb-4 text-white">Introduction</h2>
            <p className="mb-4 text-white">
            My name is Joab Bastidas, a recent graduate from CUNY NYC College of Technology with an Associate's degree in Computer Science. I'm profiecent in HTML, CSS, JavaScript, React and Tailwind CSS, and am learning NodeJS, Express and Python to improve my web development skills.
            </p>
            <p className="mb-4 text-white">
            When I'm not coding, you can find me playing Chess or ping pong. I also enjoy drawing, playing guitar, and tinkering on the piano to keep my creative juices flowing. 
            </p>
            <p className="mb-4 text-white">
            But beyond the music and sports, I'm currently learning French and Japanese. With plans to learn Portuguese and hopefully travel abroad soon.
            </p>
            <p className="mb-4 text-white">
            Ultimately, I'm on the lookout for opportunities that not only challenge me intellectually but also allow me to make a meaningful impact. After all, life's about the journey, and I'm excited to see where the path leads next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

