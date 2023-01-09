insert into app_user(id, email, first_name, last_name, phone_number, user_role)
values  (1, 'jan.kowalski@example.com', 'Jan', 'Kowalski', '111222333', 'USER'),
        (2, 'anna.nowak@example.com', 'Anna', 'Nowak', '444555666', 'USER');

insert into car(id, registration_number, owner_id)
values  (1, 'WI4200R', 1),
        (2, 'WNF1610', 2),
        (3, 'WI4999R', 1);

insert into car_data(id, engine_capacity, height, length, make, model, production_year, type, weight, width)
values  (1, 1900, 150, 470, 'skoda', 'octavia', 2020, 'PASSENGER_CAR', 1200, 180),
        (2, 2000, 200, 600, 'renault', 'arkana', 2022, 'PASSENGER_CAR', 1800, 200),
        (3, 2400, 150, 470, 'ford', 'F150', 2020, 'TRUCK', 1200, 180);

insert into tariff(id, is_valid, name)
values  (1, true, 'tariff 1'),
        (3, true, 'tariff 3'),
        (4, true, 'tariff 4');

insert into road(id, length, name,tariff_id)
values  (1, 900, 'road 1',1),
        (2, 679, 'road 2',3),
        (3, 1200, 'road 3',4);

insert into road_node(id, x, y, road_id)
values  (1, 52.42, 21.04, 1),
        (3, 52.89, 20.48, 1),
        (7, 54.17, 18.9, 2),
        (5, 53.94, 16.85, 2),
        (4, 53.601, 15.65, 1),
        (2, 52.49, 21.02, 1),
        (6, 54.54, 17.38, 2),
        (8, 54.17, 18.9, 3),
        (9, 53.94, 16.85, 3),
        (10, 53.601, 15.65, 3);

insert into road_pass_rate(tariff_id, rate, vehicle_type)
values  (1, 10.00, 'MOTORBIKE'),
        (1, 12.00, 'PASSENGER_CAR'),
        (1, 25.00, 'BUS'),
        (1, 40.00, 'TRUCK'),
        (3, 12.00, 'MOTORBIKE'),
        (3, 20.00, 'PASSENGER_CAR'),
        (3, 30.00, 'BUS'),
        (3, 50.00, 'TRUCK'),
        (4, 11.00, 'MOTORBIKE'),
        (4, 18.00, 'PASSENGER_CAR'),
        (4, 26.00, 'BUS'),
        (4, 43.00, 'TRUCK');

insert into transit_rate(tariff_id, rate, vehicle_type)
values  (1, 12.00, 'MOTORBIKE'),
        (1, 12.14, 'PASSENGER_CAR'),
        (1, 27.00, 'BUS'),
        (1, 42.00, 'TRUCK'),
        (3, 14.00, 'MOTORBIKE'),
        (3, 22.00, 'PASSENGER_CAR'),
        (3, 32.00, 'BUS'),
        (3, 52.00, 'TRUCK'),
        (4, 13.00, 'MOTORBIKE'),
        (4, 20.00, 'PASSENGER_CAR'),
        (4, 28.00, 'BUS'),
        (4, 45.00, 'TRUCK');

insert into fee(id, amount, description, expiration_date, fee_type, is_paid_up, issue_date, vehicle_type, payer_id, tariff_id)
values  (1, 12.00, 'fee 1', '2023-01-06 18:59:11.000000', 'ROAD_PASS', true, '2023-01-05 18:59:38.000000', 'PASSENGER_CAR', 1, 1),
        (2, 12.00, 'fee 2', '2023-01-07 18:59:11.000000', 'ROAD_PASS', true, '2023-01-06 18:59:38.000000', 'PASSENGER_CAR', 1, 1),
        (3, 22.00, 'fee 3', '2023-01-07 18:59:11.000000', 'TRANSIT', true, '2023-01-06 18:59:38.000000', 'PASSENGER_CAR', 1, 3),
        (4, 18.00, 'fee 4', '2023-01-07 18:59:11.000000', 'ROAD_PASS', true, '2023-01-06 18:59:38.000000', 'PASSENGER_CAR', 2, 4),
        (5, 45.00, 'fee 5', '2023-01-09 18:59:11.000000', 'TRANSIT', false, '2023-01-07 18:59:38.000000', 'TRUCKR', 1, 4);

