
import { NavBar } from "@/components/layout/NavBar";
import { MonteCarloSimulator } from "@/components/visualizers/MonteCarloSimulator";
import { Separator } from "@/components/ui/separator";
import { BarChart, Clock, Calculator, Calendar } from "lucide-react";

const MonteCarlo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-secondary rounded-full">
                <BarChart className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h1 className="text-3xl font-bold">Monte Carlo Simulation: Event Probability</h1>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-medium">What is a Monte Carlo Simulation?</h2>
                </div>
                <p className="text-gray-700">
                  Monte Carlo simulations use repeated random sampling to obtain numerical results. The core idea 
                  is to use randomness to solve problems that might be deterministic in principle. They're 
                  especially useful for modeling phenomena with significant uncertainty in inputs.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-medium">Task Completion Probability</h2>
                </div>
                <p className="text-gray-700">
                  In this simulation, we're estimating the probability of completing two tasks in time for an event. 
                  Each task has a range of possible durations, and we run thousands of simulations with random 
                  durations to determine the likelihood of finishing both tasks before the event starts.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold mb-4">Interactive Simulation</h2>
            <p className="text-gray-700 mb-6">
              Try the interactive Monte Carlo simulator below. Set the minimum and maximum durations for two tasks, 
              specify the available hours before an event, and run the simulation to see the probability of completing 
              both tasks in time. The visualization shows the distribution of possible outcomes.
            </p>
            
            <MonteCarloSimulator />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Random Sampling</h3>
                <p className="text-gray-700">
                  The simulation generates random durations for each task within the specified ranges. This 
                  random sampling allows us to account for the uncertainty in how long each task might take, 
                  providing a more realistic model than simply using average durations.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Large Number of Trials</h3>
                <p className="text-gray-700">
                  By running a large number of trials (thousands in this case), the simulation leverages the 
                  Law of Large Numbers to provide increasingly accurate probability estimates. More trials lead 
                  to more precise estimates of the true probability distribution.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Practical Applications</h3>
                <p className="text-gray-700">
                  Monte Carlo simulations are used in a wide range of fields, including:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                  <li>Project management and scheduling</li>
                  <li>Financial risk assessment</li>
                  <li>Scientific research and modeling</li>
                  <li>Engineering reliability analysis</li>
                  <li>Game theory and decision making</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Real-world Example</h4>
                    <p className="text-sm text-blue-800">
                      Weather forecasting uses Monte Carlo simulations to predict the probability of 
                      different weather outcomes. By running many simulations with slightly different 
                      initial conditions, meteorologists can provide probability-based forecasts like 
                      "70% chance of rain" rather than a simple yes/no prediction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-secondary/30">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 AlgoWizard Learning Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default MonteCarlo;
