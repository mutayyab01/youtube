const RelativeTime = (inputTime) => {
    const date = new Date(inputTime);
    const now = new Date();
  
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" }); // always shows precise (e.g., "23 hours ago")
  
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
  
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      if (Math.abs(diffInSeconds) >= secondsInUnit) {
        const delta = Math.floor(diffInSeconds / secondsInUnit);
        return rtf.format(-delta, unit);
      }
    }
  
    return "just now";
};

const getRelativeTime = ({ isoTime }) => {
    return <span>{RelativeTime(isoTime)}</span>;
  };

export default getRelativeTime;
