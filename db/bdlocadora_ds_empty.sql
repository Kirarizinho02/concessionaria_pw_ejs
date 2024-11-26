-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2024 at 01:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bdlocadora_ds`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `catCod` int(9) NOT NULL,
  `catNome` varchar(20) NOT NULL,
  `catValorKm` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `clienteCPF` int(9) NOT NULL,
  `clienteNome` varchar(40) NOT NULL,
  `clienteEnde` varchar(60) NOT NULL,
  `clienteTel` varchar(15) NOT NULL,
  `clienteCidade` varchar(60) NOT NULL,
  `clienteDataNasc` date NOT NULL,
  `clienteCNH` bigint(11) NOT NULL,
  `clienteCNHCat` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `combustivel`
--

CREATE TABLE `combustivel` (
  `combTipo` char(1) NOT NULL,
  `combNome` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departamento`
--

CREATE TABLE `departamento` (
  `deptoCod` int(9) NOT NULL,
  `deptoNome` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `funcionarios`
--

CREATE TABLE `funcionarios` (
  `funcMatricula` smallint(4) NOT NULL,
  `funcNome` varchar(40) NOT NULL,
  `funcDepto` int(9) NOT NULL,
  `funcSalario` decimal(8,2) NOT NULL,
  `funcAdmissao` date NOT NULL,
  `funcFilho` tinyint(1) NOT NULL,
  `funcSexo` varchar(1) NOT NULL,
  `funcAtivo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ordem_servico`
--

CREATE TABLE `ordem_servico` (
  `osNum` bigint(11) NOT NULL,
  `osFuncMat` smallint(4) NOT NULL,
  `osClienteCPF` int(9) NOT NULL,
  `osVeicPlaca` char(7) NOT NULL,
  `osDataRetirada` date NOT NULL,
  `osDataDevolucao` date DEFAULT NULL,
  `osKmRetirada` decimal(8,2) NOT NULL,
  `osKmDevolucao` decimal(8,2) NOT NULL,
  `osStatus` tinyint(1) NOT NULL,
  `osValorPgto` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioLogin` int(9) NOT NULL,
  `usuarioSenha` varchar(8) NOT NULL,
  `usuarioFuncMat` smallint(4) DEFAULT NULL,
  `usuarioSetor` int(9) NOT NULL,
  `usuarioStatus` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `veiculos`
--

CREATE TABLE `veiculos` (
  `veicPlaca` char(7) NOT NULL,
  `veicMarca` varchar(15) NOT NULL,
  `veicModelo` varchar(15) NOT NULL,
  `veicCor` varchar(15) DEFAULT NULL,
  `veicAno` smallint(4) NOT NULL,
  `veicComb` char(1) DEFAULT NULL,
  `veicCat` int(9) DEFAULT NULL,
  `veicStatusAlocado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`catCod`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`clienteCPF`);

--
-- Indexes for table `combustivel`
--
ALTER TABLE `combustivel`
  ADD PRIMARY KEY (`combTipo`);

--
-- Indexes for table `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`deptoCod`);

--
-- Indexes for table `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`funcMatricula`),
  ADD KEY `funcDepto` (`funcDepto`);

--
-- Indexes for table `ordem_servico`
--
ALTER TABLE `ordem_servico`
  ADD PRIMARY KEY (`osNum`),
  ADD KEY `osVeicPlaca` (`osVeicPlaca`),
  ADD KEY `osClienteCPF` (`osClienteCPF`),
  ADD KEY `osFuncMat` (`osFuncMat`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioLogin`),
  ADD KEY `usuarioFuncMat` (`usuarioFuncMat`);

--
-- Indexes for table `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`veicPlaca`),
  ADD KEY `veicComb` (`veicComb`),
  ADD KEY `veicCat` (`veicCat`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `catCod` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departamento`
--
ALTER TABLE `departamento`
  MODIFY `deptoCod` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `funcMatricula` smallint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1001;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuarioLogin` int(9) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`funcDepto`) REFERENCES `departamento` (`deptoCod`);

--
-- Constraints for table `ordem_servico`
--
ALTER TABLE `ordem_servico`
  ADD CONSTRAINT `ordem_servico_ibfk_1` FOREIGN KEY (`osVeicPlaca`) REFERENCES `veiculos` (`veicPlaca`),
  ADD CONSTRAINT `ordem_servico_ibfk_2` FOREIGN KEY (`osClienteCPF`) REFERENCES `clientes` (`clienteCPF`),
  ADD CONSTRAINT `ordem_servico_ibfk_3` FOREIGN KEY (`osFuncMat`) REFERENCES `funcionarios` (`funcMatricula`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`usuarioFuncMat`) REFERENCES `funcionarios` (`funcMatricula`);

--
-- Constraints for table `veiculos`
--
ALTER TABLE `veiculos`
  ADD CONSTRAINT `veiculos_ibfk_1` FOREIGN KEY (`veicComb`) REFERENCES `combustivel` (`combTipo`),
  ADD CONSTRAINT `veiculos_ibfk_2` FOREIGN KEY (`veicCat`) REFERENCES `categoria` (`catCod`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
