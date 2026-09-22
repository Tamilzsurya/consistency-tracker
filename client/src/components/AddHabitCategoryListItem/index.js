


import './index.css'

const AddHabitCategoryListItem = props => {
    const { categoryItemDetails, isActive, handleSelectHabitCategory  } = props;
    const { id, label, icon: Icon } = categoryItemDetails

    const handleClick = () => {
        handleSelectHabitCategory(categoryItemDetails);
    }

    const activeCategoryItemClassName = isActive ? 'active-add-habit-pop-modal-form-habit-category-item' : '';
    const activeCategoryItemTextClassName = isActive ? 'active-add-habit-pop-modal-form-habit-category-item-text' : '';

    return (
            <li className={`add-habit-pop-modal-form-habit-category-item ${activeCategoryItemClassName}`}>
            <button type="button" className="add-habit-pop-modal-form-habit-category-item-btn" onClick={handleClick}>
                <Icon className="add-habit-pop-modal-form-habit-category-item-icon" />
                <span className={`add-habit-pop-modal-form-habit-category-item-text ${activeCategoryItemTextClassName}`}>{label}</span>
            </button>
            
        </li>
    )
}

export default AddHabitCategoryListItem