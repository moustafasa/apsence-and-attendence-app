export default function formatTime(time: Date | undefined, hour12?: boolean) {
  return Intl.DateTimeFormat("en-US", { timeStyle: "short", hour12 }).format(
    time
  );
}
