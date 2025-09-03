import { DateTime } from "luxon";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { CalendarInfo, OFCEvent } from "../../types";
import { getTranslations } from "../../i18n/translations";

function makeChangeListener<T>(
    setState: React.Dispatch<React.SetStateAction<T>>,
    fromString: (val: string) => T
): React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> {
    return (e) => setState(fromString(e.target.value));
}

interface DayChoiceProps {
    code: string;
    label: string;
    isSelected: boolean;
    onClick: (code: string) => void;
}
const DayChoice = ({ code, label, isSelected, onClick }: DayChoiceProps) => (
    <button
        type="button"
        style={{
            marginLeft: "0.25rem",
            marginRight: "0.25rem",
            padding: "0",
            backgroundColor: isSelected
                ? "var(--interactive-accent)"
                : "var(--interactive-normal)",
            color: isSelected ? "var(--text-on-accent)" : "var(--text-normal)",
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "50%",
            width: "25px",
            height: "25px",
        }}
        onClick={() => onClick(code)}
    >
        <b>{DAY_ABBR_ZH[code as keyof typeof DAY_ABBR_ZH] || label[0]}</b>
    </button>
);

const DAY_MAP = {
    U: "Sunday",
    M: "Monday",
    T: "Tuesday",
    W: "Wednesday",
    R: "Thursday",
    F: "Friday",
    S: "Saturday",
};

const DAY_MAP_ZH = {
    U: "星期日",
    M: "星期一",
    T: "星期二",
    W: "星期三",
    R: "星期四",
    F: "星期五",
    S: "星期六",
};

const DAY_ABBR_ZH = {
    U: "日",
    M: "一",
    T: "二",
    W: "三",
    R: "四",
    F: "五",
    S: "六",
};

const DaySelect = ({
    value: days,
    onChange,
}: {
    value: string[];
    onChange: (days: string[]) => void;
}) => {
    return (
        <div>
            {Object.entries(DAY_MAP_ZH).map(([code, label]) => (
                <DayChoice
                    key={code}
                    code={code}
                    label={label}
                    isSelected={days.includes(code)}
                    onClick={() =>
                        days.includes(code)
                            ? onChange(days.filter((c) => c !== code))
                            : onChange([code, ...days])
                    }
                />
            ))}
        </div>
    );
};

interface EditEventProps {
    submit: (frontmatter: OFCEvent, calendarIndex: number) => Promise<void>;
    readonly calendars: {
        id: string;
        name: string;
        type: CalendarInfo["type"];
    }[];
    defaultCalendarIndex: number;
    initialEvent?: Partial<OFCEvent>;
    open?: () => Promise<void>;
    deleteEvent?: () => Promise<void>;
}

export const EditEvent = ({
    initialEvent,
    submit,
    open,
    deleteEvent,
    calendars,
    defaultCalendarIndex,
}: EditEventProps) => {
    // 获取当前语言设置，默认使用中文
    const t = getTranslations("zh-cn");
    const currentDayMap = DAY_MAP_ZH;
    const [date, setDate] = useState(
        initialEvent
            ? initialEvent.type === "single"
                ? initialEvent.date
                : initialEvent.type === "recurring"
                ? initialEvent.startRecur
                : initialEvent.type === "rrule"
                ? initialEvent.startDate
                : ""
            : ""
    );
    const [endDate, setEndDate] = useState(
        initialEvent && initialEvent.type === "single"
            ? initialEvent.endDate
            : undefined
    );

    let initialStartTime = "";
    let initialEndTime = "";
    if (initialEvent) {
        // @ts-ignore
        const { startTime, endTime } = initialEvent;
        initialStartTime = startTime || "";
        initialEndTime = endTime || "";
    }

    const [startTime, setStartTime] = useState(initialStartTime);
    const [endTime, setEndTime] = useState(initialEndTime);
    const [title, setTitle] = useState(initialEvent?.title || "");
    const [isRecurring, setIsRecurring] = useState(
        initialEvent?.type === "recurring" || false
    );
    const [endRecur, setEndRecur] = useState("");

    const [daysOfWeek, setDaysOfWeek] = useState<string[]>(
        (initialEvent?.type === "recurring" ? initialEvent.daysOfWeek : []) ||
            []
    );

    const [allDay, setAllDay] = useState(initialEvent?.allDay || false);

    const [calendarIndex, setCalendarIndex] = useState(defaultCalendarIndex);

    const [complete, setComplete] = useState(
        initialEvent?.type === "single" &&
            initialEvent.completed !== null &&
            initialEvent.completed !== undefined
            ? initialEvent.completed
            : false
    );

    const [isTask, setIsTask] = useState(
        initialEvent?.type === "single" &&
            initialEvent.completed !== undefined &&
            initialEvent.completed !== null
    );

    const titleRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        }
    }, [titleRef]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await submit(
            {
                ...{ title },
                ...(allDay
                    ? { allDay: true }
                    : { allDay: false, startTime: startTime || "", endTime }),
                ...(isRecurring
                    ? {
                          type: "recurring",
                          daysOfWeek: daysOfWeek as (
                              | "U"
                              | "M"
                              | "T"
                              | "W"
                              | "R"
                              | "F"
                              | "S"
                          )[],
                          startRecur: date || undefined,
                          endRecur: endRecur || undefined,
                      }
                    : {
                          type: "single",
                          date: date || "",
                          endDate: endDate || null,
                          completed: isTask ? complete : null,
                      }),
            },
            calendarIndex
        );
    };

    return (
        <>
            <div>
                <p style={{ float: "right" }}>
                    {open && <button onClick={open}>{t.openNote}</button>}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <p>
                    <input
                        ref={titleRef}
                        type="text"
                        id="title"
                        value={title}
                        placeholder={t.addTitle}
                        required
                        onChange={makeChangeListener(setTitle, (x) => x)}
                    />
                </p>
                <p>
                    <select
                        id="calendar"
                        value={calendarIndex}
                        onChange={makeChangeListener(
                            setCalendarIndex,
                            parseInt
                        )}
                    >
                        {calendars
                            .flatMap((cal) =>
                                cal.type === "local" || cal.type === "dailynote"
                                    ? [cal]
                                    : []
                            )
                            .map((cal, idx) => (
                                <option
                                    key={idx}
                                    value={idx}
                                    disabled={
                                        !(
                                            initialEvent?.title === undefined ||
                                            calendars[calendarIndex].type ===
                                                cal.type
                                        )
                                    }
                                >
                                    {cal.type === "local"
                                        ? cal.name
                                        : t.dailyNote}
                                </option>
                            ))}
                    </select>
                </p>
                <p>
                    {!isRecurring && (
                        <input
                            type="date"
                            id="date"
                            value={date}
                            required={!isRecurring}
                            // @ts-ignore
                            onChange={makeChangeListener(setDate, (x) => x)}
                        />
                    )}

                    {allDay ? (
                        <></>
                    ) : (
                        <>
                            <input
                                type="time"
                                id="startTime"
                                value={startTime}
                                required
                                onChange={makeChangeListener(
                                    setStartTime,
                                    (x) => x
                                )}
                            />
                            -
                            <input
                                type="time"
                                id="endTime"
                                value={endTime}
                                required
                                onChange={makeChangeListener(
                                    setEndTime,
                                    (x) => x
                                )}
                            />
                        </>
                    )}
                </p>
                <p>
                    <label htmlFor="allDay">{t.allDayEvent} </label>
                    <input
                        id="allDay"
                        checked={allDay}
                        onChange={(e) => setAllDay(e.target.checked)}
                        type="checkbox"
                    />
                </p>
                <p>
                    <label htmlFor="recurring">{t.recurringEvent} </label>
                    <input
                        id="recurring"
                        checked={isRecurring}
                        onChange={(e) => setIsRecurring(e.target.checked)}
                        type="checkbox"
                    />
                </p>

                {isRecurring && (
                    <>
                        <DaySelect
                            value={daysOfWeek}
                            onChange={setDaysOfWeek}
                        />
                        <p>
                            {t.startsRecurring}
                            <input
                                type="date"
                                id="startDate"
                                value={date}
                                // @ts-ignore
                                onChange={makeChangeListener(setDate, (x) => x)}
                            />
                            {t.stopsRecurring}
                            <input
                                type="date"
                                id="endDate"
                                value={endRecur}
                                onChange={makeChangeListener(
                                    setEndRecur,
                                    (x) => x
                                )}
                            />
                        </p>
                    </>
                )}
                <p>
                    <label htmlFor="task">{t.taskEvent} </label>
                    <input
                        id="task"
                        checked={isTask}
                        onChange={(e) => {
                            setIsTask(e.target.checked);
                        }}
                        type="checkbox"
                    />
                </p>

                {isTask && (
                    <>
                        <label htmlFor="taskStatus">{t.complete} </label>
                        <input
                            id="taskStatus"
                            checked={
                                !(complete === false || complete === undefined)
                            }
                            onChange={(e) =>
                                setComplete(
                                    e.target.checked
                                        ? DateTime.now().toISO()
                                        : false
                                )
                            }
                            type="checkbox"
                        />
                    </>
                )}

                <p
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <button type="submit"> {t.saveEvent} </button>
                    <span>
                        {deleteEvent && (
                            <button
                                type="button"
                                style={{
                                    backgroundColor:
                                        "var(--interactive-normal)",
                                    color: "var(--background-modifier-error)",
                                    borderColor:
                                        "var(--background-modifier-error)",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                }}
                                onClick={deleteEvent}
                            >
                                {t.deleteEvent}
                            </button>
                        )}
                    </span>
                </p>
            </form>
        </>
    );
};
