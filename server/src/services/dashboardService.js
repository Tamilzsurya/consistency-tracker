const dashboardModel = require('../models/dashboardModel')


const getDashboardStats = async (userId, date) => {

    const totalTasks = await dashboardModel.getTotalTasks(userId, date)
    const todayCompletedTasks = await dashboardModel.getTodayCompletedTasks(userId, date)
    const monthCompletedTasks = await dashboardModel.getMonthCompletedTasks(userId, date)
    const taskCompletedDates = await dashboardModel.taskCompletedDates(userId, date)


    // calculate incompleted tasks
    const todayIncompletedTasks = totalTasks -todayCompletedTasks


    const taskCompletedDatesList = taskCompletedDates.map(each => each.entry_date.toISOString().split("T")[0])

    // calculate best streak
    let bestStreak = 0
    if (taskCompletedDatesList.length > 0) {
        bestStreak = 1
        let streak = 1

        for(let i = 1; i < taskCompletedDatesList.length; i++) {
            const currentDate = new Date(taskCompletedDatesList[i])
            const previousDate = new Date(taskCompletedDatesList[i-1])

            const defference = (currentDate - previousDate) / (1000 * 60 * 60 * 24)

            if(defference === 1){
                
                streak++;
            }else{
                streak = 1
            }

            if(streak > bestStreak){
                bestStreak = streak
            }
        }
    }

    // calculate today task completed percentage
    const todayCompletedTasksPercentage = todayCompletedTasks > 0 ? Math.round((todayCompletedTasks / totalTasks) * 100) : 0

    // let currentStreak = 0;
    // const today = new Date()
    // const todayString = today.toISOString().split("T")[0]
    // const previousDayString = new Date(today - 1000 * 60 * 60 * 24).toISOString().split("T")[0]
    // const lastCompletedDate = taskCompletedDatesList[taskCompletedDatesList.length - 1]



    

    let dashboardStats = {
        todayCompletedTasks,
        todayIncompletedTasks,
        todayCompletedTasksPercentage,
        monthCompletedTasks,
        bestStreak,
        totalTasks,
        
    }

    return dashboardStats 
}

module.exports = {getDashboardStats}