using System.Collections.Generic;
using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Transaction;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using ValidationRules.FluentValidation;

namespace Business.Concrete
{
    public class CarManager : ICarService
    {
        private ICarDal _carDal;

        public CarManager(ICarDal carDal)
        {
            _carDal = carDal;
        }

        [ValidationAspect(typeof(CarValidator))]
        //[SecuredOperation("admin")]
        [CacheRemoveAspect("ICarService.Get")]
        public IResult Add(Car car)
        {
            _carDal.Add(car);
            return new SuccessResult(Messages.CarAddSuccess);
        }

        //[SecuredOperation("admin")]
        [CacheRemoveAspect("ICarService.Get")]
        public IResult Delete(Car car)
        {
            var result = _carDal.Get(c => c.Id == car.Id);
            if (result == null)
            {
                return new ErrorResult(Messages.CarDeleteError);
            }

            _carDal.Delete(car);
            return new SuccessResult(Messages.CarDeleteSuccess);
        }

        [CacheAspect()]
        //[PerformanceAspect(5)]
        public IDataResult<List<Car>> GetAll()
        {
            var result = _carDal.GetAll();
            if (result == null)
            {
                return new ErrorDataResult<List<Car>>(Messages.CarGetAllError);
            }
            return new SuccessDataResult<List<Car>>(_carDal.GetAll(), Messages.CarGetAllSuccess);
        }

        [CacheAspect()]
        public IDataResult<Car> GetById(int id)
        {
            var result = _carDal.Get(c => c.Id == id);
            if (result == null)
            {
                return new SuccessDataResult<Car>(Messages.CarGetByIdError);
            }

            return new SuccessDataResult<Car>(_carDal.Get(c => c.Id == id), Messages.CarGetByIdSuccess);
        }

        [CacheAspect()]
        public IDataResult<List<CarDetailDto>> GetCarsByBrandId(int id)
        {
            var result = _carDal.GetCarDetails(c => c.BrandId == id);
            if (result == null)
            {
                return new ErrorDataResult<List<CarDetailDto>>(Messages.CarGetCarsByBrandIdError);
            }
            return new SuccessDataResult<List<CarDetailDto>>(result, Messages.CarGetCarsByBrandIdSuccess);
        }

        [CacheAspect()]
        public IDataResult<List<CarDetailDto>> GetCarsByColorId(int id)
        {
            var result = _carDal.GetCarDetails(c => c.ColorId == id);
            if (result == null)
            {
                return new ErrorDataResult<List<CarDetailDto>>(Messages.CarGetCarsByColorIdError);
            }
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(c => c.ColorId == id), Messages.CarGetCarsByColorIdSuccess);
        }

        [CacheAspect()]
        public IDataResult<List<CarDetailDto>> GetCarsDetailDto()
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(), Messages.CarGetAllSuccess);
        }

        [CacheAspect()]
        public IDataResult<List<CarDetailDto>> GetCarByIdDetailDto(int id)
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(c => c.CarId == id), Messages.CarGetAllSuccess);
        }

        [CacheAspect()]
        public IDataResult<List<CarDetailDto>> GetCarsByColorAndBrandId(int colorId, int brandId)
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(c => c.ColorId == colorId && c.BrandId == brandId), Messages.CarGetAllSuccess);
        }

        [TransactionScopeAspect]
        public IResult TransactionalOperation(Car car)
        {
            //_carDal.Add(car);
            //if (car.DailyPrice > 2)
            //{
            //    throw new Exception("transaction error");
            //}
            //_carDal.Add(car);
            return new SuccessResult("başarılı mesajı");
        }

        [ValidationAspect(typeof(CarValidator))]
        //[SecuredOperation("admin")]
        [CacheRemoveAspect("ICarService.Get")]
        public IResult Update(Car car)
        {
            var result = _carDal.Get(c => c.Id == car.Id);
            if (result == null)
            {
                return new ErrorResult(Messages.CarUpdateError);
            }

            _carDal.Update(car);
            return new SuccessResult(Messages.CarUpdateSuccess);
        }

    }
}