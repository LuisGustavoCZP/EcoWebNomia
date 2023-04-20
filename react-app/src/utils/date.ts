export function dateParse(date : Date)
{
    return date.toISOString().replace(/T.+/gi, '')
}