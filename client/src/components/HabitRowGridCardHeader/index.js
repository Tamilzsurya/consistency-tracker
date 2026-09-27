

import './index.css'


const HabitRowGridCardHeader = props =>{
    const {totalDays} = props


     const eachHabitRowData = [];
    for (let i = 1; i <= totalDays; i++) {
      eachHabitRowData.push(
        {
          id: i,
          habitName: 'Habit Name',
          isCompleted: false
        }
      );
    }
     
    return (
      <div className='each-habit-row-container'>
        {eachHabitRowData.map(each => (
          <div key={each.id} className='each-habit-card-container'>
            <p className='each-habit-row-card-header-date'>{each.id}</p>
          </div>
        ))}
      </div>
      
    )
    
  }

export default HabitRowGridCardHeader