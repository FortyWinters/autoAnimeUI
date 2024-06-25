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

    for (let year = currentYear; year >= startYear; year--) {
      const yearStructure: SeasonStructure = {
        value: year.toString(),
        label: year.toString() + "年",
        children: [],
      };

      const seasonsToAdd =
        year === currentYear
          ? [...seasons.slice(0, currentSeasonIndex + 1)].reverse()
          : [...seasons].reverse();
      const labelsToAdd =
        year === currentYear
          ? [...seasonLabels.slice(0, currentSeasonIndex + 1)].reverse()
          : [...seasonLabels].reverse();

      for (let i = 0; i < seasonsToAdd.length; i++) {
        const seasonStructure: SeasonStructure = {
          value: seasonsToAdd[i],
          label: labelsToAdd[i],
        };
        yearStructure.children?.push(seasonStructure);
      }

      calendarList.push(yearStructure);
    }

    return calendarList;
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 月份从0开始计数

  const calendarList = generateSeasonsStructure(
    2014,
    currentYear,
    currentMonth
  );

  return { calendarList };
}
