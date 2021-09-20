export const formatTimestamp = (timestamp?: string) => {
  if (!timestamp) {
    return '00:00'
  }
  return timestamp.substring(11, 16)
}
