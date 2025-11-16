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

INSERT INTO RegistroTiempo (id_puente, fecha_registro, tiempo_espera_min, tipo_dato)
VALUES
(1, '2025-02-01 07:15', 42, 'Histórico'),
(1, '2025-02-01 08:00', 55, 'Actual'),
(1, '2025-02-01 09:00', 60, 'Histórico'),
(2, '2025-02-01 10:30', 28, 'Actual'),
(2, '2025-02-01 11:00', 35, 'Histórico'),
(2, '2025-02-01 12:00', 40, 'Actual'),
(3, '2025-02-01 13:00', 20, 'Histórico'),
(3, '2025-02-01 14:00', 25, 'Actual'),
(4, '2025-02-01 15:00', 38, 'Histórico'),
(4, '2025-02-01 16:00', 50, 'Actual'),
(1, '2025-02-02 07:00', 45, 'Histórico'),
(1, '2025-02-02 08:30', 58, 'Actual'),
(2, '2025-02-02 09:15', 32, 'Histórico'),
(2, '2025-02-02 10:00', 48, 'Actual'),
(3, '2025-02-02 11:20', 22, 'Histórico'),
(3, '2025-02-02 12:40', 30, 'Actual'),
(4, '2025-02-02 14:50', 42, 'Histórico'),
(4, '2025-02-02 16:15', 55, 'Actual');

INSERT INTO PrediccionTiempo (id_registro, tiempo_estimado_min, modelo_utilizado, margen_error)
VALUES
(10, 52, 'Regresión lineal', 0.10),
(11, 47, 'Promedio móvil', 0.12),
(12, 61, 'Regresión lineal', 0.08),
(13, 30, 'Red neuronal simple', 0.15);
