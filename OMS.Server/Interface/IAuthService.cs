using OMS.Server.Model;

namespace OMS.Server.Interface
{
    public interface IAuthService
    {
        Task<ResponseModel<string>> Login(LoginModel model);
    }
}
