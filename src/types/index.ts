type FlashcardType = {
  id: string
  question: string
  subject: string
  answer: string
  userId: string
  createdAt: string
  updatedAt: string
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

type userCredentials = {
  email: string
  password: string
}

export type { FlashcardType, NoteType, userCredentials }
