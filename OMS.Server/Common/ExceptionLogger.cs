using log4net;
using log4net.Core;

namespace OMS.Server.Common
{
    public class ExceptionLogger
    {
        public static string sFolderPath = Path.Combine("ErrorLog\\");
        public static void LogError(string message, Exception ex)
        {
            if (!ex.Message.Contains("Thread was being aborted"))
            {
                try
                {
                    if (!Directory.Exists(sFolderPath)) Directory.CreateDirectory(sFolderPath);
                    string LogFile = sFolderPath + DateTime.Now.ToString("yyyyMMdd") + ".log";
                    string Error = DateTime.Now.ToString("ddMMyy HH:mm:ss") + " " + message + "\t" + ex.Message + "\t" + ex.InnerException + "\t" + ex.Source + "\t" + ex.StackTrace;
                    using (StreamWriter sw = new StreamWriter(LogFile, true))
                    {
                        sw.WriteLine(Error);
                    }
                }
                catch
                {

                }
            }

        }
        public static void LogMessage(string message)
        {
            ILog log = LogManager.GetLogger(typeof(ExceptionLogger));
            try
            {
                log4net.Config.XmlConfigurator.Configure();
                log.Logger.IsEnabledFor(Level.Alert);
                log.Info(message);
            }
            catch (Exception exp)
            {
                string s = exp.Message;
            }

        }
    }

}
