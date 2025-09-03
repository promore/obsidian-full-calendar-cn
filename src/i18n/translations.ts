// 国际化翻译文件
export interface Translations {
    // 事件管理界面
    openNote: string;
    addTitle: string;
    dailyNote: string;
    allDayEvent: string;
    recurringEvent: string;
    startsRecurring: string;
    stopsRecurring: string;
    taskEvent: string;
    complete: string;
    saveEvent: string;
    deleteEvent: string;

    // 星期
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;

    // 设置界面
    calendarPreferences: string;
    desktopInitialView: string;
    desktopInitialViewDesc: string;
    mobileInitialView: string;
    mobileInitialViewDesc: string;
    startingDayOfWeek: string;
    startingDayOfWeekDesc: string;
    timeFormat24h: string;
    timeFormat24hDesc: string;
    clickToCreateEvent: string;
    clickToCreateEventDesc: string;
    createEventOnClick: string;
    createEventOnClickDesc: string;
    language: string;
    languageDesc: string;
    manageCalendars: string;

    // 视图选项
    day: string;
    week: string;
    month: string;
    list: string;
    threeDays: string;

    // 导航按钮
    today: string;
    prev: string;
    next: string;

    // 日历源管理
    calendars: string;
    addCalendar: string;
    addCalendarTooltip: string;
    fullNote: string;
    icloud: string;
    caldav: string;
    remoteIcs: string;

    // 添加日历源表单
    directory: string;
    directoryDesc: string;
    chooseDirectory: string;
    color: string;
    colorDesc: string;
    url: string;
    urlDesc: string;
    username: string;
    usernameDesc: string;
    password: string;
    passwordDesc: string;
    heading: string;
    headingDesc: string;
    chooseHeading: string;
    importCalendars: string;
    importingCalendars: string;
    addingCalendar: string;
}

export const zhCN: Translations = {
    // 事件管理界面
    openNote: "打开笔记",
    addTitle: "添加标题",
    dailyNote: "日记",
    allDayEvent: "全天事件",
    recurringEvent: "重复事件",
    startsRecurring: "开始重复",
    stopsRecurring: "停止重复",
    taskEvent: "任务事件",
    complete: "完成？",
    saveEvent: "保存事件",
    deleteEvent: "删除事件",

    // 星期
    sunday: "星期日",
    monday: "星期一",
    tuesday: "星期二",
    wednesday: "星期三",
    thursday: "星期四",
    friday: "星期五",
    saturday: "星期六",

    // 设置界面
    calendarPreferences: "日历偏好设置",
    desktopInitialView: "桌面端初始视图",
    desktopInitialViewDesc: "选择桌面设备上的初始视图范围。",
    mobileInitialView: "移动端初始视图",
    mobileInitialViewDesc: "选择移动设备上的初始视图范围。",
    startingDayOfWeek: "一周的开始日",
    startingDayOfWeekDesc: "选择一周从哪一天开始。",
    timeFormat24h: "24小时格式",
    timeFormat24hDesc: "以24小时格式显示时间。",
    clickToCreateEvent: "在月视图中点击日期创建事件",
    clickToCreateEventDesc: "关闭后点击将打开日视图。",
    createEventOnClick: "点击月视图中的日期创建事件",
    createEventOnClickDesc: "启用后，点击月视图中的日期将创建新事件",
    language: "语言",
    languageDesc: "选择日历的显示语言。",
    manageCalendars: "管理日历",

    // 视图选项
    day: "日",
    week: "周",
    month: "月",
    list: "列表",
    threeDays: "3天",

    // 导航按钮
    today: "今天",
    prev: "上一个",
    next: "下一个",

    // 日历源管理
    calendars: "日历",
    addCalendar: "添加日历",
    addCalendarTooltip: "添加日历",
    fullNote: "完整笔记",
    icloud: "iCloud",
    caldav: "CalDAV",
    remoteIcs: "远程 (.ics 格式)",

    // 添加日历源表单
    directory: "目录",
    directoryDesc: "存储事件的目录",
    chooseDirectory: "选择目录",
    color: "颜色",
    colorDesc: "日历上事件的颜色",
    url: "网址",
    urlDesc: "服务器的网址",
    username: "用户名",
    usernameDesc: "账户的用户名",
    password: "密码",
    passwordDesc: "账户的密码",
    heading: "标题",
    headingDesc: "在日记中存储事件的标题。",
    chooseHeading: "选择标题",
    importCalendars: "导入日历",
    importingCalendars: "正在导入日历",
    addingCalendar: "正在添加日历",
};

export const en: Translations = {
    // 事件管理界面
    openNote: "Open Note",
    addTitle: "Add title",
    dailyNote: "Daily Note",
    allDayEvent: "All day event",
    recurringEvent: "Recurring Event",
    startsRecurring: "Starts recurring",
    stopsRecurring: "and stops recurring",
    taskEvent: "Task Event",
    complete: "Complete?",
    saveEvent: "Save Event",
    deleteEvent: "Delete Event",

    // 星期
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",

    // 设置界面
    calendarPreferences: "Calendar Preferences",
    desktopInitialView: "Desktop Initial View",
    desktopInitialViewDesc: "Choose the initial view range on desktop devices.",
    mobileInitialView: "Mobile Initial View",
    mobileInitialViewDesc: "Choose the initial view range on mobile devices.",
    startingDayOfWeek: "Starting Day of the Week",
    startingDayOfWeekDesc: "Choose what day of the week to start.",
    timeFormat24h: "24-hour format",
    timeFormat24hDesc: "Display the time in a 24-hour format.",
    clickToCreateEvent: "Click on a day in month view to create event",
    clickToCreateEventDesc: "Switch off to open day view on click instead.",
    createEventOnClick: "Click on a day in month view to create event",
    createEventOnClickDesc:
        "When enabled, clicking on a day in month view will create a new event",
    language: "Language",
    languageDesc: "Choose the display language for the calendar.",
    manageCalendars: "Manage Calendars",

    // 视图选项
    day: "Day",
    week: "Week",
    month: "Month",
    list: "List",
    threeDays: "3 Days",

    // 导航按钮
    today: "Today",
    prev: "Prev",
    next: "Next",

    // 日历源管理
    calendars: "Calendars",
    addCalendar: "Add calendar",
    addCalendarTooltip: "Add Calendar",
    fullNote: "Full note",
    icloud: "iCloud",
    caldav: "CalDAV",
    remoteIcs: "Remote (.ics format)",

    // 添加日历源表单
    directory: "Directory",
    directoryDesc: "Directory to store events",
    chooseDirectory: "Choose a directory",
    color: "Color",
    colorDesc: "The color of events on the calendar",
    url: "Url",
    urlDesc: "Url of the server",
    username: "Username",
    usernameDesc: "Username for the account",
    password: "Password",
    passwordDesc: "Password for the account",
    heading: "Heading",
    headingDesc: "Heading to store events under in the daily note.",
    chooseHeading: "Choose a heading",
    importCalendars: "Import Calendars",
    importingCalendars: "Importing Calendars",
    addingCalendar: "Adding Calendar",
};

// 获取当前语言的翻译
export function getTranslations(locale: string = "en"): Translations {
    switch (locale) {
        case "zh-cn":
        case "zh":
            return zhCN;
        default:
            return en;
    }
}
