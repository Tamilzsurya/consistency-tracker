
export const getFormatedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formatedDate = `${year}-${month}-${day}`;

    return formatedDate
}


export const getFormatedMonthAndYear = (date) => {
    const newDate = new Date(date);

    const formatedMonth = newDate.toLocaleString('en-US', {month: 'long'})
    const formatedYear = newDate.getFullYear()

    return `${formatedMonth} ${formatedYear}`
}






export const getCurrentMonthDaysList = (currentDate) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const totalDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    const totalDaysList = []
    for(let i = 1; i <= totalDay; i++){
        const newDate = new Date(currentYear, currentMonth, i)

        totalDaysList.push(getFormatedDate(newDate))
    }

    return totalDaysList
}


export const getCurrentMonthTotalDays = (currentDate) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth()

    const totalDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    

    return totalDay;
}

export const getCurrentFormattedMonth = (currentDate) => {
    const formatedMonth = currentDate.toLocaleString('en-US', {month: 'long'})

    return formatedMonth;
}


export const getNextMonthAndTotalDays = (date) => {
    const newDate = new Date(date);

    const currentMonth = newDate.getMonth();

    newDate.setMonth(currentMonth + 1 );
    const totalDays = getCurrentMonthTotalDays(newDate);
    const formatedMonth = getCurrentFormattedMonth(newDate);
    const totalDaysList = getCurrentMonthDaysList(newDate);

    return {totalDays, formatedMonth, newDate, totalDaysList}
}

export const getPreviousMonthAndTotalDays = (date) => {
    const newDate = new Date(date);

    const currentMonth = newDate.getMonth();

    newDate.setMonth(currentMonth - 1 );
    const totalDays = getCurrentMonthTotalDays(newDate);
    const formatedMonth = getCurrentFormattedMonth(newDate);
    const totalDaysList = getCurrentMonthDaysList(newDate);

    return {totalDays, formatedMonth, newDate, totalDaysList}
}




export const getCurrentMonthAndTotalDays = (date) => {
    const newDate = new Date(date)
  
    const totalDays = getCurrentMonthTotalDays(newDate);
    const formatedMonth = getCurrentFormattedMonth(newDate);
    const totalDaysList = getCurrentMonthDaysList(newDate);

    return {totalDays, formatedMonth, newDate, totalDaysList}
}