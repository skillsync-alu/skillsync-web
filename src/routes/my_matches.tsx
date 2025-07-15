import { createFileRoute } from '@tanstack/react-router'
import MyMatches from '../pages/MyMatches'

export const Route = createFileRoute('/my_matches')({
  component: () => <MyMatches /> ,
})