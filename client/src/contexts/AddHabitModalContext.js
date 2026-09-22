import React from "react";

const AddHabitModalContext = React.createContext(
    {
        isAddHabitModalOpen: false,
        setIsAddHabitModalOpen: () => {}
    }
);

export default AddHabitModalContext