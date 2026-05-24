export function formatGold(n) {
  if (n < 1000) return n.toString()
  if (n >= 1_000_000_000_000_000) return '999T+'

  const units = [
    { value: 1_000_000_000_000, suffix: 'T' },
    { value: 1_000_000_000, suffix: 'B' },
    { value: 1_000_000, suffix: 'M' },
    { value: 1_000, suffix: 'K' },
  ]

  for (const { value, suffix } of units) {
    if (n >= value) {
      const divided = n / value
      const formatted = divided < 10
        ? divided.toFixed(1).replace(/\.0$/, '')
        : Math.floor(divided).toString()
      return `${formatted}${suffix}`
    }
  }
  return n.toString()
}
