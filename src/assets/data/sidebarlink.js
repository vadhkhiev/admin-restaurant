import { FaChartLine } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { BsPersonGear } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoFastFoodOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { MdTableBar } from "react-icons/md";
import { BsBox2 } from "react-icons/bs";

const sidebarlink = [
    {
        Id : 1,
        title : 'Dashboard',
        link : '/',
        icon : <FaChartLine/>
    },{
        Id : 2,
        title : 'Table',
        link : '/table',
        icon : <MdTableBar/>
    },{
        Id : 4,
        title : 'Order',
        link : '/order',
        icon : <BsBox2/>

    },{
        Id : 5,
        title : 'Profile',
        link : '/profile',
        icon : <RxPerson/>

    },{
        Id : 6,
        title : 'Foods',
        link : '/foods',
        icon : <IoFastFoodOutline/>
        
    },{
        Id : 3,
        title : 'Food Reports',
        link : '/foodreports',
        icon : <HiOutlineDocumentReport/>
    },{
        id : 7,
        title : 'Income',
        link : '/income',
        icon : <TbReportMoney/>
    }
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
    }
];

export { sidebarlink, administrator };
