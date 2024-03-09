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
// import { todayInDays } from "../pages/content_index.jsx";
import { todayInDays } from "../utils";

// TODO(noah): add some small info text before options for each dropdown to inform the user what
//             the filter does
// TODO(noah): add filter option types:
//              - pickable location (for distance calculating)
//              - dual slider (for min-max)
//              - tag selection (actually should just be checkboxes populated by the server?)

export let filters = {
  agnostic: {
    text: "General",
    icon: { Component: CogIcon, includeText: true },
    filters: {
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
      // publish_age: {
      //   text: "Published Age",
      //   icon: { Component: ClockIcon, includeText: true },
      //   allowMultipleSelections: false,
      //   selection: -1,
      //   options: [
      //     { key: 7, text: "Last Week" },
      //     { key: 30, text: "Last Month" },
      //     { key: 90, text: "Last 3 Months" },
      //     { key: 365, text: "Last Year" },
      //     { key: 730, text: "Last 2 Years" },
      //     { key: -1, text: "Everything" },
      //   ],
      //   applyToEntry: (entry, selection) => {
      //     return (
      //       selection == -1 ||
      //       todayInDays - dateStringInDays(entry.publishDate) <= Number(selection)
      //     );
      //   },
      // },
      // [type-agnostic] tags
      // TODO(noah): ...
      language: {
        text: "Language",
        icon: { Component: LanguageIcon, includeText: true },
        allowMultipleSelections: true,
        selection: ["english", "spanish", "mandarin", "french", "german", "italian"],
        options: [
          { key: "english", text: "English" },
          { key: "spanish", text: "Spanish" },
          { key: "mandarin", text: "Mandarin" },
          { key: "french", text: "French" },
          { key: "german", text: "German" },
          { key: "italian", text: "Italian" },
        ],
        applyToEntry: (entry, selection) => {
          return selection.some((s) => entry.languages.includes(s));
        },
      },
      pricing_range: {
        text: "Pricing Range",
        icon: { Component: BanknotesIcon, includeText: true },
        allowMultipleSelections: false,
        selection: -1,
        options: [
          { key: 0, text: "Free" },
          { key: 2, text: "<= $2" },
          { key: 5, text: "<= $5" },
          { key: 10, text: "<= $10" },
          { key: 30, text: "<= $30" },
          { key: 100, text: "<= $100" },
          { key: -1, text: "Unlimited" },
        ],
        applyToEntry: (entry, selection) => {
          return (
            selection == -1 ||
            ["article", "video"].includes(entry.type) ||
            entry.price <= Number(selection)
          );
        },
      },
    },
  },
  // app: {
  //   text: "App Specific",
  //   icon: { Component: DevicePhoneMobileIcon, includeText: true },
  //   activeCheck: (f) => {
  //     return f.agnostic.filters.type.selection.includes("app");
  //   },
  //   filters: {
  //     app_platform: {
  //       text: "App Platform",
  //       icon: { Component: DevicePhoneMobileIcon, includeText: true },
  //       allowMultipleSelections: true,
  //       selection: ["web", "android", "ios"],
  //       options: [
  //         { key: "web", text: "Web" },
  //         { key: "android", text: "Android" },
  //         { key: "ios", text: "iOS" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return entry.type != "app" || selection.some((s) => entry.app_platforms.includes(s));
  //       },
  //     },
  //     app_pricing_model: {
  //       text: "App Pricing Model",
  //       activeCheck: (f) => {
  //         return f.agnostic.filters.pricing_range.selection != "free";
  //       },
  //       icon: { Component: CurrencyDollarIcon, includeText: true },
  //       allowMultipleSelections: true,
  //       selection: ["free", "one_time_fee", "subscription"],
  //       options: [
  //         { key: "free", text: "Free" },
  //         { key: "one_time_fee", text: "One-Time Fee" },
  //         { key: "subscription", text: "Subscription" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return entry.type != "app" || selection.includes(entry.typeData.pricingModel);
  //       },
  //     },
  //   },
  // },
  // article: {
  //   text: "Article Specific",
  //   icon: { Component: NewspaperIcon, includeText: true },
  //   activeCheck: (f) => {
  //     return f.agnostic.filters.type.selection.includes("article");
  //   },
  //   filters: {
  //     article_publisher_type: {
  //       text: "Article Publisher Type",
  //       icon: { Component: BuildingLibraryIcon, includeText: true },
  //       allowMultipleSelections: true,
  //       selection: ["personal", "media", "non_profit", "government"],
  //       options: [
  //         { key: "personal", text: "Personal" },
  //         { key: "media", text: "Media" },
  //         { key: "non_profit", text: "Non-Profit" },
  //         { key: "government", text: "Government" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return entry.type != "article" || selection.includes(entry.typeData.publisherType);
  //       },
  //     },
  //     article_reading_time: {
  //       text: "Article Reading Time",
  //       icon: { Component: BookOpenIcon, includeText: true },
  //       allowMultipleSelections: false,
  //       selection: -1,
  //       options: [
  //         { key: 5, text: "<= 5 Minutes" },
  //         { key: 10, text: "<= 10 Minutes" },
  //         { key: 25, text: "<= 25 Minutes" },
  //         { key: 50, text: "<= 50 Minutes" },
  //         { key: 100, text: "<= 100 Minutes" },
  //         { key: -1, text: "Unlimited" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return (
  //           selection == -1 ||
  //           entry.type != "article" ||
  //           entry.typeData.readingTimeInMinutes <= Number(selection)
  //         );
  //       },
  //     },
  //   },
  // },
  // event: {
  //   text: "Event Specific",
  //   icon: { Component: CalendarIcon, includeText: true },
  //   activeCheck: (f) => {
  //     return f.agnostic.filters.type.selection.includes("event");
  //   },
  //   filters: {
  //     event_start_date: {
  //       text: "Event Start Date",
  //       icon: { Component: CalendarIcon, includeText: true },
  //       allowMultipleSelections: false,
  //       selection: -1,
  //       options: [
  //         { key: 1, text: "<= 1 Day" },
  //         { key: 7, text: "<= 1 Week" },
  //         { key: 30, text: "<= 1 Month" },
  //         { key: 90, text: "<= 3 Months" },
  //         { key: 365, text: "<= 1 Year" },
  //         { key: -1, text: "Unlimited" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return (
  //           selection == -1 ||
  //           entry.type != "event" ||
  //           todayInDays - dateStringInDays(entry.typeData.startDate) <= Number(selection)
  //         );
  //       },
  //     },
  //     event_format: {
  //       text: "Event Format",
  //       icon: { Component: MegaphoneIcon, includeText: true },
  //       allowMultipleSelections: true,
  //       selection: ["online", "in_person"],
  //       options: [
  //         { key: "online", text: "Online" },
  //         { key: "in_person", text: "In-Person" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return entry.type != "event" || selection.includes(entry.typeData.format);
  //       },
  //     },
  //     event_location_distance: {
  //       text: "Event Location Distance",
  //       icon: { Component: MapIcon, includeText: true },
  //       activeCheck: (f) => {
  //         return f.event.filters.event_format.selection.includes("in_person");
  //       },
  //       allowMultipleSelections: false,
  //       selection: -1,
  //       options: [
  //         { key: 3, text: "<= 3km" },
  //         { key: 10, text: "<= 10km" },
  //         { key: 25, text: "<= 25km" },
  //         { key: 50, text: "<= 50km" },
  //         { key: 100, text: "<= 100km" },
  //         { key: -1, text: "Unlimited" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return true;

  //         // TODO: calculate location of client, calculate distance and BOOM
  //         // let locationDistance = entry.typeData.location;
  //         // return (
  //         //   selection == -1 || entry.type != "event" || locationDistance <= Number(selection)
  //         // );
  //       },
  //     },
  //     event_participant_limit: {
  //       text: "Event Participant Limit",
  //       icon: { Component: UserIcon, includeText: true },
  //       allowMultipleSelections: false,
  //       selection: -1,
  //       options: [
  //         { key: 10, text: "<= 10" },
  //         { key: 25, text: "<= 25" },
  //         { key: 50, text: "<= 50" },
  //         { key: 100, text: "<= 100" },
  //         { key: 300, text: "<= 300" },
  //         { key: 1000, text: "<= 1000" },
  //         { key: -1, text: "Unlimited" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return (
  //           selection == -1 ||
  //           entry.type != "event" ||
  //           entry.typeData.participantLimit <= Number(selection)
  //         );
  //       },
  //     },
  //     event_type: {
  //       text: "Event Type",
  //       icon: { Component: AcademicCapIcon, includeText: true },
  //       allowMultipleSelections: true,
  //       selection: ["volunteering", "educational", "networking"],
  //       options: [
  //         { key: "volunteering", text: "Volunteering" },
  //         { key: "educational", text: "Educational" },
  //         { key: "networking", text: "Networking" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return entry.type != "event" || selection.includes(entry.typeData.type);
  //       },
  //     },
  //   },
  // },
  // video: {
  //   text: "Video Specific",
  //   icon: { Component: VideoCameraIcon, includeText: true },
  //   activeCheck: (f) => {
  //     return f.agnostic.filters.type.selection.includes("video");
  //   },
  //   filters: {
  //     video_platform: {
  //       text: "Video Platform",
  //       icon: { Component: TvIcon, includeText: true },
  //       allowMultipleSelections: true,
  //       selection: ["youtube", "netflix", "amazon prime", "apple tv", "tiktok", "instagram"],
  //       options: [
  //         { key: "youtube", text: "YouTube" },
  //         { key: "netflix", text: "Netflix" },
  //         { key: "amazon prime", text: "Amazon Prime" },
  //         { key: "apple tv", text: "Apple TV" },
  //         { key: "tiktok", text: "TikTok" },
  //         { key: "instagram", text: "Instagram" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return (
  //           entry.type != "video" || selection.some((s) => entry.typeData.platform.includes(s))
  //         );
  //       },
  //     },
  //     video_type: {
  //       text: "Video Type",
  //       icon: { Component: VideoCameraIcon, includeText: true },
  //       allowMultipleSelections: true,
  //       selection: ["documentary", "informational", "guide"],
  //       options: [
  //         { key: "documentary", text: "Documentary" },
  //         { key: "informational", text: "Informational" },
  //         { key: "guide", text: "Guide" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return (
  //           entry.type != "video" || selection.some((s) => entry.typeData.type.includes(s))
  //         );
  //       },
  //     },
  //     video_pricing_model: {
  //       text: "Video Pricing Model",
  //       activeCheck: (f) => {
  //         return f.agnostic.filters.pricing_range.selection != "free";
  //       },
  //       icon: { Component: CurrencyDollarIcon, includeText: true },
  //       allowMultipleSelections: true,
  //       selection: ["free", "purchase", "rental", "subscription"],
  //       options: [
  //         { key: "free", text: "Free" },
  //         { key: "purchase", text: "Purchase" },
  //         { key: "rental", text: "Rental" },
  //         { key: "subscription", text: "Subscription" },
  //       ],
  //       applyToEntry: (entry, selection) => {
  //         return entry.type != "video" || selection.includes(entry.typeData.pricingModel);
  //       },
  //     },
  //   },
  // },
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
