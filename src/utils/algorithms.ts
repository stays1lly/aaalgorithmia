
// Utility functions for algorithms

// Las Vegas Algorithm - Randomized Quicksort
export type SortItem = {
  value: number;
  status: 'unsorted' | 'pivot' | 'sorted' | 'processing';
};

export type SortStep = {
  array: SortItem[];
  pivot: number | null;
  left: number | null;
  right: number | null;
  description: string;
};

export function randomizedQuicksort(array: number[]): SortStep[] {
  // Initial array to SortItems
  const items: SortItem[] = array.map(value => ({
    value,
    status: 'unsorted'
  }));

  const steps: SortStep[] = [];
  steps.push({
    array: [...items],
    pivot: null,
    left: null,
    right: null,
    description: 'Initial array'
  });

  // Helper function to record steps during sorting
  function quicksortWithSteps(items: SortItem[], start: number, end: number): SortItem[] {
    if (start >= end) {
      if (start === end) {
        items[start].status = 'sorted';
        steps.push({
          array: [...items],
          pivot: null,
          left: null,
          right: null,
          description: `Element at index ${start} is sorted`
        });
      }
      return items;
    }

    // Randomly select pivot index
    const randomPivotIndex = Math.floor(Math.random() * (end - start + 1)) + start;
    
    // Swap pivot with first element
    [items[start], items[randomPivotIndex]] = [items[randomPivotIndex], items[start]];
    
    items[start].status = 'pivot';
    steps.push({
      array: [...items],
      pivot: start,
      left: null,
      right: null,
      description: `Randomly selected pivot ${items[start].value} (index ${start})`
    });
    
    const pivotValue = items[start].value;
    let i = start + 1;
    
    // Partition
    for (let j = start + 1; j <= end; j++) {
      items[j].status = 'processing';
      steps.push({
        array: [...items],
        pivot: start,
        left: i,
        right: j,
        description: `Comparing ${items[j].value} with pivot ${pivotValue}`
      });
      
      if (items[j].value < pivotValue) {
        [items[i], items[j]] = [items[j], items[i]];
        
        steps.push({
          array: [...items],
          pivot: start,
          left: i,
          right: j,
          description: `Swapped ${items[i].value} and ${items[j].value} because ${items[i].value} < ${pivotValue}`
        });
        
        i++;
      } else {
        steps.push({
          array: [...items],
          pivot: start,
          left: i,
          right: j,
          description: `No swap needed because ${items[j].value} >= ${pivotValue}`
        });
      }
      
      items[j].status = 'unsorted';
    }
    
    // Swap pivot to its correct position
    [items[start], items[i - 1]] = [items[i - 1], items[start]];
    items[i - 1].status = 'sorted';
    
    steps.push({
      array: [...items],
      pivot: i - 1,
      left: null,
      right: null,
      description: `Placed pivot ${pivotValue} in its correct position (index ${i - 1})`
    });
    
    // Recursively sort the two partitions
    quicksortWithSteps(items, start, i - 2);
    quicksortWithSteps(items, i, end);
    
    return items;
  }

  quicksortWithSteps([...items], 0, items.length - 1);
  
  // Mark all elements as sorted in the final step
  const finalArray = steps[steps.length - 1].array.map(item => ({
    ...item,
    status: 'sorted' as const
  }));
  
  steps.push({
    array: finalArray,
    pivot: null,
    left: null,
    right: null,
    description: 'Array is fully sorted'
  });
  
  return steps;
}

// Monte Carlo Simulation - Task completion probability
export type Task = {
  name: string;
  minDuration: number;
  maxDuration: number;
};

export type SimulationResult = {
  successCount: number;
  totalTrials: number;
  probability: number;
  durations: number[];
  threshold: number;
};

export function runMonteCarloSimulation(
  taskA: Task,
  taskB: Task,
  availableHours: number,
  numTrials: number = 1000
): SimulationResult {
  let successCount = 0;
  const durations: number[] = [];
  
  for (let i = 0; i < numTrials; i++) {
    // Generate random duration for Task A
    const durationA = taskA.minDuration + Math.random() * (taskA.maxDuration - taskA.minDuration);
    
    // Generate random duration for Task B
    const durationB = taskB.minDuration + Math.random() * (taskB.maxDuration - taskB.minDuration);
    
    // Total duration
    const totalDuration = durationA + durationB;
    durations.push(totalDuration);
    
    // Check if tasks can be completed in available time
    if (totalDuration <= availableHours) {
      successCount++;
    }
  }
  
  const probability = successCount / numTrials;
  
  return {
    successCount,
    totalTrials: numTrials,
    probability,
    durations,
    threshold: availableHours
  };
}
