# MoodMate

**MoodMate** is a responsive, animated mood‑tracking journal built in React. It combines a daily calendar, a mood selector, rich animations, dynamic backgrounds and live weather data to create an engaging personal journal experience.

---

## Features

- **Time‑Based Dynamic Backgrounds**  
  The app automatically switches the background image (morning, afternoon, evening) based on the current time of day.

- **Animated UI**  
  - Smooth page transitions and component reveals powered by Framer Motion  
  - Button hover/tap effects (scale, glow, rotation)  
  - Calendar slide‑in and date‑picker animations  

- **Mood Selector**  
  - Five moods (Happy, Sad, Angry, Relaxed, Neutral) shown as large emojis  
  - Click to select; hover animations and visual feedback  
  - Tooltip labels on hover (desktop)  

- **Journal Entry Form**  
  - Select a date (desktop calendar or mobile icon toggle)  
  - Write a note in a styled, semi‑transparent textarea  
  - Save button with gradient background, hover glow and tap animation  

- **Responsive Calendar**  
  - Desktop: calendar takes 40% of the layout width  
  - Mobile: calendar hidden behind a toggle icon; taps open a blurred‑panel view  
  - Correctly fills and aligns dates with empty slots before/after each month  

- **Local Storage Persistence**  
  - Entries (mood + note + timestamp) are stored per date key (`YYYY‑MM‑DD`)  
  - Journal reloads selected date’s entries and resets form on date change  

- **Notes & History View**  
  - “My Notes” grid displays all saved entries in frosted‑glass cards  
  - Each card shows: emoji + mood label, note text, timestamp, and a delete icon  
  - Transparent, blurred background and hover elevation match the main journal theme  

- **Weather Integration**  
  - Fetches current weather (condition, temperature, location) via WeatherStack API  
  - Displays a color‑coded icon and text in the sticky top bar  

- **Dark Mode Support**  
  - Tailwind `dark:` classes ensure all components adapt to light/dark themes  
  - Semi‑transparent backgrounds and borders adjust for readability  

---

## Tech & Libraries

- **React** – component‑based UI  
- **Tailwind CSS** – utility‑first styling and responsive layouts  
- **Framer Motion** – animations and transitions  
- **React Icons** – emoji, weather, and action icons  
- **Axios** – weather API requests  
- **LocalStorage** – offline persistence  

---

## Mobile Optimization

- Reflows to a single‑column form on small screens  
- Calendar toggles behind a single icon for space savings  
- All buttons, inputs and icons remain touch‑friendly  

---

Enjoy tracking your moods and notes with MoodMate! 😊  
