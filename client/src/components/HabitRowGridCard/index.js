import { useState } from "react"; 




// icons
import { FaSquare } from "react-icons/fa";
import { LuSquareDashed } from "react-icons/lu";

// utils
import {getFormatedDate} from '../../utils/dateAndTime/dateOperations'


import './index.css'

const HabitRowGridCard = props => {
    const { habitDetails,totalDays, totalDaysList, onCallUpdateTodayHabitEntryApi} = props
    const { id, name, category, habitEntries } = habitDetails

    

    const handelTodayChanges = (event, id, habitId, date) => {
      const isCompleted = event.target.checked
      const entryData = {id, isCompleted, habitId, entryDate: date}
     
      onCallUpdateTodayHabitEntryApi(entryData)

    }



    // create totalDaysHabitDataList
    const totalDaysHabitDataList = totalDaysList.map(each => {

        for(let eachEntry of habitEntries){

          let isCompleted = eachEntry.isCompleted ===  1 
          
          if(getFormatedDate(new Date(eachEntry.habitEntryDate)) === each){
            return {
                id: eachEntry.habitEntryId,
                habitId: id,
                habitName: name,
                isCompleted,
                date: each // "each" is a all days of current month. like (1-31/30/28/29)
            }
          }

        
        }

        return {
            id: `${id}-${each}`,
            habitId: habitDetails.id,
            habitName: name,
            isCompleted: false,
            date: each // "each" is a all days of current month like (1-31/30/28/29)
        }
    })

    

    

    
    
    
    // const [ currentMonthHabitDataList, setCurrentMonthHabitDataList] = useState(totalDaysHabitDataList);

    // console.log(currentMonthHabitDataList)

    // const handelTodayChanges = id => {
    //     const updatedHabitDataList = currentMonthHabitDataList.map(each => {
    //         if(each.id === id){
    //             return {
    //                 ...each,
    //                 isCompleted: !each.isCompleted
    //             }
    //         }else{
    //             return each
    //         }
    //     })

    //     setCurrentMonthHabitDataList(updatedHabitDataList)
    // }



    const renderCurrentGridView = (eachGridData) => {
        const {id,habitId, habitName, isCompleted, date} = eachGridData
        const todayDate = getFormatedDate(new Date());

        

        
        if(todayDate === date){
            
                return(
                  <label htmlFor={id} className="habit-card-checkbox-label-container">
                      {
                          isCompleted ? 
                                    (<FaSquare className={`habit-card-icon ${isCompleted ? 'completed-habit-card-icon today-completed-habit-card-icon' : 'incompleted-habit-card-icon'}` }/>)
                                    :
                                    (<LuSquareDashed className={`habit-card-icon incompleted-habit-card-icon` }/>)
                      }
                      
                      <input id={id} className="habit-card-checkbox-input" type="checkbox" onChange={(event) => handelTodayChanges(event,id, habitId, date)} checked={isCompleted} />
                  </label>
                   
                )
            
        }else{
          return (
             <FaSquare className={`habit-card-icon ${isCompleted ? 'completed-habit-card-icon' : 'incompleted-habit-card-icon'}` }/>
          )
        }
    }




    return (
      <div className='each-habit-row-container'>
        {totalDaysHabitDataList.map(each => (
          <div key={each.id} className="each-habit-card-container">
            
            {renderCurrentGridView(each)}
          </div>
        ))}
      </div>
      
    )
  }

export default HabitRowGridCard