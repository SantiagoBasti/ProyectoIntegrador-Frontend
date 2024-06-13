export function formatDateUser(date){

        const dateObj = date ? new Date(date) : new Date();
    
        const year = dateObj.getUTCFullYear();
        let month = dateObj.getUTCMonth();
        let day = dateObj.getUTCDate();
    
        if(month < 10){
            month = "0" + month
        }
        if(day < 10){
            day = "0" + day
        }
    
        return `${year}-${month}-${day}`
    
    }
    
    export function formatDate(date){
        if(!date) return "-";
    
        const collator = new Intl.DateTimeFormat("es-AR",{
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
    
        return collator.format(date)
    }