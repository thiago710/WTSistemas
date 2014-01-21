using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WTSistemas.Controllers
{
    public class ContatosController : Controller
    {
        //
        // GET: /Contatos/

        public PartialViewResult Index()
        {
            return PartialView();
        }

    }
}
