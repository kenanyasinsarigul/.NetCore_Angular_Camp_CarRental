using System.Collections.Generic;
using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;

namespace Business.Concrete
{
    public class BrandManager : IBrandService
    {
        private IBrandDal _brandDal;

        public BrandManager(IBrandDal brandDal)
        {
            _brandDal = brandDal;
        }
        [CacheAspect()]
        public IDataResult<List<Brand>> GetAll()
        {
            var result = _brandDal.GetAll();
            if (result == null)
            {
                return new ErrorDataResult<List<Brand>>(Messages.BrandGetAllError);
            }

            return new SuccessDataResult<List<Brand>>(_brandDal.GetAll(), Messages.BrandGetAllSuccess);
        }
        [CacheAspect()]
        public IDataResult<Brand> GetById(int Id)
        {
            var result = _brandDal.Get(b => b.Id == Id);
            if (result == null)
            {
                return new ErrorDataResult<Brand>(Messages.BrandGetError);
            }
            return new SuccessDataResult<Brand>(_brandDal.Get(b => b.Id == Id), Messages.BrandGetSuccess);
        }

        [SecuredOperation("admin")]
        //[ValidationAspect(typeof(BrandValidator))]
        [CacheRemoveAspect("IBrandService.Get")]
        public IResult Add(Brand brand)
        {
            _brandDal.Add(brand);
            return new SuccessResult(Messages.BrandAddSuccess);
        }

        [SecuredOperation("admin")]
        //[ValidationAspect(typeof(BrandValidator))]
        [CacheRemoveAspect("IBrandService.Get")]
        public IResult Update(Brand brand)
        {
            var result = _brandDal.Get(b => b.Id == brand.Id);
            if (result == null)
            {
                return new ErrorResult(Messages.BrandUpdateError);
            }

            _brandDal.Update(brand);
            return new SuccessResult(Messages.BrandUpdateSuccess);
        }

        [SecuredOperation("admin")]
        [CacheRemoveAspect("IBrandService.Get")]
        public IResult Delete(Brand brand)
        {
            var result = _brandDal.Get(b => b.Id == brand.Id);
            if (result == null)
            {
                return new ErrorResult(Messages.BrandDeleteError);
            }
            _brandDal.Delete(brand);
            return new SuccessResult(Messages.BrandDeleteSuccess);
        }
    }
}