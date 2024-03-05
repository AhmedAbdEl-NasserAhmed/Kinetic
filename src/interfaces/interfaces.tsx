export interface ISetObject {
  id: string;
  setsWeight: string;
  setsReps: string;
  isCompleted: boolean;
  weightUnit: string;
}

export interface SuperSetObject {
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
    setsSuperSetReps: string;
    setsSuperSetWeight: string;
    superSetName: string;
  };
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
  superSets?: SuperSetObject[];
}
