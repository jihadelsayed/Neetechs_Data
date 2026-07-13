export interface MonthOption {
  name: string;
}

export const Manader: MonthOption[] = [
  { name: 'Jan' },
  { name: 'Feb' },
  { name: 'Mar' },
  { name: 'Apr' },
  { name: 'Maj' },
  { name: 'Jun' },
  { name: 'Jul' },
  { name: 'Aug' },
  { name: 'Sep' },
  { name: 'Okt' },
  { name: 'Nov' },
  { name: 'Dec' },
];

export const Years: number[] = [];

for (let year = 1950; year < 2099; year += 1) {
  Years.push(year);
}
