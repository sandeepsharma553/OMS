using Microsoft.EntityFrameworkCore;
using OMS.Server.Common;
using OMS.Server.Context;
using OMS.Server.Interface;
using OMS.Server.Model;

namespace OMS.Server.Service
{
    public class AuthService : IAuthService
    {
        dbContext _context;
        public AuthService(dbContext context)
        {
            _context = context;
        }
        public async Task<ResponseModel<string>> Login(LoginModel model)
        {
            ResponseModel<string> response = new ResponseModel<string>();
            try
            {
                Login login = await _context.Login.Where(x => x.LoginID == model.UserName && x.Password == model.Password).FirstOrDefaultAsync();
                if (login != null)
                {
                    response.IsSuccess = true;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Invalid username or password";
                }
            }
            catch (Exception ex)
            {
                response.Message = "Something went wrong. Please contact Admin";
                ExceptionLogger.LogError("Login", ex);
            }
            return response;
        }
    }
}
