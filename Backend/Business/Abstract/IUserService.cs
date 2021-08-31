using System.Collections.Generic;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using Entities.DTOs;

namespace Business.Abstract
{
    public interface IUserService
    {
        IDataResult<List<User>> GetAll();
        IDataResult<User> GetById(int id);
        IResult Add(User user);
        IResult Update(UserProfileDto UserProfileDto);
        IResult Delete(User user);
        IDataResult<List<OperationClaimDto>> GetClaims(User user);
        IDataResult<User> GetByMail(string email);
    }
}