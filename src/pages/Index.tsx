import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/layout/NavBar";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, BarChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-red-500 bg-clip-text animate-fade-in">
            LET'S LEARN
          </h1>


          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/las-vegas">
              <Button size="lg" className="w-full md:w-auto group bg-red-500 hover:bg-red-600">
                <Zap className="mr-2 h-5 w-5 text-primary-foreground transition-transform group-hover:-translate-y-1" />
                Las Vegas Algorithm
                <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </Link>

            <Link to="/monte-carlo">
              <Button size="lg" className="w-full md:w-auto group bg-red-500 hover:bg-red-600">
                <BarChart className="mr-2 h-5 w-5 text-white-foreground transition-transform group-hover:scale-110" />
                Monte Carlo Simulation
                <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="mb-4 p-3 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Las Vegas Algorithms</h3>
              <p className="text-gray-600">
                Las Vegas algorithms always produce the correct result, but their
                running time is a random variable. Learn about randomized quicksort
                and how it leverages randomness to achieve efficient sorting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="mb-4 p-3 bg-secondary rounded-full w-14 h-14 flex items-center justify-center mx-auto">
                <BarChart className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Monte Carlo Simulations</h3>
              <p className="text-gray-600">
                Monte Carlo simulations use repeated random sampling to obtain
                numerical results. Explore how this technique can estimate probabilities
                and solve problems with uncertain inputs.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 bg-secondary/30">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Made with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
