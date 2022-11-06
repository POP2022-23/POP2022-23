package com.pop.carmodel.service;

import com.pop.carmodel.domain.Car;
import com.pop.carmodel.domain.CarData;
import com.pop.carmodel.dto.CarDataDTO;
import com.pop.carmodel.dto.CarDetailsDTO;
import com.pop.carmodel.repository.CarJpaRepository;
import com.pop.user.User;
import com.pop.user.UserJpaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BasicCarModel implements ICarModel {

    private CarJpaRepository carJpaRepository;
    private UserJpaRepository userJpaRepository;

    @Override
    public boolean saveCar(CarDataDTO data) {
        try {
            if(!validateCarData(data)) {
                return false;
            }
            carJpaRepository.save(mapDTOToCar(data));
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    @Override
    public List<CarDataDTO> getListCar(long userId) {
        List<Car> cars = carJpaRepository.findAllByOwnerId(userId);
        return cars.stream().map(this::mapCarToDTO).toList();
    }

    private boolean validateCarData(CarDataDTO carData) {
        CarDetailsDTO details = carData.getDetails();
        return details != null && carData.getOwnerId() > 0 && !carData.getRegistrationNumber().isEmpty()
                && !details.getMake().isEmpty() && !details.getModel().isEmpty()
                && !(details.getLength() <= 0) && !(details.getHeight() <= 0)
                && !(details.getWeight() <= 0) && !(details.getWidth() <= 0)
                && details.getType() != null && !(details.getEngineCapacity() <= 0)
                && details.getProductionYear() > 1885;
    }

    private Car mapDTOToCar(CarDataDTO dto) {
        CarData carData = new CarData();
        CarDetailsDTO detailsDto = dto.getDetails();
        carData.setModel(detailsDto.getModel());
        carData.setLength(detailsDto.getLength());
        carData.setHeight(detailsDto.getHeight());
        carData.setType(detailsDto.getType());
        carData.setEngineCapacity(detailsDto.getEngineCapacity());
        carData.setWidth(detailsDto.getWidth());
        carData.setWeight(detailsDto.getWeight());
        carData.setProductionYear((long)detailsDto.getProductionYear());
        //carData.setMake(detailsDto.getMake());

        User carOwner = userJpaRepository
                .findById(dto.getOwnerId())
                .orElseThrow(IllegalArgumentException::new);

        return new Car(dto.getRegistrationNumber(), carOwner, carData);
    }

    private CarDataDTO mapCarToDTO(Car entity) {
        long ownerId = entity.getOwner().getId();
        CarData details = entity.getCarData();
        return new CarDataDTO(ownerId, ownerId, entity.getId(), entity.getRegistrationNumber(),
                new CarDetailsDTO(details.getEngineCapacity(), details.getHeight(), details.getLength(),
                        details.getWeight(), details.getWidth(), "", details.getModel(),
                        details.getProductionYear().intValue(), details.getType()
                )
        );
    }
}
