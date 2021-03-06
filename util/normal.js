export function normallArray (fn) {
  const wrapped = function (arg) {
    let temp = []
    arg.forEach((d) => {
      temp.push(fn(d))
    })
    return temp
  }
  return wrapped
}