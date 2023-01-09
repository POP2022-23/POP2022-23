insert into app_user(email, first_name, last_name, phone_number, user_role)
values  ('jan.kowalski@example.com', 'Jan', 'Kowalski', '111222333', 'USER'),
        ('anna.nowak@example.com', 'Anna', 'Nowak', '444555666', 'USER');

insert into car(registration_number, owner_id)
values  ('WI4200R', 1),
        ('WNF1610', 2),
        ('WI4999R', 1);

insert into car_data(id, engine_capacity, height, length, make, model, production_year, type, weight, width)
values  (1, 1900, 150, 470, 'skoda', 'octavia', 2020, 'PASSENGER_CAR', 1200, 180),
        (2, 2000, 200, 600, 'renault', 'arkana', 2022, 'PASSENGER_CAR', 1800, 200),
        (3, 2400, 150, 470, 'ford', 'F150', 2020, 'TRUCK', 1200, 180);

insert into tariff(is_valid, name)
values  (true, 'tariff 1'),
        (true, 'tariff 3'),
        (true, 'tariff 4');

insert into road(length, name,tariff_id)
values  (900, 'road 1',1),
        (679, 'road 2',2),
        (1200, 'road 3',3);

insert into road_node(x, y, road_id)
values  (52.42, 21.04, 1),
        (52.89, 20.48, 1),
        (54.17, 18.9, 2),
        (53.94, 16.85, 2),
        (53.601, 15.65, 1),
        (52.49, 21.02, 1),
        (54.54, 17.38, 2),
        (54.17, 18.9, 3),
        (53.94, 16.85, 3),
        (53.601, 15.65, 3);

insert into road_pass_rate(tariff_id, rate, vehicle_type)
values  (1, 10.00, 'MOTORBIKE'),
        (1, 12.00, 'PASSENGER_CAR'),
        (1, 25.00, 'BUS'),
        (1, 40.00, 'TRUCK'),
        (2, 12.00, 'MOTORBIKE'),
        (2, 20.00, 'PASSENGER_CAR'),
        (2, 30.00, 'BUS'),
        (2, 50.00, 'TRUCK'),
        (3, 11.00, 'MOTORBIKE'),
        (3, 18.00, 'PASSENGER_CAR'),
        (3, 26.00, 'BUS'),
        (3, 43.00, 'TRUCK');

insert into transit_rate(tariff_id, rate, vehicle_type)
values  (1, 12.00, 'MOTORBIKE'),
        (1, 12.14, 'PASSENGER_CAR'),
        (1, 27.00, 'BUS'),
        (1, 42.00, 'TRUCK'),
        (2, 14.00, 'MOTORBIKE'),
        (2, 22.00, 'PASSENGER_CAR'),
        (2, 32.00, 'BUS'),
        (2, 52.00, 'TRUCK'),
        (3, 13.00, 'MOTORBIKE'),
        (3, 20.00, 'PASSENGER_CAR'),
        (3, 28.00, 'BUS'),
        (3, 45.00, 'TRUCK');

insert into fee(amount, description, expiration_date, fee_type, is_paid_up, issue_date, vehicle_type, payer_id, tariff_id)
values  (12.00, 'fee 1', '2023-01-06 18:59:11.000000', 'ROAD_PASS', true, '2023-01-05 18:59:38.000000', 'PASSENGER_CAR', 1, 1),
        (12.00, 'fee 2', '2023-01-07 18:59:11.000000', 'ROAD_PASS', true, '2023-01-06 18:59:38.000000', 'PASSENGER_CAR', 1, 1),
        (22.00, 'fee 3', '2023-01-07 18:59:11.000000', 'TRANSIT', true, '2023-01-06 18:59:38.000000', 'PASSENGER_CAR', 1, 2),
        (18.00, 'fee 4', '2023-01-07 18:59:11.000000', 'ROAD_PASS', true, '2023-01-06 18:59:38.000000', 'PASSENGER_CAR', 1, 3),
        (45.00, 'fee 5', '2023-01-09 18:59:11.000000', 'TRANSIT', false, '2023-01-07 18:59:38.000000', 'TRUCK', 1, 3);

