type workdays = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface Schedule {
  id:             number;
  schedulesHours: string[];
  workdays:       workdays[];
}
