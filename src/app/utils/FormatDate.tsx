export function formatDate(created_at: string): string {
  const date = new Date(created_at);

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
