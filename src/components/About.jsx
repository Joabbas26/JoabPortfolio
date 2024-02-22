export default function About() {
  return (
    <div className="bg-gray-800 py-20 grow">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">About Me</h1>
        <div className="grid md:grid-cols-4 gap-6 p-6">
          <div className="bg-gray-700 rounded-lg p-6 shadow-md md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Current Projects</h2>
            <p className="mb-2">Book: Expected June 2024</p>
            <p className="mb-2">Paycheck Calculator: Expected April 2024</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 shadow-md md:col-span-3">
            <h2 className="text-xl font-bold mb-4">Introduction</h2>
            <p className="mb-4">
            Hey there, I'm Joab Bastidas, a graduate from CUNY NYC College of Technology with a passion for crafting delightful web experiences. Armed with an AS in Computer Science, I've honed my skills as a Web Developer, specializing in crafting elegant solutions with HTML, React, CSS, and more.
            </p>
            <p className="mb-4">
            Beyond coding, you'll often find me immersed in friendly games of volleyball or ping pong, where I thrive on the camaraderie and competition. I also have a penchant for unleashing my creativity through drawing and finding the perfect move on the chessboard, all while tickling the ivories of the piano.
            </p>
            <p className="mb-4">
            But beyond the screen and sports, I'm on a journey of self-discovery and growth. Currently, I'm delving into the intricacies of the French language, adding another layer of richness to my linguistic repertoire alongside English and Spanish. And who knows? Perhaps Japanese and ASL will soon follow suit.
            </p>
            <p className="mb-4">
            Ultimately, I'm on the lookout for opportunities that not only challenge me intellectually but also allow me to make a meaningful impact while indulging my wanderlust spirit. After all, life's about the journey, and I'm excited to see where the path leads next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

