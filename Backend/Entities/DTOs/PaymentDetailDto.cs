using Core.Entities.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class PaymentDetailDto:IEntity
    {
        public Rental Rental { get; set; }
        public Payment Payment { get; set; }
    }
}
