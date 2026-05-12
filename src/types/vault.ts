export interface VaultEntry {
  id: string
  key: string
  value: string
  aliases: string[]
  category: string
  sensitive: boolean
  createdAt: number
  updatedAt: number
}
