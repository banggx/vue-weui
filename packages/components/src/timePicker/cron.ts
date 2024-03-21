const regex = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;
const constraints = [
  [0, 23],
  [0, 59],
  [0, 59]
];

function parseField(field: string, constraints: number[]) {
  const [low, high] = constraints;
  const result: number[] = [];
  let pointer: number;

  // * 号等于最低到最高
  field = field.replace(/\*/g, low + '-' + high);

  // 处理 1,2,5-9 这种情况
  const fields = field.split(',');
  for (let i = 0, len = fields.length; i < len; i++) {
    const f = fields[i];
    if (f.match(regex)) {
      f.replace(regex, ((
        _: any,
        lower: number,
        upper: number,
        step: string | number
      ) => {
        // ref to `cron-parser`
        step = parseInt(step as string) || 1;
        // Positive integer higher than constraints[0]
        lower = Math.min(Math.max(low, ~~Math.abs(lower)), high);

        // Positive integer lower than constraints[1]
        upper = upper ? Math.min(high, ~~Math.abs(upper)) : lower;

        // Count from the lower barrier to the upper
        pointer = lower;

        do {
          result.push(pointer);
          pointer += step;
        } while (pointer <= upper);
      }) as any);
    }
  }
  return result;
}

export function parseCron(expr: string) {
  const atoms = expr.replace(/^\s\s*|\s\s*$/g, '').split(/\s+/);
  const fields: number[][] = [];
  atoms.forEach((atom, index) => {
    const constraint = constraints[index];
    fields.push(parseField(atom, constraint));
  });
  return fields;
}
