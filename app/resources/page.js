export default function Resources() {
    const learningResources = [
      {
        category: 'Web Development',
        resources: [
          {
            title: 'Next.js Documentation',
            description: 'Official documentation for Next.js framework',
            link: 'https://nextjs.org/docs',
            level: 'Beginner to Advanced'
          },
          {
            title: 'React Documentation',
            description: 'Learn React from the official documentation',
            link: 'https://react.dev',
            level: 'Beginner to Advanced'
          },
          {
            title: 'Tailwind CSS',
            description: 'Utility-first CSS framework documentation',
            link: 'https://tailwindcss.com/docs',
            level: 'Beginner to Advanced'
          }
        ]
      },
      {
        category: 'Programming Languages',
        resources: [
          {
            title: 'Python for Beginners',
            description: 'Comprehensive Python tutorial for beginners',
            link: 'https://www.python.org/about/gettingstarted/',
            level: 'Beginner'
          },
          {
            title: 'JavaScript.info',
            description: 'Modern JavaScript tutorial',
            link: 'https://javascript.info',
            level: 'Beginner to Advanced'
          }
        ]
      },
      {
        category: 'Data Structures & Algorithms',
        resources: [
          {
            title: 'LeetCode',
            description: 'Practice coding problems and prepare for interviews',
            link: 'https://leetcode.com',
            level: 'Intermediate to Advanced'
          },
          {
            title: 'GeeksforGeeks',
            description: 'Computer science portal for geeks',
            link: 'https://www.geeksforgeeks.org',
            level: 'All Levels'
          }
        ]
      }
    ];
  
    const tools = [
      {
        name: 'VS Code',
        description: 'Popular code editor with extensive extensions',
        link: 'https://code.visualstudio.com'
      },
      {
        name: 'Git',
        description: 'Version control system',
        link: 'https://git-scm.com'
      },
      {
        name: 'GitHub',
        description: 'Code hosting platform',
        link: 'https://github.com'
      }
    ];
  
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="mb-6">Resources</h1>
              <p className="text-xl text-gray-600">
                Learning materials and tools for developers
              </p>
            </div>
          </div>
        </section>
  
        {/* Learning Resources Section */}
        <section className="section bg-white mx-8">
          <div className="container">
            <h2 className="text-center mt-24 mb-16">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {learningResources.map((category) => (
                <div key={category.category} className="card">
                  <h3 className="mb-6">{category.category}</h3>
                  <div className="space-y-6">
                    {category.resources.map((resource) => (
                      <div key={resource.title} className="border-b border-gray-200 pb-4 last:border-0">
                        <h4 className="mb-2">{resource.title}</h4>
                        <p className="text-gray-600 mb-2">{resource.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-primary">{resource.level}</span>
                          <a 
                            href={resource.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark group inline-flex items-center"
                          >
                            Visit <span className="ml-1 text-primary transition-transform duration-200 group-hover:translate-x-2">→</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Tools Section */}
        <section className="section bg-gray-50 rounded-lg mx-8 my-20">
          <div className="container">
            <h2 className="text-center mt-20 mb-16">Essential Tools</h2>
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <div key={tool.name} className="card">
                  <h3 className="mb-4">{tool.name}</h3>
                  <p className="text-gray-600 mb-6">{tool.description}</p>
                  <a 
                    href={tool.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  } 