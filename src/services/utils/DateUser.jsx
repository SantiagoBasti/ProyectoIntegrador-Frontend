export function formatDateUser(date){

        const dateObj = date ? new Date(date) : new Date();
    
        const year = dateObj.getUTCFullYear();
        let month = dateObj.getUTCMonth() + 1;
        let day = dateObj.getUTCDate();
    
        if(month < 10){
            month = "0" + month
        }
        if(day < 10){
            day = "0" + day
        }
    
        return `${year}-${month}-${day}`
    }