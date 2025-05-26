const About = () => {
  return (
    <section>
      <div className="relative lg:h-[300px] md:h-[400px] h-80 bg-[url(https://images.unsplash.com/photo-1694232823592-20507733009c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvb2slMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/20 sm:from-black/50 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="flex items-center justify-center h-full">
          <div className="relative px-4">
            <p className="text-white max-w-screen-sm text-center lg:text-4xl md:text-3xl text-2xl sm:text-xl">
              About US
            </p>
          </div>
        </div>
      </div>

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
            <h2 className="text-2xl font-semibold text-[#e95b5b]">
              What We Are.
            </h2>
            <p className="mt-4 text-gray-700">
              At Boake, we’re driven by innovation, creativity, and a passion
              for delivering meaningful digital experiences. Whether it's
              through cutting-edge design, seamless technology, or engaging
              content, we bring ideas to life that make an impact.
            </p>
            <p className="mt-4 text-gray-700">
              We specialize in transforming challenges into opportunities. With
              a team of forward-thinkers and problem-solvers, Boake crafts
              solutions that not only meet today’s demands but also scale for
              the future.
            </p>
            <p className="mt-4 text-gray-700">
              From concept to completion, we’re committed to excellence,
              collaboration, and continuous improvement — helping brands grow,
              connect, and thrive in a constantly evolving digital world.
            </p>
          </div>
        </div>

        {/* Section 2: Testimonials */}
        <div className="bg-gradient-to-b from-gray-50 to-indigo-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl  text-gray-800">What Clients Say</h2>
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
          <span className="tracking-widest">
            Trending book collection release
          </span>
        </div>
      </div>
    </section>
  );
};

export default About;
