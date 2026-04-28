export type InfoCardVariant = "problem" | "solution"

export interface InfoCardItem {
  id: string
  text: string
}

export interface InfoCardProps {
  title: string
  items: InfoCardItem[]
  variant: InfoCardVariant
}