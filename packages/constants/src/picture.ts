import type { LicenseObjType } from "@workspace/types";

export enum Licenses {
  ALL_RIGHTS_RESERVED = "ALL_RIGHTS_RESERVED",
  CC_BY_4_0 = "CC_BY_4_0",
  CC_BY_SA_4_0 = "CC_BY_SA_4_0",
  CC_BY_NC_4_0 = "CC_BY_NC_4_0",
  CC0_1_0 = "CC0_1_0",
}

export const RESOLUTION_MAP = {
  ORIGINAL: null,
  LARGE: 1920,
  MEDIUM: 1280,
  SMALL: 640,
  THUMBNAIL: 256,
};

export const LICENSES_MAP: Record<Licenses, LicenseObjType> = {
  ALL_RIGHTS_RESERVED: {
    identifier: "all-rights-reserved",
    key: "ALL_RIGHTS_RESERVED",
    name: "All Rights Reserved",

    description:
      "The uploader retains full copyright ownership of the image. No one else may copy, modify, distribute or use the image without explicit permission.",

    permissions: {
      commercialUse: false,
      modification: false,
      redistribution: false,
      attributionRequired: false,
    },

    bestFor: "Users who want maximum control over their work.",
  },

  CC_BY_4_0: {
    identifier: "CC-BY-4.0",
    key: "CC_BY_4_0",
    name: "Creative Commons Attribution 4.0",
    officialUrl: "https://creativecommons.org/licenses/by/4.0/",

    description:
      "Others may copy, distribute, modify and use the image for any purpose, including commercial use with attribution.",

    permissions: {
      commercialUse: true,
      modification: true,
      redistribution: true,
      attributionRequired: true,
    },

    bestFor:
      "Users who want their work to be widely reused while receiving credit.",
  },

  CC_BY_SA_4_0: {
    identifier: "CC-BY-SA-4.0",
    key: "CC_BY_SA_4_0",
    name: "Creative Commons Attribution-ShareAlike 4.0",
    officialUrl: "https://creativecommons.org/licenses/by-sa/4.0/",

    description:
      "Others may modify and distribute the image including commercially provided derivatives use the same license.",

    permissions: {
      commercialUse: true,
      modification: true,
      redistribution: true,
      attributionRequired: true,
      shareAlike: true,
    },

    bestFor: "Users who want derivatives to remain open under the same terms.",
  },

  CC_BY_NC_4_0: {
    identifier: "CC-BY-NC-4.0",
    key: "CC_BY_NC_4_0",
    name: "Creative Commons Attribution-NonCommercial 4.0",
    officialUrl: "https://creativecommons.org/licenses/by-nc/4.0/",

    description:
      "Others may copy, modify and share the image for non-commercial purposes only with attribution.",

    permissions: {
      commercialUse: false,
      modification: true,
      redistribution: true,
      attributionRequired: true,
    },

    bestFor:
      "Users who want to allow reuse but prevent commercial exploitation.",
  },

  CC0_1_0: {
    identifier: "CC0-1.0",
    key: "CC0_1_0",
    name: "Creative Commons Zero 1.0 Universal",
    officialUrl: "https://creativecommons.org/publicdomain/zero/1.0/",

    description:
      "The creator waives all copyright and related rights, placing the work in the public domain.",

    permissions: {
      commercialUse: true,
      modification: true,
      redistribution: true,
      attributionRequired: false,
    },

    bestFor: "Users who want to dedicate their work to the public domain.",
  },
};
