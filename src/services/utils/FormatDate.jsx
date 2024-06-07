export function formatTimestampToInputDate(timetamp){

    const collator = new Intl.DateTimeFormat("en-CA", {
        year:"numeric",
        month:"2-digit",
        day:"2-digit"
    })

    return collator.format(timetamp)
    //2024-02-01

}