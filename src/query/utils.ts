function serializeParams(params: { [key: string]: unknown }): string {
  const filteredParams: Record<string, string> = Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => [key, String(value)])
  )

  return new URLSearchParams(filteredParams).toString()
}

export { serializeParams }
