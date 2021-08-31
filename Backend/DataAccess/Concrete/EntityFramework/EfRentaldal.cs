using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfRentalDal : EfEntityRepositoryBase<Rental, ReCapProjectContext>, IRentalDal
    {
        public List<RentDetailDto> GetRentalDetails(Expression<Func<RentDetailDto, bool>> filter = null)
        {
            using (ReCapProjectContext context = new ReCapProjectContext())
            {
                var result = from rental in context.Rentals
                             join car in context.Cars on rental.CarId equals car.Id
                             join customer in context.Customers on rental.CustomerId equals customer.UserId
                             join user in context.Users on customer.UserId equals user.Id
                             join brand in context.Brands on car.BrandId equals brand.Id
                             select new RentDetailDto()
                             {
                                 Id = rental.Id,
                                 CarDescription = car.Description,
                                 CarBrand = brand.Name,
                                 CarModel = car.ModelYear,
                                 CompanyName = customer.CompanyName,
                                 FirstName = user.FirstName,
                                 LastName = user.LastName,
                                 RentDate = rental.RentDate,
                                 ReturnDate = rental.ReturnDate,
                                 CarId = car.Id,
                                 UserId = user.Id
                             };
                return filter == null ? result.ToList() : result.Where(filter).ToList();
            }
        }
    }
}