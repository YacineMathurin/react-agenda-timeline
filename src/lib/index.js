import { last, size } from "lodash";

export function eventsTimelineFn() {
  const input = [
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
  const fullWindowWidth = window.innerWidth;
  // timeWindow is the interval in hours from 9AM to 9PM
  const timeWindow =
    (dateToMilliseconds("21:00") - dateToMilliseconds("9:00")) / (3600 * 1000);
  const scaler = containerHeight / timeWindow;

  // We need first exec to have isCollapsingWithShorterInterval to be true cause we by default start from left to right
  let shorterMeetingEndTime = Number.MAX_SAFE_INTEGER;
  let greaterMeetingEndTime = -1;
  // To use all the space availlable we should have the number of event that overlaped on a timeline
  let collapsingWithSmallerIntervalCount = 0;

  const validatedInput = input.filter(
    (item) => item.id && item.start && item.duration
  );
  const meetings = [...formatInput(validatedInput)];

  const sortedMeetings = meetings.toSorted((a, b) => a.start - b.start);
  // First output is the first element of the sorted array of meetings
  const output = sortedMeetings.splice(0, 1);

  function dateToMilliseconds(date) {
    /* dateString will be used to parse the date string and convert them to milliseconds
     so we could use math operation on them
     */
    const dateString = "01 Jan 2024";
    return Date.parse(`${dateString} ${date} GMT`);
  }
  function formatInput(input) {
    input = input.map((el) => ({
      id: el.id,
      start: dateToMilliseconds(el.start),
      end: dateToMilliseconds(el.start) + el.duration * 60 * 1000,
      xOrigin: 0,
      // 12h in milliseconds = 12 * 1h(3600s) * (1000ms)
      yOrigin:
        ((dateToMilliseconds(el.start) - Date.parse(`01 Jan 2024 9:00 GMT`)) /
          (timeWindow * 3600 * 1000)) *
        containerHeight,
      width: fullWindowWidth,
      height: (el.duration * scaler) / 60,
    }));
    return input;
  }

  function getLongerMeetingEndTime(index) {
    return Math.max(sortedMeetings[index]["end"], greaterMeetingEndTime);
  }

  function getShorterMeetingEndTime(index) {
    return Math.min(sortedMeetings[index]["end"], last(output).end);
  }

  function resetDefault() {
    shorterMeetingEndTime = Number.MAX_SAFE_INTEGER;
    greaterMeetingEndTime = -1;
    collapsingWithSmallerIntervalCount = 0;
  }

  function isTimeBetween(index) {
    return sortedMeetings[index]["start"] > last(output).end;
  }

  function isCollapsingWithShorterInterval(index) {
    return sortedMeetings[index]["start"] <= shorterMeetingEndTime;
  }

  function isCollapsingWithLongerInterval(index) {
    return sortedMeetings[index]["start"] <= greaterMeetingEndTime;
  }

  function getXOriginForCollapsingWithBiggerInterval(greaterMeetingEndTime) {
    const longerMeetingEndTime = output.filter(
      (item) => item.end === greaterMeetingEndTime
    );
    // If the longer meeting event is the first event of the timeline
    if (longerMeetingEndTime[0]?.xOrigin === 0) {
      // Upcoming event should align on the same xOrigin (i.e: 11 - 14 - 3)
      return last(output).xOrigin;
    }
    // Otherwise xOrigin
    return 0;
  }

  function handleNotCollapsing(index) {
    resetDefault();
    const { id, start, end, yOrigin, height } = sortedMeetings[index];

    output[size(output)] = {
      id,
      start,
      end,
      xOrigin: 0,
      yOrigin,
      width: fullWindowWidth,
      height,
    };
  }

  function handleCollapsingWithSmallerInterval(index) {
    collapsingWithSmallerIntervalCount += 1;
    shorterMeetingEndTime = getShorterMeetingEndTime(index);
    greaterMeetingEndTime = getLongerMeetingEndTime(index);
    const { id, start, end, yOrigin, height } = sortedMeetings[index];

    output[size(output)] = {
      id,
      start,
      end,
      xOrigin: 0,
      yOrigin,
      width: fullWindowWidth,
      height,
    };

    // Start from the last element inserted in the output and recompute width and xOrigin
    let lastElementIndex = size(output) - 1;
    let countBack = 0;
    for (
      let idx = lastElementIndex;
      idx >= lastElementIndex - collapsingWithSmallerIntervalCount;
      idx--
    ) {
      output[idx]["width"] =
        fullWindowWidth / (collapsingWithSmallerIntervalCount + 1);
      output[idx]["xOrigin"] =
        ((collapsingWithSmallerIntervalCount - countBack) * fullWindowWidth) /
        (collapsingWithSmallerIntervalCount + 1);
      countBack += 1;
    }
  }

  function handleCollapsingWithBiggerInterval(index) {
    greaterMeetingEndTime = getLongerMeetingEndTime(index);
    // Reset to default behavior of displaying event from left to right
    shorterMeetingEndTime = Number.MAX_SAFE_INTEGER;
    const { id, start, end, yOrigin, height } = sortedMeetings[index];

    output[size(output)] = {
      id,
      start,
      end,
      xOrigin: getXOriginForCollapsingWithBiggerInterval(greaterMeetingEndTime),
      yOrigin,
      // To use all the space availlable we should have the number of event that overlaped
      width:
        (fullWindowWidth * collapsingWithSmallerIntervalCount) /
        (collapsingWithSmallerIntervalCount + 1),
      height,
    };
    // Reset collapsingWithSmallerIntervalCount so to restart the count later
    collapsingWithSmallerIntervalCount = 0;
  }

  function collapsingChecker(index) {
    if (isTimeBetween(index) && !isCollapsingWithLongerInterval(index)) {
      return "not_collapsing";
    }

    if (isCollapsingWithShorterInterval(index)) {
      return "collapsing_with_smaller_interval";
    }

    return "collapsing_with_bigger_interval";
  }

  // Main
  for (let index = 0; index < sortedMeetings.length; index++) {
    /* For each iteration, check the 3 possibilities
     * not_collapsing | collapsing_with_smaller_interval | collapsing_with_bigger_interval
     */
    switch (collapsingChecker(index)) {
      // Using the whole window width
      case "not_collapsing":
        handleNotCollapsing(index);
        break;

      // On the timeline, overlaping with shorter event
      case "collapsing_with_smaller_interval":
        handleCollapsingWithSmallerInterval(index);
        break;

      // Overlapping with some of the event(s) but not all the event on the timeline
      default:
        handleCollapsingWithBiggerInterval(index);
        break;
    }
  }
  return output;
}
