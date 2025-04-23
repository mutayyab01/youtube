export const FormatViews = (views) => {
    if (!views) return "0";
    
    const num = parseInt(views);
    if (isNaN(num)) return "0";
  
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };