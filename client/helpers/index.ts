export const pushOrFilter = (source, data) => {
  if (source.includes(data)) {
    source = source.filter((t) => t === data)
  } else {
    source.push(data)
  }
}