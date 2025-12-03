# 该版本是对官方插件的中文汉化，使用 trae AI code 自动编码的，本人已经在自己的机器上测试过，请放心服用！

-   如果你对源码没有兴趣或者想直接使用该汉化插件，请下载 main.js & styles.css 替换掉插件目录下的文件。
-   保险起见，你最好先备份一下你的插件目录下的文件。
-   备份完成后，将 main.js & styles.css 替换掉插件目录下的文件。
-   重启 Obsidian。

    以下是原始版本的信息。

# 改造
使用过程中发现了很多需要不适应的地方；我会在此源码上进行修改：
1. 2025/12/3 修改按住ctrl 或者 点击打开笔记 会在当前窗口跳转 调整成 在新的 tab 页打开。

# Full Calendar Plugin

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22obsidian-full-calendar%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)

Keep your calendar in your vault! This plugin integrates the [FullCalendar](https://github.com/fullcalendar/fullcalendar) library into your Obsidian Vault so that you can keep your ever-changing daily schedule and special events and plans alongside your tasks and notes, and link freely between all of them. Each event is stored as a separate note with special frontmatter so you can take notes, form connections and add context to any event on your calendar.

Full Calendar can pull events from frontmatter on notes, or from event lists in daily notes. Full Calendar also supports read-only ICS and CalDAV remote calendars.

You can find the full documentation [here](https://obsidian-community.github.io/obsidian-full-calendar/)!

![Sample Calendar](https://raw.githubusercontent.com/obsidian-community/obsidian-full-calendar/main/docs/assets/sample-calendar.png)

The FullCalendar library is released under the [MIT license](https://github.com/fullcalendar/fullcalendar/blob/master/LICENSE.txt) by [Adam Shaw](https://github.com/arshaw). It's an awesome piece of work, and it would not have been possible to make something like this plugin so easily without it.

[![Support me on Ko-Fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M1GQ84A)

## Installation

Full Calendar is available from the Obsidian Community Plugins list -- just search for "Full Calendar" paste this link into your browser: `obsidian://show-plugin?id=obsidian-full-calendar`.

### Manual Installation

You can also head over to the [releases page](https://github.com/obsidian-community/obsidian-full-calendar/releases) and unzip the latest release inside of the `.obsidian/plugins` directory inside your vault.
