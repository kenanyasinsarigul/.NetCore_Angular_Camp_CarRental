using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCarDal : EfEntityRepositoryBase<Car, ReCapProjectContext>, ICarDal
    {
        public List<CarDetailDto> GetCarDetails(Expression<Func<CarDetailDto, bool>> filter = null)
        {
            using (var context = new ReCapProjectContext())
            {
                var result = from c in context.Cars
                             join brand in context.Brands on c.BrandId equals brand.Id
                             join color in context.Colors on c.ColorId equals color.Id
                             select new CarDetailDto()
                             {
                                 CarId = c.Id,
                                 BrandName = brand.Name,
                                 ColorName = color.Name,
                                 DailyPrice = c.DailyPrice,
                                 Description = c.Description,
                                 ModelYear = c.ModelYear,
                                 ColorId = c.ColorId,
                                 BrandId = brand.Id,
                                 FindexScore = c.FindexScore,
                             };
                return filter == null ? result.ToList() : result.Where(filter).ToList();
            }
        }
    }
}