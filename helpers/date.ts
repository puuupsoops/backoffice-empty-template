export const formatDate = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

export const timeAgo = (unixTimestamp: number) => {
    const seconds = Math.floor(Number(new Date())/ 1000)  - unixTimestamp;
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + ' лет';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' месяцев';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' дней';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' часов';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' минут';
    }
    if(seconds < 10) return 'только что';
    return Math.floor(seconds) + ' секунд';
};