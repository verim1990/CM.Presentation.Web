export interface Environment {
  private: {
    service: {
      name: string
    }
  } | undefined;
  identityUrl: string | undefined;
  exchangeUrl: string | undefined;
  walletUrl: string | undefined;
  walletViewsUrl: string | undefined;
  webUrl: string | undefined;
}


