export default function Home() {
  return (
    <>
      <section className="bg-blue-600 text-white py-6 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Welcome to Our Online Courses</h1>
          <p className="mt-2 text-lg">
            Start learning today and advance your career!
          </p>
        </div>
      </section>
      <section id="courses" className="py-12 bg-gray-100 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Our Popular Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">React for Beginners</h3>
              <p className="text-gray-600 mt-2">
                Learn the basics of React and start building dynamic web
                applications.
              </p>
              <a
                href="#"
                className="text-blue-600 mt-4 inline-block hover:text-blue-800"
              >
                Learn More
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Advanced JavaScript</h3>
              <p className="text-gray-600 mt-2">
                Master advanced JavaScript concepts and improve your coding
                skills.
              </p>
              <a
                href="#"
                className="text-blue-600 mt-4 inline-block hover:text-blue-800"
              >
                Learn More
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Web Design Fundamentals</h3>
              <p className="text-gray-600 mt-2">
                Understand the core principles of web design and create
                beautiful websites.
              </p>
              <a
                href="#"
                className="text-blue-600 mt-4 inline-block hover:text-blue-800"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">About Us</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We are committed to providing top-quality online education that
            helps people advance their careers. Our courses are designed to be
            engaging, accessible, and practical, with hands-on projects and
            expert instructors guiding you every step of the way.
          </p>
        </div>
      </section>
    </>
  );
}
