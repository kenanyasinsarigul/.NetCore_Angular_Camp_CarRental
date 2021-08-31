using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IUserCreditCardService
    {
        IDataResult<List<UserCreditCard>> GetAll();
        IDataResult<List<UserCreditCard>> GetAllByUserId(int id);
        IDataResult<UserCreditCard> GetById(int id);
        IResult Add(UserCreditCard userCreditCard);
        IResult Update(UserCreditCard userCreditCard);
        IResult Delete(UserCreditCard userCreditCard);
    }
}
