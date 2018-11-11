using CM.Shared.Kernel.Application.Settings;
using CM.Shared.Kernel.Others.Kong;

namespace CM.Presentation.Web
{
    public class AppSettings
    {
        public GlobalSettings Global { get; set; } = new GlobalSettings();

        public LocalSettings Local { get; set; } = new LocalSettings();

        public object GetPublicSettings()
        {
            return new
            {
                ServiceName = Global.Web.Name,
                IdentityUrl = Global.Identity.HttpsUrl,
                ExchangeUrl = $"{Global.Kong.PublicUrl}/{Global.Exchange.Path}",
                WalletUrl = $"{Global.Kong.PublicUrl}/{Global.Wallet.Path}",
                WalletViewsUrl = $"{Global.Kong.PublicUrl}/{Global.WalletViews.Path}",
                WebUrl = Global.Web.HttpsUrl
            };
        }
    }

    public class GlobalSettings
    {
        public bool DontUseAngularCliServer { get; set; }

        public KongSettings Kong { get; set; } = new KongSettings();

        public ServiceSettings Web { get; set; } = new ServiceSettings();

        public ServiceSettings Identity { get; set; } = new ServiceSettings();

        public ServiceSettings Exchange { get; set; } = new ServiceSettings();

        public ServiceSettings Wallet { get; set; } = new ServiceSettings();

        public ServiceSettings WalletViews { get; set; } = new ServiceSettings();
    }

    public class LocalSettings
    {
    }
}