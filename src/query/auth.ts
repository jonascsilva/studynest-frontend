import { AuthResponse, SignInCredentials, SignUpCredentials } from '$/types'

import { fetcher } from '$/query/fetcher'

async function signin(data: SignInCredentials) {
  const user = await fetcher<AuthResponse>(`auth/signin`, 'POST', data)

  return user
}

async function signup(data: SignUpCredentials) {
  const user = await fetcher<AuthResponse>(`auth/signup`, 'POST', data)

  return user
}

export { signin, signup }
