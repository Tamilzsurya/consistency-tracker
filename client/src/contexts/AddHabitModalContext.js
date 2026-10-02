import React from "react";

import {habitCategoryList} from '../constants/habitConstants'

const AddHabitModalContext = React.createContext(
    {
        isAddHabitModalOpen: false,
        setIsAddHabitModalOpen: () => {},

        allHabitsDataVersion: 0,
        refreshHabitsData: () => {},

        formDetails: {},
        setFormDetails: () => {},

        todayCompletedTasksPercentage: 0,
        setTodayCompletedTasksPercentage: () => {}
    }
);

export default AddHabitModalContext