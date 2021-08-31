using Business.Abstract;
using Business.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class FindexManager:IFindexService
    {
        private IFindexDal _findexDal;

        public FindexManager(IFindexDal findexDal)
        {
            _findexDal = findexDal;
        }

        public IDataResult<List<Findex>> GetAll()
        {
            var result = _findexDal.GetAll();
            return new SuccessDataResult<List<Findex>>(result, Messages.FindexGetAllSuccess);
        }

        public IDataResult<Findex> GetByUserId(int id)
        {
            var result = _findexDal.Get(f => f.UserId == id);
            return new SuccessDataResult<Findex>(result, Messages.FindexGetByUserIdSuccess);
        }

        public IResult Add(Findex findeks)
        {
            findeks.FindexScore = new Random().Next(0, 1901);
            _findexDal.Add(findeks);
            return new SuccessResult(Messages.FindexAddSuccess);
        }
    }
}
