interface SeasonStructure {
  value: string;
  label: string;
  children?: SeasonStructure[];
}

export function useCalendar() {
  type Season = "4" | "1" | "2" | "3";
  type SeasonLabel = "冬季番组" | "春季番组" | "夏季番组" | "秋季番组";

  function generateSeasonsStructure(
    startYear: number,
    currentYear: number,
    currentMonth: number
  ): SeasonStructure[] {
    const seasons: Season[] = ["4", "1", "2", "3"];
    const seasonLabels: SeasonLabel[] = [
      "冬季番组",
      "春季番组",
      "夏季番组",
      "秋季番组",
    ];

    let currentSeasonIndex: number;

    if (currentMonth >= 1 && currentMonth <= 3) {
      currentSeasonIndex = 0; // 冬季
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      currentSeasonIndex = 1; // 春季
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      currentSeasonIndex = 2; // 夏季
    } else {
      currentSeasonIndex = 3; // 秋季
    }

    const calendarList: SeasonStructure[] = [];

    for (let year = startYear; year <= currentYear; year++) {
      const yearStructure: SeasonStructure = {
        value: year.toString(),
        label: year.toString(),
        children: [],
      };

      for (let i = 0; i < seasons.length; i++) {
        if (year === currentYear && i > currentSeasonIndex) {
          break;
        }

        const seasonStructure: SeasonStructure = {
          value: seasons[i],
          label: seasonLabels[i],
        };

        yearStructure.children?.push(seasonStructure);
      }

      calendarList.push(yearStructure);
    }

    return calendarList;
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // TypeScript 中，月份是从 0 开始计数的

  const calendarList = generateSeasonsStructure(
    2014,
    currentYear,
    currentMonth
  );

  return { calendarList };
}
