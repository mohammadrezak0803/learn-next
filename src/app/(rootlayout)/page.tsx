// src/app/page.tsx

interface ICourse {
  id: number;
  title: string;
  description: string;
}

const fetchCourses = async (): Promise<ICourse[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/courses", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text(); // این برای دریافت جزئیات بیشتر است
      throw new Error(`Failed to fetch courses. Status: ${res.status}, Response: ${errorText}`);
    }

    const data = await res.json();
    return data.courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Error fetching courses");
  }
};


export default async function Home() {
  const courses = await fetchCourses();

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
            {courses.length > 0 ? (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                  <a
                    href="#"
                    className="text-blue-600 mt-4 inline-block hover:text-blue-800"
                  >
                    Learn More
                  </a>
                </div>
              ))
            ) : (
              <p>No courses available. Please check back later!</p>
            )}
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
