import { FaChartLine } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { BsPersonGear } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdTableBar } from "react-icons/md";
import { BsBox2 } from "react-icons/bs";

const sidebarlink = [
    {
        Id : 1,
        title : 'Dashboard',
        link : '/',
        icon : <FaChartLine/>
    },{
        Id : 4,
        title : 'Order',
        link : '/order',
        icon : <BsBox2/>

    },{
        Id : 6,
        title : 'Foods',
        link : '/foods',
        icon : <IoFastFoodOutline/>
        
    },{
        Id : 2,
        title : 'Table',
        link : '/table',
        icon : <MdTableBar/>
    }
];

const report = [
    {
        Id : 3,
        title : 'Food',
        link : '/food',
        icon : <HiOutlineDocumentReport/>
    },{
        id : 7,
        title : 'Income',
        link : '/income',
        icon : <TbReportMoney/>
    }
]

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

export { sidebarlink, administrator , report };
