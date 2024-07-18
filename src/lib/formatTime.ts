export default function formatTime(time: Date, hour12?: boolean) {
  return Intl.DateTimeFormat("en-US", { timeStyle: "short", hour12 }).format(
    time
  );
}
