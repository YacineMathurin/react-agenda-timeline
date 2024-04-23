/**
 * Test
 */
export function createAgendaFn(params) {
  let input = [
    {
      id: 1,
      start: "17:00",
      duration: 60,
    },
    {
      id: 2,
      start: "17:00",
      duration: 120,
    },
    {
      id: 3,
      start: "19:40",
      duration: 10,
    },
    {
      id: 4,
      start: "15:00",
      duration: 20,
    },
    {
      id: 5,
      start: "18:00",
      duration: 60,
    },
    {
      id: 6,
      start: "10:25",
      duration: 35,
    },
    {
      id: 7,
      start: "10:45",
      duration: 30,
    },
    {
      id: 8,
      start: "17:00",
      duration: 60,
    },
    {
      id: 9,
      start: "10:00",
      duration: 30,
    },
    {
      id: 10,
      start: "11:50",
      duration: 20,
    },
    {
      id: 11,
      start: "19:00",
      duration: 60,
    },
    {
      id: 12,
      start: "09:00",
      duration: 45,
    },
    {
      id: 13,
      start: "14:45",
      duration: 60,
    },
    {
      id: 14,
      start: "19:20",
      duration: 10,
    },
    {
      id: 15,
      start: "11:50",
      duration: 30,
    },
    {
      id: 16,
      start: "11:40",
      duration: 40,
    },
    {
      id: 17,
      start: "14:00",
      duration: 30,
    },
  ];

  const containerHeight = window.innerHeight;
  const echelle = containerHeight / 12;
  const fullwidth = window.innerWidth;

  let collapsingWithSmallerInterval = true;
  let collapsingWithBiggerInterval = false;
  let lastElementCollapsed = false;

  // We need first exec to have isCollapsingWithLowestInterval to be true cause we by default start from left to right
  let lowestMeetingEndTime = Number.MAX_SAFE_INTEGER;
  let longerMeetingEndTime = -1;
  let collapsingWithSmallerIntervalCount = 0;

  const dateString = "01 Jan 2024";

  const meetings = [...formatInput(input)];
  const sortedMeetings = meetings.toSorted((a, b) => a.start - b.start);
  const res = sortedMeetings.splice(0, 1);

  function formatInput(input) {
    const dateString = "01 Jan 2024";
    const dateToMilliseconds = (date) => {
      return Date.parse(`${dateString} ${date} GMT`);
    };

    input = input.map((el) => ({
      id: el.id,
      start: dateToMilliseconds(el.start),
      end: dateToMilliseconds(el.start) + el.duration * 60 * 1000,
      xOrigin: 0,
      yOrigin:
        ((dateToMilliseconds(el.start) - Date.parse(`01 Jan 2024 9:00 GMT`)) /
          (12 * 3600 * 1000)) *
        containerHeight,
      width: fullwidth,
      height: (el.duration * echelle) / 60,
    }));
    return input;
  }

  function dateToMilliseconds(date) {
    const startTime = Date.parse(`${dateString} ${date} GMT`);
  }

  function getLongerMeetingEndTime(index) {
    return Math.max(sortedMeetings[index]["end"], res[res.length - 1]["end"]);
  }

  function getLowestMeetingEndTime(index) {
    return Math.min(sortedMeetings[index]["end"], res[res.length - 1]["end"]);
  }

  function resetDefault() {
    lowestMeetingEndTime = Number.MAX_SAFE_INTEGER;
    longerMeetingEndTime = -1;
  }

  function isTimeBetween(index) {
    return sortedMeetings[index]["start"] > res[res.length - 1]["end"];
  }

  function isCollapsingWithLowestInterval(index) {
    return sortedMeetings[index]["start"] <= lowestMeetingEndTime;
  }

  function isCollapsingWithLongerInterval(index) {
    return sortedMeetings[index]["start"] <= longerMeetingEndTime;
  }

  function handleNotCollapsing(index) {
    console.log("handleNotCollapsing");

    resetDefault();
    collapsingWithSmallerIntervalCount = 0;

    res.push({
      id: sortedMeetings[index]["id"],
      start: sortedMeetings[index]["start"],
      end: sortedMeetings[index]["end"],
      xOrigin: 0,
      yOrigin: sortedMeetings[index]["yOrigin"],
      width: fullwidth,
      height: sortedMeetings[index]["height"],
    });
  }

  function handleCollapsingWithSmallerInterval(index) {
    collapsingWithSmallerIntervalCount += 1;
    console.log("handleCollapsingWithSmallerInterval");

    lastElementCollapsed = true;
    lowestMeetingEndTime = getLowestMeetingEndTime(index);
    longerMeetingEndTime = getLongerMeetingEndTime(index);

    res.push({
      id: sortedMeetings[index]["id"],
      start: sortedMeetings[index]["start"],
      end: sortedMeetings[index]["end"],
      xOrigin: 0,
      yOrigin: sortedMeetings[index]["yOrigin"],
      width: fullwidth,
      height: sortedMeetings[index]["height"],
    });

    let lastElementIndex = res.length - 1;
    let countBack = 0;
    for (
      let idx = lastElementIndex;
      idx >= lastElementIndex - collapsingWithSmallerIntervalCount;
      idx--
    ) {
      res[idx]["width"] = fullwidth / (collapsingWithSmallerIntervalCount + 1);
      res[idx]["xOrigin"] =
        ((collapsingWithSmallerIntervalCount - countBack) * fullwidth) /
        (collapsingWithSmallerIntervalCount + 1);
      countBack += 1;
    }
  }

  function handleCollapsingWithBiggerInterval(index) {
    console.log("handleCollapsingWithBiggerInterval");

    lastElementCollapsed = true;
    lowestMeetingEndTime = getLowestMeetingEndTime(index);
    longerMeetingEndTime = getLongerMeetingEndTime(index);

    res.push({
      id: sortedMeetings[index]["id"],
      start: sortedMeetings[index]["start"],
      end: sortedMeetings[index]["end"],
      xOrigin: 0,
      yOrigin: sortedMeetings[index]["yOrigin"],
      width:
        (fullwidth * collapsingWithSmallerIntervalCount) /
        (collapsingWithSmallerIntervalCount + 1),
      height: sortedMeetings[index]["height"],
    });
    collapsingWithSmallerIntervalCount = 0;
  }

  function checker(index) {
    if (isTimeBetween(index) && !isCollapsingWithLongerInterval(index)) {
      return "not_collapsing";
    }

    if (isCollapsingWithLowestInterval(index)) {
      return "collapsing_with_smaller_interval";
    }

    return "collapsing_with_bigger_interval";
  }

  // Could useMemo fn of window width
  for (let index = 0; index < sortedMeetings.length; index++) {
    // For each it, check the 3 possibilities
    switch (checker(index)) {
      case "not_collapsing":
        handleNotCollapsing(index);
        break;

      case "collapsing_with_bigger_interval":
        handleCollapsingWithBiggerInterval(index);
        break;

      case "collapsing_with_smaller_interval":
        handleCollapsingWithSmallerInterval(index);
        break;
    }
  }
  return res;
}
