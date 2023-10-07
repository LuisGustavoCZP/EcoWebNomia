export function collectionToCSV(collection: Object[]) : string
{
    const keysSet = new Set<string>();
    collection.forEach(value => Object.keys(value).forEach(key => keysSet.add(key)));
    const keys = Array.from(keysSet);

    const headers = keys.map(key => `"${key}"`).join(',');
    const extractKeyValues = (record: any) => keys.map(key => `"${record[key]}"`).join(',');
    
    return collection.reduce<string>((csv, record) => 
    {
        return (`${csv}\n${extractKeyValues(record)}`).trim();
    }, headers);
}