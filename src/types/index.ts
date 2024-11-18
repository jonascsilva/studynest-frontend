type FlashcardType = {
  id: string
  question: string
  subject: string
  answer: string
  userId: string
  createdAt: string
  updatedAt: string
}

type FlashcardWithRevisionType = FlashcardType & {
  nextReviewDate: string
  currentLevel: number
}

type NoteType = {
  id: string
  title: string
  subject: string
  content: string
  userId: string
  createdAt: string
  updatedAt: string
}

type ReviewResult = {
  result: number
}

type UserCredentials = {
  email: string
  password: string
}

type FlashcardsQueryOptions = {
  due?: boolean
  upcoming?: boolean
}

export type {
  FlashcardType,
  FlashcardWithRevisionType,
  NoteType,
  ReviewResult,
  UserCredentials,
  FlashcardsQueryOptions
}
