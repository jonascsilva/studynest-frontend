const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
}

function getFormattedDate(dateString: string, showNow?: boolean) {
  const date = new Date(dateString)

  if (showNow && date < new Date()) {
    return 'Agora'
  }

  return date.toLocaleString('pt-BR', dateOptions)
}

export { getFormattedDate }
