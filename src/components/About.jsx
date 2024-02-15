
export default function About() {
  return (
    <div className='aboutDiv'>
      
      <section>
        <p className='aboutTitle'>About</p>
        <div className='curve'></div>
      </section>
      
      <div className='container-fluid'>
        <div className='row'>
          <div className='col' id='currentProjects'>
            <p>Current Projects</p>
            <p>Book : Expected June 2023</p>
            <p>Paycheck Calculator : Expected April 2023</p>
          </div>
          <div className='col' id='selfDescription'>
            <p>
            My Name is Joab Bastidas. 
            I am a college graduate from CUNY NYC College of Technology, with an 
            AS in Computer Science. My focus is as a Front End Web Developer, specializing 
            in HTML, React, CSS, SCSS, Bootstrap, JavaScript, and Redux Toolkit. 
            </p>
            <p>
            In my spare time you can catch me playing volleyball and 
            ping pong. I love to draw, play chess and piano. 
            My dream job is one where I feel like I am doing meaningful 
            work and have the freedom to travel the world.
            </p>
            <p>
            I speak English and Spanish fluently and am currently learning 
            Japanese and ASL.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}