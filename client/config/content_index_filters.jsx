import { dateStringInDays } from "../temp.js";
import {
  DevicePhoneMobileIcon,
  NewspaperIcon,
  VideoCameraIcon,
  CalendarIcon,
  ClockIcon,
  FunnelIcon,
  CogIcon,
  LanguageIcon,
  BanknotesIcon,
} from "@heroicons/react/20/solid";
import { todayInDays } from "../pages/content_index.jsx";

// TODO(noah): add some small info text before options for each dropdown to inform the user what
//             the filter does

export let filters = {
  // [type-agnostic] type
  type: {
    text: "Content Type",
    icon: { Component: FunnelIcon, includeText: true },
    allowMultipleSelections: true, // whether to use a radio-button (allowing on one selection)
    selection: ["app", "article", "video", "event"], // holds current selection of the filter (changes based on UI + URL search params)
    options: [
      {
        key: "app",
        text: "App",
        icon: { Component: DevicePhoneMobileIcon, includeText: true },
      },
      {
        key: "article",
        text: "Articles",
        icon: { Component: NewspaperIcon, includeText: true },
      },
      {
        key: "video",
        text: "Video",
        icon: { Component: VideoCameraIcon, includeText: true },
      },
      {
        key: "event",
        text: "Event",
        icon: { Component: CalendarIcon, includeText: true },
      },
    ],
    applyToEntry: (entry, selection) => {
      return selection.includes(entry.type);
    },
  },
  // [type-agnostic] publish age
  publish_age: {
    text: "Published Age",
    icon: { Component: ClockIcon, includeText: true },
    allowMultipleSelections: false,
    selection: "all",
    options: [
      { key: "last_week", text: "Last Week" },
      { key: "last_month", text: "Last Month" },
      { key: "last_3_months", text: "Last 3 Months" },
      { key: "last_year", text: "Last Year" },
      { key: "last_2_years", text: "Last 2 Years" },
      { key: "all", text: "Everything" },
    ],
    applyToEntry: (entry, selection) => {
      const SELECTION_RANGES_IN_DAYS = {
        last_week: 7,
        last_month: 30,
        last_3_months: 90,
        last_year: 365,
        last_2_years: 730,
        all: 999999,
      };

      return (
        todayInDays - dateStringInDays(entry.publishDate) <= SELECTION_RANGES_IN_DAYS[selection]
      );
    },
  },
  // [type-agnostic] tags
  // TODO(noah): I think a new dropdown type is needed for this...

  // [type-agnostic] language
  language: {
    text: "Language",
    icon: { Component: LanguageIcon, includeText: true },
    allowMultipleSelections: true,
    selection: ["english"],
    options: [
      { key: "english", text: "English" },
      { key: "spanish", text: "Spanish" },
      { key: "mandarin", text: "Mandarin" },
      { key: "french", text: "French" },
      { key: "german", text: "German" },
      { key: "italian", text: "Italian" },
    ],
    applyToEntry: (entry, selection) => {
      // TODO(noah): !!!
      return true;
    },
  },
  // [type-agnostic] pricing range
  pricing_range: {
    text: "Pricing Range",
    icon: { Component: BanknotesIcon, includeText: true },
    allowMultipleSelections: false,
    selection: "all",
    options: [
      { key: "free", text: "Free" },
      { key: "less_equal_2", text: "<= $2" },
      { key: "less_equal_5", text: "<= $5" },
      { key: "less_equal_10", text: "<= $10" },
      { key: "less_equal_30", text: "<= $30" },
      { key: "less_equal_100", text: "<= $100" },
      { key: "all", text: "All" },
    ],
    applyToEntry: (entry, selection) => {
      // TODO(noah): !!!
      return true;
    },
  },
  // [app] platforms
  app_platforms: {
    text: "App Platforms",
    activeCheck: (f) => {
      return f.type.selection.includes("app");
    },
    icon: { Component: DevicePhoneMobileIcon, includeText: true },
    allowMultipleSelections: true,
    selection: ["web", "android", "ios"],
    options: [
      { key: "web", text: "Web" },
      { key: "android", text: "Android" },
      { key: "ios", text: "iOS" },
    ],
    applyToEntry: (entry, selection) => {
      // TODO(noah): !!!
      return true;
    },
  },
  // [app] pricing models
  // [article] publisher type
  // [article] reading time
  // [event] entry price
  // [event] start date
  // [event] participant limit
  // [event] location distance
  // [event] format
  // [event] type
  // [video] platforms
  // [video] types
  // [video] pricing models
  // template: {
  //   text: "Template",
  //   icon: { Component: CogIcon, includeText: true },
  //   allowMultipleSelections: true,
  //   selection: ["option"],
  //   options: [{ key: "option", text: "Option" }],
  //   applyToEntry: (entry, selection) => {
  //     return true;
  //   },
  // },
};
