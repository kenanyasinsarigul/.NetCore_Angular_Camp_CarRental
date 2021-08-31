using System.Collections.Generic;
using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;

namespace Business.Abstract
{
    public interface ICarService
    {
        IDataResult<List<Car>> GetAll();
        IDataResult<Car> GetById(int id);
        IDataResult<List<CarDetailDto>> GetCarsByBrandId(int id);
        IDataResult<List<CarDetailDto>> GetCarsByColorId(int id);
        IDataResult<List<CarDetailDto>> GetCarsDetailDto();
        IDataResult<List<CarDetailDto>> GetCarByIdDetailDto(int id);
        IDataResult<List<CarDetailDto>> GetCarsByColorAndBrandId(int colorId, int brandId);
        IResult TransactionalOperation(Car car);
        IResult Add(Car car);
        IResult Update(Car car);
        IResult Delete(Car car);
    }
}