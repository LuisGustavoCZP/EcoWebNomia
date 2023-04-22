export function dateParse(date : Date, local=false)
{
    if(local)
    {
        date = new Date(date);
        date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset());
        return date.toJSON().replace(/T.+/gi, '')
    }
    return date.toJSON().replace(/T.+/gi, '')
}

export function dateTimeParse(date : Date, local=false)
{
    if(local)
    {
        date = new Date(date);
        date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset());
        return date.toJSON().replace(/.\d{3}Z/gi, '')
    }
    return date.toJSON().replace(/.\d{3}Z/gi, '')
}

export function dateLocal (date : Date, time=true)
{
    if(!time) return date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}