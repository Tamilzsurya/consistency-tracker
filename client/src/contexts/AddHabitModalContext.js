import React from "react";

const AddHabitModalContext = React.createContext(
    {
        isAddHabitModalOpen: false,
        setIsAddHabitModalOpen: () => {},

        allHabitsDataVersion: 0,
        refreshHabitsData: () => {}
    }
);

export default AddHabitModalContext