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
        Id: 1,
        title: 'Dashboard',
        link: '/',
        icon: <FaChartLine />,
        category: "Home",
        permission: "all"
    }, {
        Id: 2,
        title: 'Order',
        link: '/order',
        icon: <BsBox2 />,
        permission: "all"


    }, {
        Id: 3,
        title: 'Foods',
        link: '/foods',
        icon: <IoFastFoodOutline />,
        permission: "all"

    }, {
        Id: 4,
        title: 'Table',
        link: '/table',
        icon: <MdTableBar />,
        permission: "all"

    },
    {
        Id: 5,
        title: 'Food',
        category: "Reports",
        link: '/food',
        icon: <HiOutlineDocumentReport />,
        permission: "all"

    }, {
        id: 6,
        title: 'Income',
        link: '/income',
        icon: <TbReportMoney />,
        permission: "all"

    }, {
        id: 7,
        category: "Administrator",
        title: 'Users Management',
        link: '/users',
        icon: <FaRegUserCircle />,
        permission: "list-user"


    }, {
        id: 8,
        title: 'Roles',
        link: '/role',
        icon: <BsPersonGear />,
        permission: "list-role"

    }
];



export { sidebarlink };
