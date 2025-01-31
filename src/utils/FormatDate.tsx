export function formatDate(created_at: string): string {
  const date = new Date(created_at);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const utcOffset = date.getTimezoneOffset() * 60000;
  const wibDate = new Date(date.getTime() + utcOffset + 7 * 3600000);

  const day = wibDate.getDate();
  const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    wibDate
  );
  const year = wibDate.getFullYear();

  const hours = String(wibDate.getHours()).padStart(2, "0");
  const minutes = String(wibDate.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} | ${hours}.${minutes} WIB`;
}

export function formatDateSecond(created_at: string): string {
  const date = new Date(created_at);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "1 menit yang lalu";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  } else if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  } else if (diffInDays === 1) {
    return "1 hari yang lalu";
  } else if (diffInDays < 2) {
    return `${diffInDays} hari yang lalu`;
  } else {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
      date
    );
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
}
