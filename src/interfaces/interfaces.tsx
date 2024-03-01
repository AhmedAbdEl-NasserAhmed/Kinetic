export interface ISetObject {
  id: string;
  setsWeight: string;
  setsReps: string;
  isCompleted: boolean;
  weightUnit: string;
}

export interface DefaultValues {
  workoutName?: string;
  setsNumber?: number;
  targetedMuscle?: string;
  setsDetailReps?: string;
  setsDetailWeight?: string;
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
