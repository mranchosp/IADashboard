CREATE TABLE `sensores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `celcius` varchar(255) NOT NULL,
  `distancia` varchar(255) NOT NULL,
  `puerta` boolean NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
