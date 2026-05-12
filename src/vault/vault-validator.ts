export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateKey(key: string): ValidationResult {
  const errors: string[] = []

  if (!key || key.trim().length === 0) {
    errors.push("Key is required")
  }

  return { valid: errors.length === 0, errors }
}

export function validateValue(value: string): ValidationResult {
  const errors: string[] = []

  if (value === undefined || value === null) {
    errors.push("Value is required")
  }

  return { valid: errors.length === 0, errors }
}
