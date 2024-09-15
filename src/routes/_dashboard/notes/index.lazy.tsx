import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createLazyFileRoute('/_dashboard/notes/')({
  component: Index
})

type Props = {
  rowsData: any
}

function Index({ rowsData }: Props) {
  const {
    isPending,
    error,
    data: notes
  } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetch('http://localhost:3000/notes').then(res => res.json())
  })

  if (isPending) return <div>Loading...</div>

  return (
    <>
      {notes.map(note => (
        <span>{note.title}</span>
      ))}
    </>
  )
}
