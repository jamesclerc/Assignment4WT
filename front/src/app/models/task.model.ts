//Task model used to get the subscribe 
export class Task {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  priority: string;
  completed: boolean;
  completeBefore: Date;
}
