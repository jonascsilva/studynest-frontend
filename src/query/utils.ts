function serializeParams(params: { [key: string]: unknown }): string {
  const stringParams: Record<string, string> = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  )

  return new URLSearchParams(stringParams).toString()
}

export { serializeParams }
