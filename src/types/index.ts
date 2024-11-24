type FlashcardType = {
  id: string
  question: string
  subject: string
  answer: string
  shared: boolean
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
  shared: boolean
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
  query?: string
  shared?: boolean
  due?: boolean
  upcoming?: boolean
}

type NotesQueryOptions = {
  query?: string
  shared?: boolean
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
  NotesQueryOptions,
  UserSettingsType
}
