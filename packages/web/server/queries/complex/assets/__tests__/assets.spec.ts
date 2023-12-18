import { AssetLists } from "~/config/asset-list/mock-asset-lists";

import { getAsset, getAssets } from "../index";

describe("getAssets", () => {
  describe("search", () => {
    it("should return assets that match search", async () => {
      const assets = await getAssets({
        search: { query: "acre" },
        assetList: AssetLists,
      });

      // ACRE should clearly be the best search result
      expect(assets.length).toBeTruthy();
      expect(assets[0].coinDenom).toEqual("ACRE");
    });

    it("should be possible to search IBC denoms", async () => {
      const assets = await getAssets({
        search: {
          query:
            "ibc/C491E7582E94AE921F6A029790083CDE1106C28F3F6C4AD7F1340544C13EC372",
        },
        assetList: AssetLists,
      });

      // OSMO should clearly be the best search result
      expect(assets.length).toBeTruthy();
      expect(assets[0].coinDenom).toEqual("stLUNA");
    });

    it("should not return unlisted assets", async () => {
      const assets = await getAssets({
        search: { query: "PYTH" },
        assetList: AssetLists,
      });

      expect(assets).toEqual([]);
    });
  });
});

describe("getAsset", () => {
  it("should return the asset that matches the provided denom", async () => {
    const asset = await getAsset({ anyDenom: "ACRE" });

    expect(asset).toBeTruthy();
    expect(asset?.coinDenom).toEqual("ACRE");
  });

  it("should return undefined if no asset matches the provided denom", async () => {
    const asset = await getAsset({ anyDenom: "NON_EXISTING_DENOM" });

    expect(asset).toBeUndefined();
  });
});