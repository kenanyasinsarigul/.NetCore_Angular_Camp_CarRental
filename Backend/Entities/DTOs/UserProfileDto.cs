using Core.Entities.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class UserProfileDto:IEntity
    {
        public User User { get; set; }
        public string Password { get; set; }
    }
}
