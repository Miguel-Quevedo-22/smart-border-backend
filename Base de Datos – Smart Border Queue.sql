CREATE DATABASE SmartBorderQueue;
GO

USE SmartBorderQueue;
GO

-- ========================
-- TABLA: PUENTE
-- ========================
CREATE TABLE Puente (
    id_puente INT IDENTITY(1,1) PRIMARY KEY,
    nombre_puente VARCHAR(100) NOT NULL,
    tipo_trafico VARCHAR(50) NOT NULL,
    ubicacion VARCHAR(150),
    activo BIT DEFAULT 1
);

-- ========================
-- TABLA: REGISTRO_TIEMPO
-- ========================
CREATE TABLE RegistroTiempo (
    id_registro INT IDENTITY(1,1) PRIMARY KEY,
    id_puente INT NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT GETDATE(),
    tiempo_espera_min INT NOT NULL,
    tipo_dato VARCHAR(20) NOT NULL,        -- Histórico / Actual / Simulado
    origen_dato VARCHAR(100) DEFAULT 'Simulado',
    FOREIGN KEY (id_puente) REFERENCES Puente(id_puente)
);

-- ========================
-- TABLA: PREDICCION_TIEMPO
-- ========================
CREATE TABLE PrediccionTiempo (
    id_prediccion INT IDENTITY(1,1) PRIMARY KEY,
    id_registro INT NOT NULL,
    fecha_prediccion DATETIME DEFAULT GETDATE(),
    tiempo_estimado_min INT NOT NULL,
    modelo_utilizado VARCHAR(50) DEFAULT 'Regresión lineal',
    margen_error FLOAT DEFAULT 0.10,
    FOREIGN KEY (id_registro) REFERENCES RegistroTiempo(id_registro)
);

-- ========================
-- TABLA: LOG_ACTUALIZACION
-- ========================
CREATE TABLE LogActualizacion (
    id_log INT IDENTITY(1,1) PRIMARY KEY,
    id_registro INT NULL,
    fecha_actualizacion DATETIME DEFAULT GETDATE(),
    tipo_actualizacion VARCHAR(50) NOT NULL,   -- Automática / Manual
    descripcion VARCHAR(255),
    FOREIGN KEY (id_registro) REFERENCES RegistroTiempo(id_registro)
);

-- ========================
-- TABLA: USUARIO (opcional)
-- ========================
CREATE TABLE Usuario (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('Administrador','Usuario')),
    contrasena_hash VARCHAR(255) NOT NULL
);

-- ========================
-- DATOS: PUENTES
-- ========================
INSERT INTO Puente (nombre_puente, tipo_trafico, ubicacion)
VALUES
('Puente de las Américas (Córdova)', 'Vehicular', 'Av. De las Américas, Cd. Juárez'),
('Puente Ysleta–Zaragoza', 'Vehicular', 'Carretera Panamericana, Cd. Juárez'),
('Puente Stanton–Lerdo (Santa Fe)', 'Mixto', 'Av. 16 de Septiembre, Cd. Juárez'),
('Puente Paso del Norte', 'Peatonal', 'Centro Histórico, Cd. Juárez');

-- ========================
-- DATOS: REGISTROS DE TIEMPO
-- ========================
INSERT INTO RegistroTiempo (id_puente, tiempo_espera_min, tipo_dato)
VALUES
(1, 45, 'Histórico'),
(1, 55, 'Actual'),
(2, 35, 'Histórico'),
(2, 50, 'Actual'),
(3, 25, 'Histórico'),
(4, 40, 'Histórico');

-- ========================
-- DATOS: PREDICCIONES
-- ========================
INSERT INTO PrediccionTiempo (id_registro, tiempo_estimado_min, modelo_utilizado, margen_error)
VALUES
(1, 48, 'Promedio móvil', 0.12),
(2, 60, 'Regresión lineal', 0.10),
(3, 38, 'Promedio móvil', 0.15),
(4, 52, 'Regresión lineal', 0.20);

-- ========================
-- DATOS: LOG DE ACTUALIZACIONES
-- ========================
INSERT INTO LogActualizacion (id_registro, tipo_actualizacion, descripcion)
VALUES
(1, 'Automática', 'Actualización semanal de datos simulados.'),
(2, 'Manual', 'Carga de datos por administrador.'),
(3, 'Automática', 'Actualización programada.'),
(4, 'Automática', 'Carga diaria de datos.');

-- ========================
-- DATOS: USUARIOS
-- ========================
INSERT INTO Usuario (nombre_usuario, correo, rol, contrasena_hash)
VALUES
('Administrador', 'admin@smartborder.com', 'Administrador', 'hash_admin_123'),
('Linda Pérez', 'linda@smartborder.com', 'Usuario', 'hash_user_001'),
('Miguel Cortés', 'miguel@smartborder.com', 'Usuario', 'hash_user_002');

SELECT * FROM Puente;
SELECT * FROM RegistroTiempo;
SELECT * FROM PrediccionTiempo;
SELECT * FROM LogActualizacion;
SELECT * FROM Usuario;