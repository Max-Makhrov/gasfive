import { Tabler_ } from "@/talbler";
import { valueTableSamples } from "./tablesamples";
import { expect, test } from "vitest";
import { getAllValuesClusters_ } from "@/tablers/columntypecluster/getvaluesclusters";
import { findNextBestFitValuesCluster_ } from "@/tablers/columntypecluster/getnextbestcluster";
import { getInitialFitColumnValuesClustersInfo_ } from "@/tablers/columntypecluster/fits/getfitclustersoptions";
import { getColumnValueClustersRowFit_ } from "@/tablers/columntypecluster/fits/getclustersrowfit";
import { reduceFittingClustersByMaxColumnGap_ } from "@/tablers/columntypecluster/fits/notfitclustersbycolumngaps";
import { getAllMatchedColumnValueClutersHeaders_ } from "@/tablers/columntypecluster/fits/getmatchedclustersheaders";
import { getColumnValueClusterHeaderIslands_ } from "@/tablers/columntypecluster/fits/clusterheaderislands";
import { getBiggerClusterHeadersByIslands_ } from "@/tablers/columntypecluster/fits/biggerheaderisland";
import { getFullValuesClusterHeaderInfoMap_ } from "@/tablers/columntypecluster/clusterstoschema/fitheaders/fullclusterheadersinfo";
import { getBestValueClustersFullInfoForSchema_ } from "@/tablers/columntypecluster/fits/bestschemaclusters";
import { getDedupedColumnsValuesClusterFullInfo_ } from "@/tablers/columntypecluster/fits/dedupeclusters";
import { getValuesClustersFirstDataRow_ } from "@/tablers/columntypecluster/clusterstoschema/clustersrowstarts";
import { getValuesClustersLastDataRow_ } from "@/tablers/columntypecluster/clusterstoschema/clustersrowend";
import { getCommonColumnValuesClustersMissingColumns_ } from "@/tablers/columntypecluster/fits/commonmissingrows";
import { getDataValuesClustersMissingColumns_ } from "@/tablers/columntypecluster/fits/missingcolumns";
import { getRichColumnValuesClustersHeaders_ } from "@/tablers/columntypecluster/fits/richheaders";
import { getTheFirstSheetSchema_ } from "@/tablers/getSchema";
import {
  _merge2SameTypeTableClusters_,
  _mergeTablerClusterGroupsIfPossible_,
  mergeSameTypeTableClusters_,
} from "@/tablers/columntypecluster/mergesametypeclusters";

////////////////////////////////////////////// Simple Test //////////////////////////////////////////////////
const te = new Tabler_(valueTableSamples.err_types);

const res = te.getSchema();
console.log("hi!");
console.log("🟢🟢🟢 Full tabler ressult:    ", JSON.stringify(res)); //

test("Dummy", () => {
  expect(0).toBe(0);
});

////////////////////////////////////////////// Full Test //////////////////////////////////////////////////
const values = valueTableSamples.err_types;

const clustersMap = getAllValuesClusters_(values);

const bestFit1 = findNextBestFitValuesCluster_(clustersMap, null);
const bestCluster1 = bestFit1.best_cluster;
const info = getInitialFitColumnValuesClustersInfo_(
  bestCluster1,
  values,
  clustersMap
);
const fitting = getColumnValueClustersRowFit_(info);

const reduced = reduceFittingClustersByMaxColumnGap_(
  fitting,
  bestCluster1,
  info.options.max_skipped_columns
);

const withHeaders = getAllMatchedColumnValueClutersHeaders_(reduced, info);
const islands = getColumnValueClusterHeaderIslands_(
  withHeaders.valid_headers_map,
  withHeaders.possible_rows_map
);
const biggestIslands = getBiggerClusterHeadersByIslands_(islands);
const fullInfo = getFullValuesClusterHeaderInfoMap_(
  biggestIslands,
  withHeaders
);
const bestFullInfoDuped = getBestValueClustersFullInfoForSchema_(fullInfo);
const bestFullInfo = getDedupedColumnsValuesClusterFullInfo_(bestFullInfoDuped);

// const firstRow = getValuesClustersFirstDataRow_(
//   bestFullInfo.map((el) => el.possible_rows_start),
//   bestFullInfo[0].header.row_index
// );
// const bestClusters = bestFullInfo.map((el) => el.cluster);
// const lastRowResponse = getValuesClustersLastDataRow_(bestClusters, info);

// const missingRows = getCommonColumnValuesClustersMissingColumns_(
//   lastRowResponse.matching_clusters.map((e) => e.indexes_null)
// );
// const missingColumns = getDataValuesClustersMissingColumns_(
//   lastRowResponse.matching_clusters.map((c) => c.column_index)
// );

// const iniHeaders = bestFullInfo.map((e) => e.header);

// const richHeaders = getRichColumnValuesClustersHeaders_(
//   iniHeaders,
//   info.options.max_header_lenght
// );
