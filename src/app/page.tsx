import Link from 'next/link';
import { FaBriefcase, FaUserCircle, FaSearch, FaLightbulb, FaThumbsUp, FaLock, FaChartLine, FaHandshake, FaGlobe, FaGraduationCap, FaChartBar, FaUserTie } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-black text-white">
      <nav className="w-full flex justify-between items-center mb-16 fixed top-0 left-0 right-0 bg-black z-50 p-4 shadow-md after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent">
        <div className="flex items-center mx-4">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300">Supergigs</Link>
        </div>
        <div className="mx-4 flex space-x-4">
          <a href="#features" className="text-white hover:text-blue-400 transition duration-300">Features</a>
          <a href="#market-insights" className="text-white hover:text-blue-400 transition duration-300">Market Insights</a>
          <a href="#contact" className="text-white hover:text-blue-400 transition duration-300">Contact</a>
        </div>
      </nav>

      <div className="mt-24 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4 p-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Supergigs is the best way to unlock <br /> your Freelancing potential.
          </h1>
          <p className="text-xl text-gray-300 mt-3 mb-8 bg-transparent">
            Empowering Indian freelancers with global opportunities.<br /> We're committed to showcasing India's talent to the world.
          </p>
          <div className="space-x-4">
            <Link href="/freelancer" className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 hover:text-black transition-all duration-500 ease-in-out transform hover:scale-105 border border-white hover:border-transparent">
              Sign up as freelancer →
            </Link>
            <Link href="/client/main" className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-400 hover:text-black transition-all duration-500 ease-in-out transform hover:scale-105 border border-white hover:border-transparent">
              Sign up as client →
            </Link>
          </div>
        </div>
      </div>

      <h2 id="features" className="text-4xl font-bold my-16 text-white">Supergigs Novelty</h2>

      <div className="w-full max-w-4xl flex flex-col items-center mb-16 relative">
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
        
        <FeatureItem
          title="Freelance Job Marketplace"
          description="Connect freelancers with exciting opportunities and help employers find top talent for their projects."
          icon={<FaBriefcase size={20} color="white" />}
          color="blue"
          align="right"
        />

        <FeatureItem
          title="AI-Powered Matching"
          description="Utilize advanced algorithms to match freelancers with the perfect projects based on skills and preferences."
          icon={<FaUserCircle size={20} color="white" />}
          color="purple"
          align="left"
        />

        <FeatureItem
          title="Secure Payments"
          description="Implement a robust escrow system to ensure safe and timely payments for completed work."
          icon={<FaLock size={20} color="white" />}
          color="pink"
          align="right"
        />

        <FeatureItem
          title="Advanced Search"
          description="Implement powerful search capabilities to help users find exactly what they're looking for quickly and efficiently."
          icon={<FaSearch size={20} color="white" />}
          color="green"
          align="left"
        />

        <FeatureItem
          title="Skill Verification"
          description="Develop a comprehensive skill verification system to ensure the quality and authenticity of freelancer profiles."
          icon={<FaThumbsUp size={20} color="white" />}
          color="yellow"
          align="right"
        />

        <FeatureItem
          title="AI-Powered Insights"
          description="Leverage AI to provide valuable insights and recommendations to both freelancers and clients, enhancing their experience and success rates."
          icon={<FaLightbulb size={20} color="white" />}
          color="red"
          align="left"
        />

        <FeatureItem
          title="Extensive Analytics"
          description="Provide detailed analytics and reports for both freelancers and clients to track performance and make data-driven decisions."
          icon={<FaChartLine size={20} color="white" />}
          color="indigo"
          align="right"
        />

        <FeatureItem
          title="Project Management Tools"
          description="Offer integrated project management tools to streamline collaboration between freelancers and clients."
          icon={<FaHandshake size={20} color="white" />}
          color="teal"
          align="left"
        />

        <FeatureItem
          title="Global Opportunities"
          description="Connect Indian freelancers with international clients, expanding their reach and earning potential."
          icon={<FaGlobe size={20} color="white" />}
          color="orange"
          align="right"
        />
      </div>

      <div id="market-insights" className="w-full max-w-4xl mb-16">
        <h2 className="text-4xl font-bold mb-8 text-white text-center">Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InsightCard
            title="Engineering Graduates"
            stat="1.5 million"
            description="Annual engineering graduates in India"
            icon={<FaGraduationCap size={40} color="white" />}
            color="blue"
          />
          <InsightCard
            title="Unemployment Rate"
            stat="15.8%"
            description="Among engineering graduates in India"
            icon={<FaChartBar size={40} color="white" />}
            color="red"
          />
          <InsightCard
            title="Freelancing Growth"
            stat="41%"
            description="Annual growth in Indian freelancing market"
            icon={<FaChartLine size={40} color="white" />}
            color="green"
          />
          <InsightCard
            title="Skill Gap"
            stat="60%"
            description="Of Indian companies report a skill gap"
            icon={<FaUserTie size={40} color="white" />}
            color="yellow"
          />
        </div>
      </div>

      <footer id="contact" className="mt-16 text-center text-gray-500 w-full">
        <p>© 2024 Supergigs. All rights reserved.</p>
        <div className="mt-4">
          <a href="#features" className="mx-2 hover:text-gray-400">Features</a>
          <a href="#market-insights" className="mx-2 hover:text-gray-400">Market Insights</a>
          <a href="/terms" className="mx-2 hover:text-gray-400">Terms of Service</a>
          <a href="/privacy" className="mx-2 hover:text-gray-400">Privacy Policy</a>
        </div>
        <p className="mt-4">Contact us: support@supergigs.com</p>
        <p className="mt-2">Follow us on 
          <a href="https://twitter.com/supergigs" className="ml-1 hover:text-blue-400">Twitter</a> | 
          <a href="https://linkedin.com/company/supergigs" className="ml-1 hover:text-blue-400">LinkedIn</a>
        </p>
      </footer>
    </main>
  );
}

const FeatureItem = ({ title, description, icon, color, align }) => (
  <div className={`w-full flex items-center mb-16 relative ${align === 'right' ? 'flex-row-reverse' : ''}`}>
    <div className={`w-1/2 ${align === 'right' ? 'pr-8 text-right' : 'pl-8'}`}>
      <h3 className={`text-2xl font-semibold mb-2 text-${color}-400`}>{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
    <div className={`w-12 h-12 bg-${color}-500 rounded-full border-4 border-black z-10 flex items-center justify-center`}>
      {icon}
    </div>
  </div>
);

const InsightCard = ({ title, stat, description, icon, color }) => (
  <div className={`bg-gray-900 p-6 rounded-lg shadow-lg border-l-4 border-${color}-500`}>
    <div className="flex items-center mb-4">
      <div className={`mr-4 p-3 bg-${color}-500 rounded-full`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className={`text-3xl font-bold mb-2 text-${color}-400`}>{stat}</p>
    <p className="text-gray-400">{description}</p>
  </div>
);