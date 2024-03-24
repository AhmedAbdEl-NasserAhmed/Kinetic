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
  superSetName?: string;
  superSet?: {
    superSetName: string;
  };
  dropSetsNumber?: number;
  textArea?: string;
  restTime?: string;
}

export interface WorkoutObject {
  id: string;
  userId: string;
  sets: ISetObject[];
  workoutName: string;
  tragetedMuscle: string;
  workoutTime: string;
  workoutCategory: string;
  workoutType: string;
  superSetName?: string;
  superSets?: ISetObject[];
  dropSets?: ISetObject[];
}

export interface CustomDayProgram {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface CustomProgram {
  id: string;
  name: string;
  days: CustomDayProgram[];
  isCustom: true;
}

export interface UpdateBasicWorkoutDefaultValues {
  workoutName?: string;
  targetedMuscle?: string;
  setsNumber?: number;
}
