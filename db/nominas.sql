DROP DATABASE IF EXISTS nominas;
CREATE DATABASE nominas;
USE nominas;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    descripcion VARCHAR(40),
    PRIMARY KEY (id)
);

CREATE TABLE empleados (
    id INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(20),
    ape_pat VARCHAR(20),
    ape_mat VARCHAR(20),
    rol_id INT,
    active BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

DROP TABLE IF EXISTS nominas;
CREATE TABLE nominas (
    id INT AUTO_INCREMENT NOT NULL,
    id_empleado INT,
    sueldo_base FLOAT,
    adicional FLOAT,
    bono FLOAT,
    descuento_imp FLOAT,
    total_neto FLOAT,
    total_bruto FLOAT,
    vale_despensa FLOAT,
    mes VARCHAR(4),
    anio VARCHAR(5),
    PRIMARY KEY (id),
    FOREIGN KEY (id_empleado) REFERENCES empleados(id)
);

SELECT * FROM nominas;

DROP PROCEDURE IF EXISTS CREAR_EMPLEADO;
DELIMITER //

    CREATE PROCEDURE CREAR_EMPLEADO(
    IN nombre_value VARCHAR(20),
    IN ape_pat_value VARCHAR(20),
    IN ape_mat_value VARCHAR(20),
    IN rol_id INT
)
BEGIN
    INSERT INTO empleados (
        nombre,
        ape_pat,
        ape_mat,
        rol_id,
        active
    )
    VALUES (
        nombre_value,
        ape_pat_value,
        ape_mat_value,
        rol_id,
        TRUE
    );
    
    SELECT * FROM empleados WHERE active = TRUE;
END //

DELIMITER ;

SELECT * FROM empleados;

DROP PROCEDURE IF EXISTS CREAR_NOMINA;
DELIMITER //

CREATE PROCEDURE CREAR_NOMINA(
    IN entregas_value INT,
    IN id_empleado_value INT,
    IN rol_id_value INT,
    IN mes_value VARCHAR(5)
)
BEGIN
    DECLARE horas_mes INT DEFAULT 0;
    DECLARE sueldo_base INT DEFAULT 0;
    DECLARE adicional INT DEFAULT 0;
    DECLARE bono INT DEFAULT 0;
    DECLARE total_bruto FLOAT DEFAULT 0;
    DECLARE total_neto FLOAT DEFAULT 0;
    DECLARE descuento_imp FLOAT DEFAULT 0;
    DECLARE excedente FLOAT DEFAULT 0;
    DECLARE descuento_excedente FLOAT DEFAULT 0;
    DECLARE vale_despensa FLOAT DEFAULT 0;

    SET horas_mes = 8 * 6 * 4;
    SET adicional = 5 * entregas_value;

    IF rol_id_value = 1 THEN
        SET bono = 10 * horas_mes;
    ELSEIF rol_id_value = 2 THEN
        SET bono = 5 * horas_mes;
    END IF;

    SET sueldo_base = (30 * horas_mes);
    SET total_bruto = sueldo_base + adicional + bono;

    SET descuento_imp = (9 * total_bruto) / 100;

    SET vale_despensa = (total_bruto * 4) / 100;

    IF total_bruto > 10000 THEN
        SET excedente = total_bruto - 10000;
        SET descuento_excedente = (excedente * 3) / 100;
    END IF;

    SET descuento_imp = descuento_imp + descuento_excedente;

    SET total_neto = total_bruto - descuento_imp;

    INSERT INTO nominas (
        id_empleado,
        sueldo_base,
        adicional,
        bono,
        descuento_imp,
        total_neto,
        total_bruto,
        vale_despensa,
        mes,
        anio
    )
    VALUES (
        id_empleado_value,
        sueldo_base,
        adicional,
        bono,
        descuento_imp,
        total_neto,
        total_bruto,
        vale_despensa,
        mes_value,
        YEAR(CURDATE())
    );

    SELECT * FROM nominas WHERE id_empleado = id_empleado_value;
END //

DELIMITER ;
