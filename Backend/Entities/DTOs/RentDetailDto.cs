using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class RentDetailDto:IEntity
    {
        public int Id { get; set; }
        public string CarDescription { get; set; }
        public int CarModel { get; set; }
        public string CarBrand { get; set; }
        public string CompanyName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime RentDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int CarId { get; set; }
        public int UserId { get; set; }
    }
}
