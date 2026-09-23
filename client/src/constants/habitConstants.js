import { MdAutoAwesome } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdPeople } from "react-icons/md";
import { FaPalette } from "react-icons/fa";
import { MdSelfImprovement } from "react-icons/md";
import { BsStars } from "react-icons/bs";

export const habitCategoryList = [
    {id: 1, label: 'Health', icon: FaDumbbell},
    {id: 2, label: 'Learning', icon: FaBookOpenReader},
    {id: 3, label: 'Productivity', icon: AiOutlineThunderbolt},
    {id: 4, label: 'Mindfulness', icon: MdSelfImprovement},
    {id: 5, label: 'Social', icon: MdPeople},
    {id: 6, label: 'Creative', icon: FaPalette},
    {id: 7, label: 'Others', icon: BsStars},
]