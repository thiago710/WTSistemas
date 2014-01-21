using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WTSistemas.Controllers
{
    public class EmpresaController : Controller
    {
        //
        // GET: /Empresa/

        public PartialViewResult Index()
        {
            return PartialView();
        }

    }
}
