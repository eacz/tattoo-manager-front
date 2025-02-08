export const workdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
export type workdaysType = typeof workdays[number]

export interface Schedule {
  id: number
  schedulesHours: string[]
  workdays: workdaysType[]
}
