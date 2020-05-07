-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2019-12-05 16:36:06
-- 服务器版本： 10.4.8-MariaDB
-- PHP 版本： 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `bji01`
--

-- --------------------------------------------------------

--
-- 表的结构 `Controller`
--

CREATE TABLE `Controller` (
  `Floor` varchar(20) NOT NULL,
  `Type` enum('OpenArea','Lab','LectureRoom') NOT NULL,
  `Heating` enum('On','Off') NOT NULL,
  `Ventilation` enum('On','Off') NOT NULL,
  `Boiler` enum('On','Off') NOT NULL,
  `RequiredAuthority` enum('1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `Controller`
--

INSERT INTO `Controller` (`Floor`, `Type`, `Heating`, `Ventilation`, `Boiler`, `RequiredAuthority`) VALUES
('First', 'OpenArea', 'On', 'On', 'On', '1'),
('Ground', 'Lab', 'On', 'On', 'On', '1'),
('Second', 'OpenArea', 'On', 'On', 'On', '1'),
('Third', 'OpenArea', 'On', 'On', 'On', '1');

-- --------------------------------------------------------

--
-- 表的结构 `Environment`
--

CREATE TABLE `Environment` (
  `Floor` enum('Ground','First','Second','Third') NOT NULL,
  `Type` enum('OpenArea','Lab','LectureRoom') NOT NULL,
  `Area` int(20) NOT NULL,
  `Temperature` double NOT NULL,
  `Humidity` double NOT NULL,
  `AirQuality` int(11) NOT NULL,
  `CarbonDioxide` double NOT NULL,
  `ElectricityConsume` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `Environment`
--

INSERT INTO `Environment` (`Floor`, `Type`, `Area`, `Temperature`, `Humidity`, `AirQuality`, `CarbonDioxide`, `ElectricityConsume`) VALUES
('Third', 'OpenArea', 47, 14, 43, 14, 21, 20),
('First', 'OpenArea', 60, 19, 26.7, 31, 40, 66),
('Ground', 'OpenArea', 95, 12, 68.2, 12, 16.8, 50),
('Second', 'LectureRoom', 97, 26, 30, 36, 49, 44),
('Second', 'Lab', 135, 16, 44, 13, 24, 87),
('First', 'Lab', 171, 20, 18.6, 18, 35, 120),
('Ground', 'Lab', 185, 18, 50.3, 22, 36.2, 105);

-- --------------------------------------------------------

--
-- 表的结构 `Maintenance`
--

CREATE TABLE `Maintenance` (
  `DeviceID` int(10) NOT NULL,
  `Action` enum('Repair','Replace') NOT NULL,
  `DutyOfficer` enum('Rhys Cantrell','Aryaan Weir','Preston Hills') NOT NULL,
  `Status` enum('Pending','Working','Finished') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `Maintenance`
--

INSERT INTO `Maintenance` (`DeviceID`, `Action`, `DutyOfficer`, `Status`) VALUES
(132895, 'Repair', 'Rhys Cantrell', 'Pending'),
(164976, 'Repair', 'Rhys Cantrell', 'Working'),
(247896, 'Repair', 'Aryaan Weir', 'Pending'),
(264785, 'Replace', 'Aryaan Weir', 'Finished'),
(269874, 'Replace', 'Preston Hills', 'Working'),
(317964, 'Repair', 'Aryaan Weir', 'Finished'),
(335749, 'Replace', 'Rhys Cantrell', 'Working'),
(397415, 'Replace', 'Rhys Cantrell', 'Pending'),
(478596, 'Repair', 'Aryaan Weir', 'Working');

-- --------------------------------------------------------

--
-- 表的结构 `Occupancy`
--

CREATE TABLE `Occupancy` (
  `Floor` enum('Ground','First','Second','Third') NOT NULL,
  `Type` enum('OpenArea','Lab','LectureRoom') NOT NULL,
  `Area` int(20) NOT NULL,
  `N_Occupancy` int(10) NOT NULL,
  `F_Occupancy` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `Occupancy`
--

INSERT INTO `Occupancy` (`Floor`, `Type`, `Area`, `N_Occupancy`, `F_Occupancy`) VALUES
('Third', 'OpenArea', 47, 6, 4),
('First', 'OpenArea', 60, 13, 16),
('Ground', 'OpenArea', 95, 20, 10),
('Second', 'LectureRoom', 97, 79, 0),
('Second', 'Lab', 135, 20, 19),
('First', 'Lab', 171, 66, 74),
('Ground', 'Lab', 185, 50, 30);

-- --------------------------------------------------------

--
-- 表的结构 `Room`
--

CREATE TABLE `Room` (
  `RoomID` int(5) NOT NULL,
  `Floor` enum('0G','02') NOT NULL,
  `Capacity` int(2) NOT NULL,
  `nine` enum('Booked','Free') NOT NULL,
  `ten` set('Booked','Free') NOT NULL,
  `eleven` enum('Booked','Free') NOT NULL,
  `twelve` enum('Booked','Free') NOT NULL,
  `thirteen` enum('Booked','Free') NOT NULL,
  `fourteen` enum('Booked','Free') NOT NULL,
  `fifteen` enum('Booked','Free') NOT NULL,
  `sixteen` enum('Booked','Free') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `Room`
--

INSERT INTO `Room` (`RoomID`, `Floor`, `Capacity`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`) VALUES
(32, '02', 10, 'Booked', 'Booked', 'Free', 'Free', 'Booked', 'Booked', 'Booked', 'Free'),
(33, '02', 10, 'Free', 'Free', 'Free', 'Booked', 'Booked', 'Booked', 'Free', 'Free'),
(34, '0G', 10, 'Booked', 'Free', 'Booked', 'Booked', 'Free', 'Booked', 'Free', 'Free'),
(37, '0G', 10, 'Free', 'Booked', 'Booked', 'Booked', 'Free', 'Booked', 'Free', 'Free');

-- --------------------------------------------------------

--
-- 表的结构 `User`
--

CREATE TABLE `User` (
  `UserID` int(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `UserType` enum('Student','Staff') NOT NULL,
  `AuthorityLevel` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `User`
--

INSERT INTO `User` (`UserID`, `Name`, `Password`, `Email`, `UserType`, `AuthorityLevel`) VALUES
(1, 'Mark Friel', 'root1', 'mfriel08@qub.ac.uk', 'Student', '1'),
(2, 'Baibing Ji', 'root2', 'bji01@qub.ac.uk', 'Student', '1'),
(10154, 'Eric Terry', 'xDso3zNPUJ', 'etery54@qub.ac.uk', 'Student', '0'),
(10921, 'Rhys Cantrell', 'Rhrxh2ZJiy', 'rcant21@qub.ac.uk', 'Staff', '1'),
(11296, 'Lawrence Galindo', 'vNuzOgwO', 'lgali96@qub.ac.uk', 'Student', '0'),
(11555, 'Pedro Powell', 'DrZaScCH', 'ppowe55@qub.ac.uk', 'Student', '0'),
(11800, 'Susie Rossi', 'DNMaUlQTds', 'sross00@qub.ac.uk', 'Student', '0'),
(12534, 'Rehan Lyon', 'ZsTf6zCG11', 'rlyon34@qub.ac.uk', 'Staff', '0'),
(14117, 'Jess Dillon', 'FtSBgand', 'jdill17@qub.ac.uk', 'Student', '0'),
(14786, 'Montgomery Wagstaff', 'CSsWbdkY', 'mwags86@qub.ac.uk', 'Student', '0'),
(15578, 'Aryaan Weir', 'wZLpvivx', 'aweir78@qub.ac.uk', 'Staff', '1'),
(17146, 'Wasim Graham', 'ZdieGJzG', 'wgrah46@qub.ac.uk', 'Student', '0'),
(18232, 'Anum Brock', 'Zs5b2Y99P3', 'abrock@qub.ac.uk', 'Student', '0'),
(18339, 'Isobella Barrow', 'wLigLKGZ', 'ibarr39@qub.ac.uk', 'Student', '0'),
(19146, 'Preston Hills', 'CeYDTqdE', 'phill46@qub.ac.uk', 'Staff', '1'),
(19364, 'Jemima Brien', 'mpuGNQql', 'jbrie64@qub.ac.uk', 'Staff', '1'),
(19973, 'Harriet Morton', 'XmBuZaZp', 'hmort73@qub.ac.uk', 'Student', '0');

--
-- 转储表的索引
--

--
-- 表的索引 `Controller`
--
ALTER TABLE `Controller`
  ADD UNIQUE KEY `Floor` (`Floor`);

--
-- 表的索引 `Environment`
--
ALTER TABLE `Environment`
  ADD UNIQUE KEY `Area` (`Area`);

--
-- 表的索引 `Maintenance`
--
ALTER TABLE `Maintenance`
  ADD UNIQUE KEY `DeviceID` (`DeviceID`);

--
-- 表的索引 `Occupancy`
--
ALTER TABLE `Occupancy`
  ADD UNIQUE KEY `Area` (`Area`);

--
-- 表的索引 `Room`
--
ALTER TABLE `Room`
  ADD UNIQUE KEY `RoomID` (`RoomID`);

--
-- 表的索引 `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
