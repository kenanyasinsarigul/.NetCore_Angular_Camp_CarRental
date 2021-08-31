using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class Findex : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Year { get; set; }
        public string Month { get; set; }
        public string Day { get; set; }
        public string NationalIdentity { get; set; }
        public int FindexScore { get; set; }
    }
}
