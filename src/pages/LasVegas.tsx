
import { NavBar } from "@/components/layout/NavBar";
import { QuickSortVisualizer } from "@/components/visualizers/QuickSortVisualizer";
import { Separator } from "@/components/ui/separator";
import { Zap, BookOpen, Code } from "lucide-react";

const LasVegas = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Zap className="h-6 w-6 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold">Las Vegas Algorithm: Randomized Quicksort</h1>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-red-500" />
                  <h2 className="text-lg font-medium">What is a Las Vegas Algorithm?</h2>
                </div>
                <p className="text-gray-700">
                  Las Vegas algorithms always produce the correct result, but their running time is a random variable.
                  Unlike deterministic algorithms, Las Vegas algorithms use randomness to improve performance,
                  while still guaranteeing the correct output.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="h-5 w-5 text-red-500" />
                  <h2 className="text-lg font-medium">How Randomized Quicksort Works</h2>
                </div>
                <p className="text-gray-700">
                  Randomized Quicksort is a variation of the classic Quicksort algorithm that randomly selects
                  the pivot element instead of always choosing the first, last, or middle element. This randomization
                  helps avoid the worst-case scenario and provides better average-case performance.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold mb-4">Interactive Visualization</h2>
            <p className="text-gray-700 mb-6">
              Try the interactive randomized quicksort visualization below. Input your own array of numbers,
              or generate a random one. Watch how the algorithm randomly selects pivot elements and partitions
              the array. The colored bars represent the status of each element during sorting.
            </p>

            <QuickSortVisualizer />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Random Pivot Selection</h3>
                <p className="text-gray-700">
                  By randomly selecting the pivot element, the algorithm avoids consistently hitting the worst-case
                  scenario that can occur with deterministic pivot selection. This randomization makes the algorithm
                  resistant to adversarial inputs that might be designed to trigger poor performance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Partitioning</h3>
                <p className="text-gray-700">
                  The algorithm partitions the array into two segments: elements less than the pivot and elements
                  greater than the pivot. The pivot is then placed in its final sorted position. This divide-and-conquer
                  approach is applied recursively to the sub-arrays.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Performance Characteristics</h3>
                <p className="text-gray-700">
                  Randomized Quicksort has an expected time complexity of O(n log n), which is optimal for
                  comparison-based sorting algorithms. While the worst-case is still O(n²), the probability
                  of hitting this worst case becomes very small due to randomization, making it a practical
                  choice for many applications.
                </p>
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

export default LasVegas;
