
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { randomizedQuicksort, type SortItem, type SortStep } from "@/utils/algorithms";
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from "lucide-react";

const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90];

export function QuickSortVisualizer() {
  const [inputArray, setInputArray] = useState(DEFAULT_ARRAY.join(", "));
  const [inputError, setInputError] = useState("");
  const [sortSteps, setSortSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]); // 1-100 range
  const timerRef = useRef<number | null>(null);

  const currentStep = sortSteps[currentStepIndex];

  const parseAndValidateInput = (input: string): number[] | null => {
    try {
      const parsed = input
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "")
        .map(item => {
          const num = Number(item);
          if (isNaN(num)) throw new Error(`"${item}" is not a valid number`);
          return num;
        });
      
      if (parsed.length < 2) {
        throw new Error("Please provide at least 2 numbers");
      }
      
      if (parsed.length > 20) {
        throw new Error("Please provide at most 20 numbers for better visualization");
      }
      
      return parsed;
    } catch (error) {
      setInputError((error as Error).message);
      return null;
    }
  };

  const generateNewArray = () => {
    const size = Math.floor(Math.random() * 10) + 5; // 5-15 elements
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    setInputArray(newArray.join(", "));
    resetAndStartSort(newArray);
  };

  const resetAndStartSort = (array?: number[]) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsPlaying(false);
    
    const numbersToSort = array || parseAndValidateInput(inputArray);
    if (!numbersToSort) return;
    
    setInputError("");
    const steps = randomizedQuicksort(numbersToSort);
    setSortSteps(steps);
    setCurrentStepIndex(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToNextStep = () => {
    if (currentStepIndex < sortSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    resetAndStartSort(DEFAULT_ARRAY);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (isPlaying && currentStepIndex < sortSteps.length - 1) {
      // Convert speed (1-100) to timer interval (1000ms - 100ms)
      const interval = 1100 - speed[0] * 10;
      timerRef.current = window.setInterval(goToNextStep, interval);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, currentStepIndex, sortSteps.length, speed]);

  const getBarColor = (item: SortItem) => {
    switch (item.status) {
      case 'pivot': return 'bg-[hsl(var(--algo-pivot))]';
      case 'sorted': return 'bg-[hsl(var(--algo-sorted))]';
      case 'processing': return 'bg-[hsl(var(--algo-processing))]';
      case 'unsorted':
      default: return 'bg-[hsl(var(--algo-unsorted))]';
    }
  };

  const maxValue = currentStep?.array.reduce((max, item) => Math.max(max, item.value), 0) || 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="mb-6">
        <label htmlFor="array-input" className="block text-sm font-medium text-gray-700 mb-1">
          Input Array (comma-separated numbers)
        </label>
        <div className="flex gap-2">
          <Input
            id="array-input"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
            placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
            className={inputError ? "border-red-500" : ""}
          />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={generateNewArray}
            title="Generate Random Array"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
        <Button onClick={() => resetAndStartSort()} className="mt-2">
          Sort
        </Button>
      </div>

      <div className="mb-6">
        <div className="h-64 relative flex items-end justify-center gap-1 p-4 border border-gray-200 rounded-lg bg-gray-50">
          {currentStep?.array.map((item, index) => (
            <div
              key={index}
              className={`${getBarColor(item)} relative transition-all duration-300 rounded-t-md`}
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                width: `${100 / Math.max(currentStep.array.length * 1.5, 1)}%`,
                minWidth: '10px',
                maxWidth: '50px'
              }}
            >
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs font-medium pt-1">
                {item.value}
              </span>
              {currentStep.pivot === index && (
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-[hsl(var(--algo-pivot))]">
                  Pivot
                </span>
              )}
              {currentStep.left === index && (
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-[hsl(var(--algo-unsorted))]">
                  Left
                </span>
              )}
              {currentStep.right === index && (
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-[hsl(var(--algo-processing))]">
                  Right
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700">{currentStep?.description || "No steps generated yet"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Step {currentStepIndex + 1} of {sortSteps.length}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousStep}
              disabled={currentStepIndex === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant={isPlaying ? "secondary" : "default"} 
              onClick={handlePlayPause}
              disabled={currentStepIndex === sortSteps.length - 1}
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextStep}
              disabled={currentStepIndex === sortSteps.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Speed:</span>
          <Slider
            value={speed}
            min={1}
            max={100}
            step={1}
            onValueChange={setSpeed}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
