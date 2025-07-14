import { createFileRoute } from '@tanstack/react-router'
import SetSkills from '../pages/SetSkills'

export const Route = createFileRoute('/set_skills')({
  component: () => <SetSkills />,
})