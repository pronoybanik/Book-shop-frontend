import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Section 1: About Us */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            src="https://noraure-5.myshopify.com/cdn/shop/articles/blog_7.jpg?v=1646452858"
            alt="Books and creativity"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-red-600">What We Are.</h2>
          <p className="mt-4 text-gray-700">
            Boake provides how all this Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry’s standard dummy.
          </p>
          <p className="mt-4 text-gray-700">
            Typesetting, remaining essentially unchanged, it was popularised
            with the release of Contrary to popular belief, Lorem Ipsum is
            random text.
          </p>
          <p className="mt-4 text-gray-700">
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing.
          </p>
        </div>
      </div>

      {/* Section 2: Testimonials */}
      <div className="bg-gradient-to-b from-gray-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">What Clients Say</h2>
          <p className="mt-2 text-gray-600">
            Contrary to popular belief, Lorem Ipsum is not simply random.
          </p>

          <div className="mt-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src="https://noraure-5.myshopify.com/cdn/shop/files/team5_100x.jpg?v=1646287754"
                alt="Client"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-6 text-gray-700 max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in
              reprehenderit.
            </p>
            <p className="mt-4 text-indigo-600 font-medium">Hester Perkins</p>
          </div>
        </div>
      </div>

      {/* Vertical Text */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm rotate-90 origin-bottom-left">
        <span className="tracking-widest">Trending book collection release</span>
      </div>
    </div>
  );
};

export default About;
