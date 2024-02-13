import '../styles/Footer.scss'

export default function Footer() {
  return (
    <div className='footer'>
        <footer className="bg-gray-800 text-white py-8 fixed bottom-0 left-0 w-full z-10">
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Contact Me</h2>
      <p>Email: example@example.com</p>
      <p>Phone: +123 456 7890</p>
    </div>
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Follow Me</h2>
      <div className="flex space-x-4">
        <a href="#" className="text-white hover:text-gray-300">Twitter</a>
        <a href="#" className="text-white hover:text-gray-300">GitHub</a>
        <a href="#" className="text-white hover:text-gray-300">LinkedIn</a>
      </div>
    </div>
  </div>
  <div className="mt-4 text-center">
    <p>&copy; 2024 Joab Bastidas. All rights reserved.</p>
    <a href="https://www.flaticon.com/free-icons/technology" title="technology icons">Technology icons created by Freepik - Flaticon</a>
  </div>
</footer>
    </div>
  )
}