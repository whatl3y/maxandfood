export function arrayGroupBy(ary: any[], mapper: Function): StringMap {
  return ary.reduce((agg: StringMap, item: any) => {
    const aggKey: string = mapper(item).toString()
    agg[aggKey] = (agg[aggKey] || []).concat([item])
    return agg
  }, {})
}
