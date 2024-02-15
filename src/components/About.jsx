export default function About() {
  return (
    <div className="bg-gray-800 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">About Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Current Projects</h2>
            <p className="mb-2">Book: Expected June 2023</p>
            <p className="mb-2">Paycheck Calculator: Expected April 2023</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Introduction</h2>
            <p className="mb-4">
              My name is Joab Bastidas. I am a college graduate from CUNY NYC College of Technology, with an AS in Computer Science. My focus is as a Web Developer, specializing in HTML, React, CSS, Tailwind CSS, JavaScript, Node.js, SQL, and Redux.
            </p>
            <p className="mb-4">
              In my spare time, you can catch me playing volleyball and ping pong. I love to draw, play chess, and piano. My dream job is one where I feel like I am doing meaningful work and have the freedom to travel the world.
            </p>
            <p>
              I speak English and Spanish fluently and am currently learning Japanese and ASL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
