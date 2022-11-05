INSERT INTO app_user(user_role,email,first_name,last_name,phone_number) VALUES
    ('USER','jan.kowalski@example.com','Jan','Kowalski','111222333'),
    ('EMPLOYEE','anna.nowak@gddkia.com','Anna','Nowak','555444333'),
    ('USER','bob.budowniczy@example.com','Bob','Budowniczy','999777888');

INSERT INTO car(user_id,registration_number) VALUES
    (1,'WA553323'),
    (1,'WA777323'),
    (3,'GD500233');

INSERT INTO car_data(car_id,engine_capacity,height,length,model,production_year,type,weight,width,make) VALUES
    (1,2, 1.8, 5.225,'L200',2018,'PICKUP',7, 1.815,'Mitsubishi'),
    (2,2, 1.8, 5.225,'L200',2018,'PICKUP',7, 1.815,'Mitsubishi'),
    (3,2, 1.8, 5.225,'L200',2018,'PICKUP',7, 1.815,'Mitsubishi');

INSERT INTO road(name,length) VALUES
    ('R1',300);

INSERT INTO road_node(road_id,x,y) VALUES
    (1,52.22,21.22),
    (1,53.54,22.45),
    (1,57.67,26.12)