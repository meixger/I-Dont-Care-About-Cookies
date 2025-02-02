function getItem(h) {
  switch (h) {
    case "ants.gouv.fr":
      return { strict: true, key: "cookieConsent", value: "true" };
    case "eqmac.app":
      return {
        strict: false,
        key: "EQM_PRIVACY_CONSENT_CHOSEN",
        value: "true",
      };
    case "figuya.com":
      return { strict: false, key: "cookie-dialog", value: "closed" };
    case "scoodleplay.be":
      return { strict: false, key: "scoodleAllowCookies", value: "true" };
    case "lifesum.com":
      return { strict: false, key: "accepted-cookies", value: "[]" };
    case "programmitv.it":
      return { strict: false, key: "privacy_choices_made", value: "OK" };
    case "nexus.gg":
      return { strict: true, key: "cookie-notice:accepted", value: "true" };
    case "streamelements.com":
      return {
        strict: true,
        key: "StreamElements.gdprNoticeAccepted",
        value: "true",
      };

    case "phoenix.de":
      return {
        strict: false,
        key: "user_anonymous_profile",
        value:
          '{"config":{"tracking":false,"userprofile":false,"youtube":false,"twitter":false,"facebook":false,"iframe":false,"video":{"useSubtitles":false,"useAudioDescription":false}},"votings":[],"msgflash":[],"history":[]}',
      };

    case "klarna.com":
      return [
        {
          strict: true,
          key: "safe-storage/v1/tracking-consent/trackingConsentAnalyticsKey",
          value: "KEEP_ALWAYS;;false",
        },
        {
          strict: true,
          key: "safe-storage/v1/tracking-consent/trackingConsentMarketingKey",
          value: "KEEP_ALWAYS;;false",
        },
      ];

    case "krant.volkskrant.nl":
    case "krant.dg.nl":
    case "krant.demorgen.be":
    case "krant.trouw.nl":
    case "krant.ad.nl":
    case "krant.parool.nl":
    case "krant.ed.nl":
      return [
        { strict: false, key: "vl_disable_tracking", value: "true" },
        { strict: false, key: "vl_disable_usecookie", value: "selected" },
      ];
    case "yellow.systems":
      return { strict: false, key: "isCookiesNotificationHidden", value: true };
    case "schlauer-shop24.de":
      return { strict: false, key: "Shop4CookieConsentAdv", value: false };
    case "gbnews.uk":
      return {
        strict: false,
        key: "mol.ads.cmp.tcf.cache",
        value:
          '{"getTCData":{"cmpId":27,"cmpVersion":3,"gdprApplies":true,"tcfPolicyVersion":2,"eventStatus":"tcloaded","cmpStatus":"loaded","tcString":"CPgwfhMPgwfljAbADCENBwCgAAAAAAAAAAwIAAAQUgFgA4AM-AwQBuIDcwG-AOxAdsA7kB3gEFAAg0CYAKwAXABDADIAGWANkAfgBAACCgEYAKWAU8Aq8BaAFpANYAbwA6oB8gEOgIqAReAkQBNgCdgFIgLkAYEAwkBh4DGAGTgM5AZ4Az4ByQDlAHWAPwEQHwArACGAGQAMsAbIA_ACAAEYAKWAU8Aq4BrADqgHyAQ6Ai8BIgCbAE7AKRAXIAwIBhIDDwGTgM5AZ8A5IBygDrAH4AAA.f_gAAagAAAAA","isServiceSpecific":true,"useNonStandardStacks":false,"purposeOneTreatment":false,"publisherCC":"GB","addtlConsent":"1~","repromptVersion":1,"outOfBand":{"allowedVendors":{},"disclosedVendors":{}},"purpose":{"consents":{},"legitimateInterests":{}},"vendor":{"consents":{},"legitimateInterests":{}},"specialFeatureOptins":{},"publisher":{"consents":{},"customPurpose":{"consents":{},"legitimateInterests":{}},"restrictions":{"3":{}}}},"getStoredRepromptVersion":1,"getValidTCData":{"cmpId":27,"cmpVersion":3,"gdprApplies":true,"tcfPolicyVersion":2,"eventStatus":"tcloaded","cmpStatus":"loaded","listenerId":2,"tcString":"CPgwfhMPgwfljAbADCENBwCgAAAAAAAAAAwIAAAQUgFgA4AM-AwQBuIDcwG-AOxAdsA7kB3gEFAAg0CYAKwAXABDADIAGWANkAfgBAACCgEYAKWAU8Aq8BaAFpANYAbwA6oB8gEOgIqAReAkQBNgCdgFIgLkAYEAwkBh4DGAGTgM5AZ4Az4ByQDlAHWAPwEQHwArACGAGQAMsAbIA_ACAAEYAKWAU8Aq4BrADqgHyAQ6Ai8BIgCbAE7AKRAXIAwIBhIDDwGTgM5AZ8A5IBygDrAH4AAA.f_gAAagAAAAA","isServiceSpecific":true,"useNonStandardStacks":false,"purposeOneTreatment":false,"publisherCC":"GB","addtlConsent":"1~","repromptVersion":1,"outOfBand":{"allowedVendors":{},"disclosedVendors":{}},"purpose":{"consents":{},"legitimateInterests":{}},"vendor":{"consents":{},"legitimateInterests":{}},"specialFeatureOptins":{},"publisher":{"consents":{},"customPurpose":{"consents":{},"legitimateInterests":{}},"restrictions":{"3":{},"4":{}}}}}',
      };
    case "palmangels.com":
      return { strict: false, key: "SHOW_COOKIE_BANNER", value: "no" };
  }

  const parts = h.split(".");

  if (parts.length > 2) {
    parts.shift();
    return getItem(parts.join("."));
  }

  return false;
}

const h = document.location.hostname.replace(/^w{2,3}\d*\./i, "");
let counter = 0;
const items = getItem(h);

if (items) {
  (items instanceof Array ? items : [items]).forEach(function (item) {
    const value = localStorage.getItem(item.key);

    if (value == null || (item.strict && value != item.value)) {
      localStorage.setItem(item.key, item.value);
      counter++;
    }
  });

  if (counter > 0) {
    document.location.reload();
  }
}
