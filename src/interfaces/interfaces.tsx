export interface ISetObject {
  id: string;
  setsWeight: number;
  setsReps: number;
  isCompleted: boolean;
  weightUnit: string;
}

export interface DefaultValues {
  workoutName?: string;
  setsNumber?: number;
  targetedMuscle?: string;
  setsDetailReps?: number;
  setsDetailWeight?: number;
}

export interface WorkoutObject {
  id: string;
  userId: string;
  sets: [];
  workoutName: string;
  tragetedMuscle: string;
  workoutTime: string;
  workoutCategory: string;
}
