import { FaCode, FaRobot, FaLaptopCode, FaUsers, FaGraduationCap, FaLightbulb, FaBullseye } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="mb-6">About UIT Coder Club</h1>
            <p className="text-xl text-gray-600">
              Empowering the next generation of developers
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section relative bg-[#f8faf8] py-20">
        <div className="absolute inset-0 bg-[url('/zigzag-pattern.svg')] opacity-10"></div>
        <div className="container relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <div className="w-24 h-1 bg-[#387d8a] mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                A dynamic community of UIT students innovating in AI and Web Development, shaping Myanmar's tech future.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-8 text-xl text-[#387d8a] flex items-center justify-center">
                  <FaUsers className="mr-3 text-2xl" />
                  Our Community
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-[#f8faf8] rounded-lg hover:bg-[#387d8a] hover:text-white transition-colors group">
                    <FaCode className="text-[#387d8a] text-4xl mx-auto mb-4 group-hover:text-white" />
                    <h4 className="font-medium mb-3 text-lg group-hover:text-white">Hackathon Champions</h4>
                    <p className="text-base text-gray-600 group-hover:text-white">Winners of national and international competitions</p>
                  </div>
                  <div className="text-center p-6 bg-[#f8faf8] rounded-lg hover:bg-[#387d8a] hover:text-white transition-colors group">
                    <FaRobot className="text-[#387d8a] text-4xl mx-auto mb-4 group-hover:text-white" />
                    <h4 className="font-medium mb-3 text-lg group-hover:text-white">AI/ML Engineers</h4>
                    <p className="text-base text-gray-600 group-hover:text-white">Building solutions in Computer Vision and NLP</p>
                  </div>
                  <div className="text-center p-6 bg-[#f8faf8] rounded-lg hover:bg-[#387d8a] hover:text-white transition-colors group">
                    <FaLaptopCode className="text-[#387d8a] text-4xl mx-auto mb-4 group-hover:text-white" />
                    <h4 className="font-medium mb-3 text-lg group-hover:text-white">Software Engineers</h4>
                    <p className="text-base text-gray-600 group-hover:text-white">Creating scalable web and software systems</p>
                  </div>
                  <div className="text-center p-6 bg-[#f8faf8] rounded-lg hover:bg-[#387d8a] hover:text-white transition-colors group">
                    <FaUsers className="text-[#387d8a] text-4xl mx-auto mb-4 group-hover:text-white" />
                    <h4 className="font-medium mb-3 text-lg group-hover:text-white">Tech Mentors</h4>
                    <p className="text-base text-gray-600 group-hover:text-white">Leading workshops and knowledge sharing</p>
                  </div>
                  <div className="text-center p-6 bg-[#f8faf8] rounded-lg hover:bg-[#387d8a] hover:text-white transition-colors group">
                    <FaGraduationCap className="text-[#387d8a] text-4xl mx-auto mb-4 group-hover:text-white" />
                    <h4 className="font-medium mb-3 text-lg group-hover:text-white">Junior Developers</h4>
                    <p className="text-base text-gray-600 group-hover:text-white">Fresh talent with innovative ideas</p>
                  </div>
                  <div className="text-center p-6 bg-[#f8faf8] rounded-lg hover:bg-[#387d8a] hover:text-white transition-colors group">
                    <FaLightbulb className="text-[#387d8a] text-4xl mx-auto mb-4 group-hover:text-white" />
                    <h4 className="font-medium mb-3 text-lg group-hover:text-white">Innovators</h4>
                    <p className="text-base text-gray-600 group-hover:text-white">Pushing boundaries with creative solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="section bg-gradient-to-br from-[#f8faf8] to-[#e8f0f0] py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Vision & Mission</h2>
              <div className="w-24 h-1 bg-[#387d8a] mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Shaping the future of technology in Myanmar through innovation and collaboration
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#387d8a]/5 to-[#387d8a]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 rounded-xl bg-[#387d8a]/10 flex items-center justify-center mr-6">
                      <FaLightbulb className="text-[#387d8a] text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#387d8a]">Our Vision</h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    To create a supportive community where members can grow their skills, share knowledge, and unlock career opportunities through collaborative learning and real-world projects.
                  </p>
                  <div className="border-l-4 border-[#387d8a] pl-6 py-2">
                    <p className="text-xl font-semibold text-[#387d8a] italic">
                      "Grow Together, Succeed Together"
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#387d8a]/5 to-[#387d8a]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 rounded-xl bg-[#387d8a]/10 flex items-center justify-center mr-6">
                      <FaBullseye className="text-[#387d8a] text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#387d8a]">Our Mission</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-lg bg-[#387d8a]/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <FaCode className="text-[#387d8a] text-xl" />
                      </div>
                      <p className="text-lg text-gray-700">Empower through hands-on AI and web projects</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-lg bg-[#387d8a]/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <FaUsers className="text-[#387d8a] text-xl" />
                      </div>
                      <p className="text-lg text-gray-700">Build a strong tech community through mentorship</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-lg bg-[#387d8a]/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <FaRobot className="text-[#387d8a] text-xl" />
                      </div>
                      <p className="text-lg text-gray-700">Drive innovation with real-world solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section relative bg-gradient-to-br from-[#f8faf8] to-[#e8f0f0] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/zigzag-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#387d8a]/5 to-transparent"></div>
        <div className="container relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#387d8a] to-[#2c5f6a] bg-clip-text text-transparent">Our History</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#387d8a] to-[#2c5f6a] mx-auto mb-8"></div>
              <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                A journey of growth, innovation, and community building
              </p>
            </div>
            <div className="space-y-20">
              <div className="relative pl-8 border-l-2 border-[#387d8a] group">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#387d8a] to-[#2c5f6a] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#387d8a]/10 to-[#2c5f6a]/10 flex items-center justify-center mr-6 transform group-hover:scale-110 transition-transform duration-300">
                      <FaUsers className="text-[#387d8a] text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#387d8a] to-[#2c5f6a] bg-clip-text text-transparent">2023 – IT Pout Sa Roots</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    The early team posted coding resources, design ideas, AI experiments, and community challenges under the IT Pout Sa initiative. Founding members included Shin Thant Phyo, Htet Paing Linn, and Pyae Linn.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">Community Building</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">Resource Sharing</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">AI Experiments</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-[#387d8a] group">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#387d8a] to-[#2c5f6a] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#387d8a]/10 to-[#2c5f6a]/10 flex items-center justify-center mr-6 transform group-hover:scale-110 transition-transform duration-300">
                      <FaCode className="text-[#387d8a] text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#387d8a] to-[#2c5f6a] bg-clip-text text-transparent">2024 – Evolution into a Technical Club</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    We started participating in events and hackathons. Our members won several prizes and built platforms for AI fruit freshness detection and smart logistics systems.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">Hackathons</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">Healthcare Solutions</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">Smart Logistics</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">Travel Tech</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-[#387d8a] group">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#387d8a] to-[#2c5f6a] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#387d8a]/10 to-[#2c5f6a]/10 flex items-center justify-center mr-6 transform group-hover:scale-110 transition-transform duration-300">
                      <FaGraduationCap className="text-[#387d8a] text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#387d8a] to-[#2c5f6a] bg-clip-text text-transparent">2025 – Official Club Formation</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    With growing interest and achievements, we formed a dedicated club with two main pillars: AI and Web Development. We established a formal structure, launched our own website, and began organizing knowledge-sharing events, beginner workshops, and project showcases.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">AI Department</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">Web Development</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">Workshops</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-[#387d8a]/10 to-[#2c5f6a]/10 text-[#387d8a] rounded-full text-sm font-medium hover:from-[#387d8a]/20 hover:to-[#2c5f6a]/20 transition-all duration-300">Knowledge Sharing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-white py-20">
        <div className="container max-w-7xl mx-auto">
          <div className="w-screen bg-[#387d8a] py-16 mb-16 -mx-[calc(50vw-50%)]">
            <div className="text-center">
              <h2 className="text-xl text-white mb-2">Introducing the</h2>
              <p className="text-4xl font-bold text-white">1st Management Committee</p>
            </div>
          </div>

          {/* Core Leadership */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-12 text-center">Presidency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* President */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/president.jpg" 
                      alt="Shin Thant Phyo - President" 
                      className="h-65 w-65 self-center rounded-md object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Shin Thant Phyo</h3>
                  <p className="text-primary text-center mb-1 text-base">President</p>
                  <p className="text-gray-600 text-center text-sm">Chief of AI/ML & Knowledge Sharing</p>
                  <p className="text-gray-600 text-center text-sm">Leads AI strategy and technical direction</p>
                </div>
              </div>

              {/* Vice President */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/vp.png" 
                      alt="Htet Paing Linn - Vice President" 
                      className="h-65 w-65 self-center rounded-md object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Htet Paing Linn</h3>
                  <p className="text-primary text-center mb-1 text-base">Vice President</p>
                  <p className="text-gray-600 text-center text-sm">Leads club vision, events, and external collaborations</p>
                  <p className="text-gray-600 text-center text-sm">Drove the development of the club's website from scratch</p>

                </div>
              </div>
            </div>
          </div>

          {/* AI Department */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-4 text-center">AI Department</h3>
            <p className="text-xl text-gray-600 text-center mb-12">Focuses on AI/ML Projects, Hackathons, Knowledge Sharing, Workshops</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* AI General Secretary */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/pyaelinn.png" 
                      alt="Pyae Linn - General Secretary (AI)" 
                      className="h-65 w-65 self-center rounded-md object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Pyae Linn</h3>
                  <p className="text-primary text-center mb-1 text-base">General Secretary <br/> (AI)</p>
                  <p className="text-gray-600 text-center text-sm">Coordinates AI sessions & internal communication</p>
                  <p className="text-gray-600 text-center text-sm">Knowledge Sharing</p>
                </div>
              </div>

              {/* AI Deputy 1 */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-65 w-65 self-center rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-3xl font-bold">
                      ZLH
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Zaw Linn Htet</h3>
                  <p className="text-primary text-center mb-1 text-base">Deputy General Secretary <br/> (AI)</p>
                  <p className="text-gray-600 text-center text-sm">Project Coordinator</p>
                  <p className="text-gray-600 text-center text-sm">Data Science Lead and AI Research</p>
                </div>
              </div>

              {/* AI Deputy 2 */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-65 w-65 self-center rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-3xl font-bold">
                      HTN
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Htoo Thant Naung</h3>
                  <p className="text-primary text-center mb-1 text-base">Deputy General Secretary <br/> (AI)</p>
                  <p className="text-gray-600 text-center text-sm">AI Research Lead</p>
                  <p className="text-gray-600 text-center text-sm">Workshop Facilitator & Rebotic Coordinator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Web Development Department */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-4 text-center">Web Development Department</h3>
            <p className="text-xl text-gray-600 text-center mb-12">Focuses on frontend/backend dev, club website, software solutions, UI/UX design</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Web General Secretary */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/htetmyetzaw.jpg" 
                      alt="Htet Myet Zaw - General Secretary (Web)" 
                      className="h-65 w-65 self-center rounded-md object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Htet Myet Zaw</h3>
                  <p className="text-primary text-center mb-1 text-base">General Secretary <br/> (Web)</p>
                  <p className="text-gray-600 text-center text-sm">Full-Stack Development Lead</p>
                  <p className="text-gray-600 text-center text-sm">Led the club's website development from scretch to deployment.</p>
                </div>
              </div>

              {/* Web Deputy */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/aungkaungmyat.jpg" 
                      alt="Aung Kaung Myat - Deputy General Secretary (Web)" 
                      className="h-65 w-65 self-center rounded-md object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Aung Kaung Myat</h3>
                  <p className="text-primary text-center mb-1 text-base">Deputy General Secretary (Web)</p>
                  <p className="text-gray-600 text-center text-sm">Frontend/UI Lead, Builder of the club's website</p>
                  <p className="text-gray-600 text-center text-sm">Supports full-stack development and project deployment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Committees */}
          <div>
            <h3 className="text-3xl font-bold mb-12 text-center">Supporting Committees</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Marketing Director */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-65 w-65 self-center rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-3xl font-bold">
                      YTH
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Ye Thiha</h3>
                  <p className="text-primary text-center mb-1 text-base">Director of Marketing & Outreach</p>
                  <p className="text-gray-600 text-center text-sm">Manages social media</p>
                  <p className="text-gray-600 text-center text-sm">Promotional content and outreach</p>
                </div>
              </div>

              {/* Student Engagement Director */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-65 w-65 self-center rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-3xl font-bold">
                      TP
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Thant Pyae</h3>
                  <p className="text-primary text-center mb-1 text-base">Director of Marketing & Outreach</p>
                  <p className="text-gray-600 text-center text-sm">Manages social media</p>
                  <p className="text-gray-600 text-center text-sm">Promotional content and outreach</p>
                </div>
              </div>

              {/* Freshman Orientation Director */}
              <div className="w-[280px] overflow-hidden rounded-2xl border-2 border-[#333333] drop-shadow-[8px_8px_0px_#387d8a] mx-auto">
                <div className="flex flex-row p-2 bg-gray-100 border-b-2 border-[#333333]">
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ff605c]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#ffbd44]"></div>
                  <div className="rounded-full w-3 h-3 mx-1 bg-[#00ca4e]"></div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-65 w-65 self-center rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-3xl font-bold">
                      TYN
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">Thuriya Ye Naing</h3>
                  <p className="text-primary text-center mb-1 text-base">Director of Freshman Orientation</p>
                  <p className="text-gray-600 text-center text-sm">Organizes beginner-friendly sessions</p>
                  <p className="text-gray-600 text-center text-sm">Onboarding projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="section bg-gray-50 my-14">
        <div className="container text-center">
          <h2 className="mt-10 mb-6">Join Our Community</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a beginner or an experienced developer, there's a place for you
            in our community. Join us to learn, grow, and make lasting connections.
          </p>
          <button className="btn btn-primary mb-10">
            Become a Member
          </button>
        </div>
      </section>
    </div>
  );
} 