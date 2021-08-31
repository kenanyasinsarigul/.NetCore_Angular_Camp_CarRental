using Business.Abstract;
using Business.Constants;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCreditCardsController : ControllerBase
    {
        private IUserCreditCardService _userCreditCardService;

        public UserCreditCardsController(IUserCreditCardService userCreditCardService)
        {
            _userCreditCardService = userCreditCardService;
        }

        [HttpPost("add")]
        public IActionResult Add(UserCreditCard userCreditCard)
        {
            var result = _userCreditCardService.Add(userCreditCard);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(Messages.UserCreditCardControllerAddError);
        }

        [HttpGet("getallbyid")]
        public IActionResult GetAllById(int id)
        {
            var result = _userCreditCardService.GetAllByUserId(id);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result.Message);
        }
    }
}
