CREATE DATABASE api_example;

USE api_example;

CREATE TABLE users (
  `IDF` int unsigned DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `kub` mediumint unsigned NOT NULL,
  `deltakub` mediumint unsigned NOT NULL,
  `Дата передачи` date DEFAULT (curdate()),
  KEY `IDFuser_idx` (`IDF`),
  CONSTRAINT `IDFuser` FOREIGN KEY (`IDF`) REFERENCES `workdb.деревни` (`ID`)
);