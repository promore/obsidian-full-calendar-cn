import FullCalendarPlugin from "../main";
import {
    App,
    DropdownComponent,
    Notice,
    PluginSettingTab,
    Setting,
    TFile,
    TFolder,
} from "obsidian";
import { makeDefaultPartialCalendarSource, CalendarInfo } from "../types";
import { CalendarSettings } from "./components/CalendarSetting";
import { AddCalendarSource } from "./components/AddCalendarSource";
import * as ReactDOM from "react-dom";
import { createElement } from "react";
import { getDailyNoteSettings } from "obsidian-daily-notes-interface";
import ReactModal from "./ReactModal";
import { importCalendars } from "src/calendars/parsing/caldav/import";
import { getTranslations } from "../i18n/translations";

export interface FullCalendarSettings {
    calendarSources: CalendarInfo[];
    defaultCalendar: number;
    firstDay: number;
    initialView: {
        desktop: string;
        mobile: string;
    };
    timeFormat24h: boolean;
    clickToCreateEventFromMonthView: boolean;
    locale: string;
}

export const DEFAULT_SETTINGS: FullCalendarSettings = {
    calendarSources: [],
    defaultCalendar: 0,
    firstDay: 0,
    initialView: {
        desktop: "timeGridWeek",
        mobile: "timeGrid3Days",
    },
    timeFormat24h: false,
    clickToCreateEventFromMonthView: true,
    locale: "zh-cn",
};

const WEEKDAYS = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

const INITIAL_VIEW_OPTIONS = {
    DESKTOP: {
        timeGridDay: "day",
        timeGridWeek: "week",
        dayGridMonth: "month",
        listWeek: "list",
    },
    MOBILE: {
        timeGrid3Days: "threeDays",
        timeGridDay: "day",
        listWeek: "list",
    },
};

const LOCALE_OPTIONS = {
    en: "English",
    "zh-cn": "简体中文",
    "zh-tw": "繁體中文",
    ja: "日本語",
    ko: "한국어",
    fr: "Français",
    de: "Deutsch",
    es: "Español",
    it: "Italiano",
    pt: "Português",
    ru: "Русский",
};

export function addCalendarButton(
    app: App,
    plugin: FullCalendarPlugin,
    containerEl: HTMLElement,
    submitCallback: (setting: CalendarInfo) => void,
    listUsedDirectories?: () => string[]
) {
    const t = getTranslations("zh");
    let dropdown: DropdownComponent;
    const directories = app.vault
        .getAllLoadedFiles()
        .filter((f) => f instanceof TFolder)
        .map((f) => f.path);

    return new Setting(containerEl)
        .setName(t.calendars)
        .setDesc(t.addCalendar)
        .addDropdown(
            (d) =>
                (dropdown = d.addOptions({
                    local: t.fullNote,
                    dailynote: t.dailyNote,
                    icloud: t.icloud,
                    caldav: t.caldav,
                    ical: t.remoteIcs,
                }))
        )
        .addExtraButton((button) => {
            button.setTooltip(t.addCalendar);
            button.setIcon("plus-with-circle");
            button.onClick(() => {
                let modal = new ReactModal(app, async () => {
                    await plugin.loadSettings();
                    const usedDirectories = (
                        listUsedDirectories
                            ? listUsedDirectories
                            : () =>
                                  plugin.settings.calendarSources
                                      .map(
                                          (s) =>
                                              s.type === "local" && s.directory
                                      )
                                      .filter((s): s is string => !!s)
                    )();
                    let headings: string[] = [];
                    let { template } = getDailyNoteSettings();

                    if (template) {
                        if (!template.endsWith(".md")) {
                            template += ".md";
                        }
                        const file = app.vault.getAbstractFileByPath(template);
                        if (file instanceof TFile) {
                            headings =
                                app.metadataCache
                                    .getFileCache(file)
                                    ?.headings?.map((h) => h.heading) || [];
                        }
                    }

                    return createElement(AddCalendarSource, {
                        source: makeDefaultPartialCalendarSource(
                            dropdown.getValue() as CalendarInfo["type"]
                        ),
                        directories: directories.filter(
                            (dir) => usedDirectories.indexOf(dir) === -1
                        ),
                        headings,
                        submit: async (source: CalendarInfo) => {
                            if (source.type === "caldav") {
                                try {
                                    let sources = await importCalendars(
                                        {
                                            type: "basic",
                                            username: source.username,
                                            password: source.password,
                                        },
                                        source.url
                                    );
                                    sources.forEach((source) =>
                                        submitCallback(source)
                                    );
                                } catch (e) {
                                    if (e instanceof Error) {
                                        new Notice(e.message);
                                    }
                                }
                            } else {
                                submitCallback(source);
                            }
                            modal.close();
                        },
                    });
                });
                modal.open();
            });
        });
}

export class FullCalendarSettingTab extends PluginSettingTab {
    plugin: FullCalendarPlugin;
    private t: ReturnType<typeof getTranslations>;

    constructor(app: App, plugin: FullCalendarPlugin) {
        super(app, plugin);
        this.plugin = plugin;
        this.t = getTranslations("zh");
    }

    async display(): Promise<void> {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl("h2", { text: this.t.calendarPreferences });
        new Setting(containerEl)
            .setName(this.t.desktopInitialView)
            .setDesc(this.t.desktopInitialViewDesc)
            .addDropdown((dropdown) => {
                Object.entries(INITIAL_VIEW_OPTIONS.DESKTOP).forEach(
                    ([value, translationKey]) => {
                        dropdown.addOption(
                            value,
                            this.t[translationKey as keyof typeof this.t]
                        );
                    }
                );
                dropdown.setValue(this.plugin.settings.initialView.desktop);
                dropdown.onChange(async (initialView) => {
                    this.plugin.settings.initialView.desktop = initialView;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName(this.t.mobileInitialView)
            .setDesc(this.t.mobileInitialViewDesc)
            .addDropdown((dropdown) => {
                Object.entries(INITIAL_VIEW_OPTIONS.MOBILE).forEach(
                    ([value, translationKey]) => {
                        dropdown.addOption(
                            value,
                            this.t[translationKey as keyof typeof this.t]
                        );
                    }
                );
                dropdown.setValue(this.plugin.settings.initialView.mobile);
                dropdown.onChange(async (initialView) => {
                    this.plugin.settings.initialView.mobile = initialView;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName(this.t.startingDayOfWeek)
            .setDesc(this.t.startingDayOfWeekDesc)
            .addDropdown((dropdown) => {
                WEEKDAYS.forEach((translationKey, code) => {
                    dropdown.addOption(
                        code.toString(),
                        this.t[translationKey as keyof typeof this.t]
                    );
                });
                dropdown.setValue(this.plugin.settings.firstDay.toString());
                dropdown.onChange(async (codeAsString) => {
                    this.plugin.settings.firstDay = Number(codeAsString);
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName(this.t.timeFormat24h)
            .setDesc(this.t.timeFormat24hDesc)
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.timeFormat24h);
                toggle.onChange(async (val) => {
                    this.plugin.settings.timeFormat24h = val;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName(this.t.createEventOnClick)
            .setDesc(this.t.createEventOnClickDesc)
            .addToggle((toggle) => {
                toggle.setValue(
                    this.plugin.settings.clickToCreateEventFromMonthView
                );
                toggle.onChange(async (val) => {
                    this.plugin.settings.clickToCreateEventFromMonthView = val;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName(this.t.language)
            .setDesc(this.t.languageDesc)
            .addDropdown((dropdown) => {
                Object.entries(LOCALE_OPTIONS).forEach(([value, display]) => {
                    dropdown.addOption(value, display);
                });
                dropdown.setValue(this.plugin.settings.locale);
                dropdown.onChange(async (locale) => {
                    this.plugin.settings.locale = locale;
                    await this.plugin.saveSettings();
                });
            });

        containerEl.createEl("h2", { text: this.t.manageCalendars });
        addCalendarButton(
            this.app,
            this.plugin,
            containerEl,
            async (source: CalendarInfo) => {
                sourceList.addSource(source);
            },
            () =>
                sourceList.state.sources
                    .map((s) => s.type === "local" && s.directory)
                    .filter((s): s is string => !!s)
        );

        const sourcesDiv = containerEl.createDiv();
        sourcesDiv.style.display = "block";
        let sourceList = ReactDOM.render(
            createElement(CalendarSettings, {
                sources: this.plugin.settings.calendarSources,
                submit: async (settings: CalendarInfo[]) => {
                    this.plugin.settings.calendarSources = settings;
                    await this.plugin.saveSettings();
                },
            }),
            sourcesDiv
        );
    }
}
