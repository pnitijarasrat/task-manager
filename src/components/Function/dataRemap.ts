export const dataRemap = (data: any) => {
  return Object.keys(data).map((key: string) => ({
    ...data[key], key: key
  }))
}