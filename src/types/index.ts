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

type SignInCredentials = {
  email: string
  password: string
}

type SignUpCredentials = {
  name: string
  email: string
  password: string
}

type FlashcardsQueryOptions = {
  due?: boolean
  upcoming?: boolean
}

type UserSettingsType = {
  id: string
  intervalsQuantity: number
  baseInterval: number
  intervalIncreaseRate: number
}

type AuthUser = {
  id: string
  email: string
  name?: string
}

type AuthResponse = {
  access_token: string
}

export type {
  AuthResponse,
  AuthUser,
  FlashcardType,
  FlashcardWithRevisionType,
  NoteType,
  ReviewResult,
  SignInCredentials,
  SignUpCredentials,
  FlashcardsQueryOptions,
  UserSettingsType
}
