using System.Collections.Generic;
using System.Linq;
using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;

namespace Business.Concrete
{
    public class RentalManager : IRentalService
    {
        private IRentalDal _rentalDal;

        public RentalManager(IRentalDal rentalDal)
        {
            _rentalDal = rentalDal;
        }

        [CacheAspect()]
        public IDataResult<List<Rental>> GetAll()
        {
            return new SuccessDataResult<List<Rental>>(_rentalDal.GetAll(), Messages.RentalGetAllSuccess);
        }

        [CacheAspect()]
        public IDataResult<Rental> GetById(int id)
        {
            return new SuccessDataResult<Rental>(_rentalDal.Get(r => r.Id == id));
        }

        [CacheAspect()]
        public IDataResult<RentDetailDto> GetRentalDetailByCarId(int carId)
        {
            var result = _rentalDal.GetRentalDetails(r => r.CarId == carId).LastOrDefault();
            return new SuccessDataResult<RentDetailDto>(result, Messages.RentalGetAllSuccess);
        }

        [CacheAspect()]
        public IDataResult<List<RentDetailDto>> GetAllRentalDetail()
        {
            return new SuccessDataResult<List<RentDetailDto>>(_rentalDal.GetRentalDetails(),
                Messages.RentalGetAllSuccess);
        }

        [SecuredOperation("admin")]
        [ValidationAspect(typeof(RentalValidator))]
        [CacheRemoveAspect("IRentalService.Get")]
        public IResult Add(Rental rental)
        {
            var result = BusinessRules.Run(CheckIsCarReturn(rental.CarId));
            if (result != null)
            {
                return result;
            }

            _rentalDal.Add(rental);
            return new SuccessResult(Messages.RentalAddSuccess);

        }

        [SecuredOperation("admin")]
        [ValidationAspect(typeof(RentalValidator))]
        [CacheRemoveAspect("IRentalService.Get")]
        public IResult Update(Rental rental)
        {
            var result = BusinessRules.Run(CheckRentalExists(rental.Id));
            if (result != null)
            {
                return result;
            }

            _rentalDal.Update(rental);
            return new SuccessResult(Messages.RentalUpdateSuccess);
        }

        [SecuredOperation("admin")]
        [CacheRemoveAspect("IRentalService.Get")]
        public IResult Delete(Rental rental)
        {
            var result = BusinessRules.Run(CheckRentalExists(rental.Id));
            if (result != null)
            {
                return result;
            }

            _rentalDal.Delete(rental);
            return new SuccessResult(Messages.RentalDeleteSuccess);
        }

        //rental business rules

        private IResult CheckIsCarReturn(int carId)
        {
            var results = _rentalDal.GetAll(r => r.CarId == carId);
            foreach (var result in results)
            {
                if (result.ReturnDate == null || result.RentDate > result.ReturnDate)
                {
                    return new ErrorResult(Messages.RentalCheckIsCarReturnError);
                }
            }

            return new SuccessResult();
        }

        private IResult CheckRentalExists(int rentalId)
        {
            var result = _rentalDal.Get(r => r.Id == rentalId);
            if (result == null)
            {
                return new ErrorResult(Messages.RentalCheckRentalExistsError);
            }

            return new SuccessResult();
        }
    }
}