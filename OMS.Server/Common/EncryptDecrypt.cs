using System.Text;

namespace OMS.Server.Common
{
    public class EncryptDecrypt
    {
        public static string Encrypt(string encryptString)
        {
            //    string EncryptionKey = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            //    byte[] clearBytes = Encoding.Unicode.GetBytes(encryptString);
            //    using (Aes encryptor = Aes.Create())
            //    {
            //        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
            //    0x49, 0x76,  0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76
            //});
            //        encryptor.Key = pdb.GetBytes(32);
            //        encryptor.IV = pdb.GetBytes(16);
            //        using (MemoryStream ms = new MemoryStream())
            //        {
            //            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
            //            {
            //                cs.Write(clearBytes, 0, clearBytes.Length);
            //                cs.Close();
            //            }
            //            encryptString = Convert.ToBase64String(ms.ToArray());
            //            //encryptString = encryptString.Replace("==", "");
            //        }
            //    }
            encryptString = Convert_StringvalueToHexvalue(encryptString, System.Text.Encoding.Unicode);
            return encryptString;
        }

        public static string Decrypt(string cipherText)
        {
            //    //cipherText = cipherText + "==";
            //    string EncryptionKey = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            //    cipherText = cipherText.Replace(" ", "+");
            //    byte[] cipherBytes = Convert.FromBase64String(cipherText);
            //    using (Aes encryptor = Aes.Create())
            //    {
            //        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
            //    0x49, 0x76, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76
            //});
            //        encryptor.Key = pdb.GetBytes(32);
            //        encryptor.IV = pdb.GetBytes(16);
            //        using (MemoryStream ms = new MemoryStream())
            //        {
            //            using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
            //            {
            //                cs.Write(cipherBytes, 0, cipherBytes.Length);
            //                cs.Close();
            //            }
            //            cipherText = Encoding.Unicode.GetString(ms.ToArray());
            //        }
            //    }
            cipherText = Convert_HexvalueToStringvalue(cipherText, System.Text.Encoding.Unicode);
            return cipherText;
        }
        public static string Convert_StringvalueToHexvalue(string stringvalue, System.Text.Encoding encoding)
        {
            Byte[] stringBytes = encoding.GetBytes(stringvalue);
            StringBuilder sbBytes = new StringBuilder(stringBytes.Length * 2);
            foreach (byte b in stringBytes)
            {
                sbBytes.AppendFormat("{0:X2}", b);
            }
            return sbBytes.ToString();
        }
        public static string Convert_HexvalueToStringvalue(string hexvalue, System.Text.Encoding encoding)
        {
            int CharsLength = hexvalue.Length;
            byte[] bytesarray = new byte[CharsLength / 2];
            for (int i = 0; i < CharsLength; i += 2)
            {
                bytesarray[i / 2] = Convert.ToByte(hexvalue.Substring(i, 2), 16);
            }
            return encoding.GetString(bytesarray);
        }
    }
}
