using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OMS.Server.Model
{
    public class EmpAddress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int EmpID { get; set; }
        public string State {  get; set; }
        public string District { get; set; }
        public string Tehsil { get; set; }
        public string Village {  get; set; }
        public string Address { get; set; }
        public string Latitute { get; set; }
        public string Longitute { get; set; }
        public int Createdby { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}
