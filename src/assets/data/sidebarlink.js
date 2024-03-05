import { FaChartLine } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { BiCategory } from "react-icons/bi";
import { FiTag } from "react-icons/fi";
import { BsPersonGear } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoFastFoodOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";

const sidebarlink = [
    {
        Id : 1,
        title : 'Dashboard',
        link : '/',
        icon : <FaChartLine/>
    },{
        Id : 2,
        title : 'Blog',
        link : '/blog',
        icon : <TfiWrite/>
    },{
        Id : 3,
        title : 'Category',
        link : '/category',
        icon : <BiCategory/>
    },{
        Id : 4,
        title : 'Tag',
        link : '/tag',
        icon : <FiTag/>

    },{
        Id : 5,
        title : 'Profile',
        link : '/profile',
        icon : <RxPerson/>

    },
];

const administrator = [
    {
        Id : 1,
        title : 'Users Management',
        link : '/users',
        icon : <FaRegUserCircle/>

    },{
        Id : 2,
        title : 'Roles',
        link : '/role',
        icon : <BsPersonGear/>
    },{
        Id : 3,
        title : 'Reports',
        link : '/reports',
        icon : <HiOutlineDocumentReport/>
    },{
        Id : 4,
        title : 'Foods',
        link : '/foods',
        icon : <IoFastFoodOutline/>
        
    },{
        Id : 5,
        title : 'Profile',
        link : '/profile',
        icon : <RxPerson/>

    },
];

export { sidebarlink, administrator };
