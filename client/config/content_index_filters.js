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
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
  UserIcon,
  MapPinIcon,
  MapIcon,
  AcademicCapIcon,
  MegaphoneIcon,
  TvIcon,
} from "@heroicons/react/20/solid";
import { todayInDays } from "../pages/content_index.jsx";

// TODO(noah): add some small info text before options for each dropdown to inform the user what
//             the filter does
// TODO(noah): group categories of filters (eg. all app ones in a row)
// TODO(noah): add filter option types:
//              - pickable location (for distance calculating)
//              - dual slider (for min-max)

export let filters = {
  agnostic: {
    text: "General",
    icon: { Component: CogIcon, includeText: true },
    filters: {
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
            text: "Article",
            icon: { Component: NewspaperIcon, includeText: true },
          },
          {
            key: "event",
            text: "Event",
            icon: { Component: CalendarIcon, includeText: true },
          },
          {
            key: "video",
            text: "Video",
            icon: { Component: VideoCameraIcon, includeText: true },
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
            todayInDays - dateStringInDays(entry.publishDate) <=
            SELECTION_RANGES_IN_DAYS[selection]
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
          { key: "all", text: "Unlimited" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
    },
  },
  app: {
    text: "App Specific",
    icon: { Component: DevicePhoneMobileIcon, includeText: true },
    activeCheck: (f) => {
      return f.agnostic.filters.type.selection.includes("app");
    },
    filters: {
      // [app] platform
      app_platform: {
        text: "App Platform",
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
      app_pricing_model: {
        text: "App Pricing Model",
        activeCheck: (f) => {
          return f.agnostic.filters.pricing_range.selection != "free";
        },
        icon: { Component: CurrencyDollarIcon, includeText: true },
        allowMultipleSelections: true,
        selection: ["free", "one_time_fee", "subscription"],
        options: [
          { key: "free", text: "Free" },
          { key: "one_time_fee", text: "One-Time Fee" },
          { key: "subscription", text: "Subscription" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
    },
  },
  // [article] publisher type
  article: {
    text: "Article Specific",
    icon: { Component: NewspaperIcon, includeText: true },
    activeCheck: (f) => {
      return f.agnostic.filters.type.selection.includes("article");
    },
    filters: {
      article_publisher_type: {
        text: "Article Publisher Type",
        icon: { Component: BuildingLibraryIcon, includeText: true },
        allowMultipleSelections: true,
        selection: ["personal", "media", "non_profit", "government"],
        options: [
          { key: "personal", text: "Personal" },
          { key: "media", text: "Media" },
          { key: "non_profit", text: "Non-Profit" },
          { key: "government", text: "Government" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
      // [article] reading time
      article_reading_time: {
        text: "Article Reading Time",
        icon: { Component: BookOpenIcon, includeText: true },
        allowMultipleSelections: false,
        selection: "all",
        options: [
          { key: "less_equal_2", text: "<= 2 Minutes" },
          { key: "less_equal_5", text: "<= 5 Minutes" },
          { key: "less_equal_10", text: "<= 10 Minutes" },
          { key: "less_equal_30", text: "<= 30 Minutes" },
          { key: "less_equal_100", text: "<= 100 Minutes" },
          { key: "all", text: "Unlimited" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
    },
  },
  event: {
    text: "Event Specific",
    icon: { Component: CalendarIcon, includeText: true },
    activeCheck: (f) => {
      return f.agnostic.filters.type.selection.includes("event");
    },
    filters: {
      // [event] entry price
      // TODO: this will be covered by the general pricing range option...

      // [event] start date
      event_start_date: {
        text: "Event Start Date",
        icon: { Component: CalendarIcon, includeText: true },
        allowMultipleSelections: false,
        selection: "all",
        options: [
          { key: "less_equal_day", text: "<= 1 Day" },
          { key: "less_equal_week", text: "<= 1 Week" },
          { key: "less_equal_month", text: "<= 1 Month" },
          { key: "less_equal_3_months", text: "<= 3 Months" },
          { key: "less_equal_1_year", text: "<= 1 Year" },
          { key: "all", text: "Unlimited" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
      // [event] participant limit
      event_participant_limit: {
        text: "Event Participant Limit",
        icon: { Component: UserIcon, includeText: true },
        allowMultipleSelections: false,
        selection: "all",
        options: [
          { key: "less_equal_10", text: "<= 10" },
          { key: "less_equal_25", text: "<= 25" },
          { key: "less_equal_50", text: "<= 50" },
          { key: "less_equal_100", text: "<= 100" },
          { key: "less_equal_300", text: "<= 300" },
          { key: "less_equal_1000", text: "<= 1000" },
          { key: "all", text: "Unlimited" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
      // [event] location distance
      event_location_distance: {
        text: "Event Location Distance",
        icon: { Component: MapIcon, includeText: true },
        allowMultipleSelections: false,
        selection: "all",
        options: [
          { key: "less_equal_3", text: "<= 3km" },
          { key: "less_equal_10", text: "<= 10km" },
          { key: "less_equal_25", text: "<= 25km" },
          { key: "less_equal_50", text: "<= 50km" },
          { key: "less_equal_100", text: "<= 100km" },
          { key: "all", text: "Unlimited" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
      // [event] format
      event_format: {
        text: "Event Format",
        icon: { Component: MegaphoneIcon, includeText: true },
        allowMultipleSelections: true,
        selection: ["online", "in_person"],
        options: [
          { key: "online", text: "Online" },
          { key: "in_person", text: "In-Person" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
      // [event] type
      event_type: {
        text: "Event Type",
        icon: { Component: AcademicCapIcon, includeText: true },
        allowMultipleSelections: true,
        selection: ["volunteering", "educational", "networking"],
        options: [
          { key: "volunteering", text: "Volunteering" },
          { key: "educational", text: "Educational" },
          { key: "networking", text: "Networking" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
    },
  },
  video: {
    text: "Video Specific",
    icon: { Component: VideoCameraIcon, includeText: true },
    activeCheck: (f) => {
      return f.agnostic.filters.type.selection.includes("video");
    },
    filters: {
      // [video] platform
      video_platform: {
        text: "Video Platform",
        icon: { Component: TvIcon, includeText: true },
        allowMultipleSelections: true,
        selection: ["youtube", "netflix", "amazon prime", "apple tv", "tiktok", "instagram"],
        options: [
          { key: "youtube", text: "YouTube" },
          { key: "netflix", text: "Netflix" },
          { key: "amazon prime", text: "Amazon Prime" },
          { key: "apple tv", text: "Apple TV" },
          { key: "tiktok", text: "TikTok" },
          { key: "instagram", text: "Instagram" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
      // [video] types
      video_type: {
        text: "Video Type",
        icon: { Component: VideoCameraIcon, includeText: true },
        allowMultipleSelections: true,
        selection: ["documentary", "informational", "guide"],
        options: [
          { key: "documentary", text: "Documentary" },
          { key: "informational", text: "Informational" },
          { key: "guide", text: "Guide" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
      // [video] pricing models
      video_pricing_model: {
        text: "Video Pricing Model",
        activeCheck: (f) => {
          return f.agnostic.filters.pricing_range.selection != "free";
        },
        icon: { Component: CurrencyDollarIcon, includeText: true },
        allowMultipleSelections: true,
        selection: ["free", "purchase", "rental", "subscription"],
        options: [
          { key: "free", text: "Free" },
          { key: "purchase", text: "Purchase" },
          { key: "rental", text: "Rental" },
          { key: "subscription", text: "Subscription" },
        ],
        applyToEntry: (entry, selection) => {
          // TODO(noah): !!!
          return true;
        },
      },
    },
  },
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
