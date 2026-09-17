

import './index.css';

const HabitSuggestionItem = props => {
    const {  habitSuggestionItemDetails } = props
    const { id,  habitName } = habitSuggestionItemDetails

    return (
        <li className="habit-empty-view-suggestion-section-li-container">
            <p className="habit-empty-view-suggestion-section-li-paragraph">{habitName}</p>
        </li>
    )

}


export default HabitSuggestionItem