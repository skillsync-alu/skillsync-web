import { createFileRoute } from '@tanstack/react-router'
import MyMatches from '../pages/MyMatches'

export const Route = createFileRoute('/matches')({
  component: () => <MyMatches /> ,
})