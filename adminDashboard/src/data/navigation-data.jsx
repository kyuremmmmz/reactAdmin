import { FaHome, FaPlane, FaHotel, FaWallet, FaHistory, FaChartBar, FaStar, FaCog, FaUsers, FaMap, FaTree, FaUtensils, FaMusic, FaSignOutAlt } from 'react-icons/fa';

const NavigationData = [
  {
    _id: "1",
    name: "DASHBOARD",
    path: "/home/",
    icon: <FaHome />,
  },
  {
    _id: "2",
    name: "FLIGHTS",
    path: "/home/flights/",
    icon: <FaPlane />,
  },
  {
    _id: "3",
    name: "HOTELS",
    path: "/home/hotels/",
    icon: <FaHotel />,
  },
  {
    _id: "4",
    name: "POSTINGS",
    path: "/home/wallets/",
    icon: <FaWallet />,
  },
  {
    _id: "5",
    name: "TRANSACTIONS",
    path: "/home/transactions/",
    icon: <FaHistory />,
  },
  {
    _id: "6",
    name: "REPORTS",
    path: "/home/reports/",
    icon: <FaChartBar />,
  },
  {
    _id: "7",
    name: "REVIEWS",
    path: "/home/reviews/",
    icon: <FaStar />,
  },
  {
    _id: "8",
    name: "SETTINGS",
    path: "/home/settings/",
    icon: <FaCog />,
  },
  {
    _id: "9",
    name: "USERS",
    path: "/home/users/",
    icon: <FaUsers />,
  },
  {
    _id: "10",
    name: "PLACES",
    path: "/home/places/",
    icon: <FaMap />,
  },
  {
    _id: "11",
    name: "BEACHES",
    path: "/home/beaches/",
    icon: <FaTree />,
  },
  {
    _id: "12",
    name: "RESTAURANTS",
    path: "/home/restaurants/",
    icon: <FaUtensils />,
  },
  {
    _id: "13",
    name: "FESTIVALS",
    path: "/home/festivals/",
    icon: <FaMusic />, 
  },
  {
    _id: "14",
    name: "LOG OUT",
    path: "/home/logout/",
    icon: <FaSignOutAlt />,
  },
];

export default NavigationData;
