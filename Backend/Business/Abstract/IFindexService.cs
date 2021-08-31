using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IFindexService
    {
        IDataResult<List<Findex>> GetAll();
        IDataResult<Findex> GetByUserId(int id);
        IResult Add(Findex findeks);
    }
}
