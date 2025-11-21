export const dddsBrasil = [
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22",
  "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41",
  "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54",
  "55", "61", "62", "64", "63", "65", "66", "67", "68", "69", "71",
  "73", "74", "75", "77", "79", "81", "87", "82", "83", "84", "85",
  "88", "86", "89", "91", "93", "94", "92", "97", "95", "96", "98",
  "99"
]

export const validateWhatsApp = (value: string): { valid: boolean, error: string | null } => {
  if (!value) return { valid: false, error: null }

  if (/[-().]/.test(value)) {
    return { valid: false, error: "Não use '-', '(', ')' ou '.' no número" }
  }

  const sanitized = value.replace(/\s+/g, '')

  if (sanitized.length < 3) {
    return { valid: false, error: 'Número muito curto' }
  }

  if (!/^\d+$/.test(sanitized)) {
    return { valid: false, error: 'Apenas dígitos e espaços são permitidos' }
  }

  const ddd = sanitized.slice(0, 2)
  if (!dddsBrasil.includes(ddd)) {
    return { valid: false, error: 'DDD inválido' }
  }

  if (sanitized[2] !== '9') {
    return { valid: false, error: "O terceiro dígito precisa ser '9'" }
  }

  return { valid: true, error: null }
}