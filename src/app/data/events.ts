const now = new Date()

export const events = [
  {
    id: 14,
    title: 'Teban',
    start: new Date(new Date().setHours(new Date().getHours() - 4)),
    end: new Date(new Date().setHours(new Date().getHours() - 2)),
  },
  {
    id: 15,
    title: 'Gaia',
    start: new Date(new Date().setHours(new Date().getHours() + 2)),
    end: new Date(new Date().setHours(new Date().getHours() + 4)),
  },
  {
    id: 15,
    title: 'Pato',
    start: new Date(now.setHours(new Date().getHours())),
    end: new Date(now.setHours(new Date().getHours() + 1)),
  },
  {
    id: 8,
    title: 'Tuki',
    start: new Date(2025, 0, 1),
    end: new Date(2025, 0, 1),
  },
]
