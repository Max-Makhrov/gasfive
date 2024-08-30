/** @typedef {import ("./cluster").SheetsValuesColumnCluster} SheetsValuesColumnCluster */
/** @typedef {import("@/typers/gettype").TypeCheckResult} TypeCheckResult */
/** @typedef {import("@/typers/gettype").BasicDataType} BasicDataType */

import { getMergeCommonDataTypesType_ } from "@/typers/typesmergetype";
import { mergeColumnValuesClusters_ } from "./clusterstoschema/mergeclusters";

/**
 * param {SheetsValuesColumnCluster[][]} clusters
 * @param {Number} maxGap
 *
 * @returns {SheetsValuesColumnCluster[][]}
 */
export function mergeSameTypeTableClusters_(clusters, maxGap) {
  /** @type {SheetsValuesColumnCluster[][]} */
  const result = clusters.map((c) =>
    _mergeTablerClusterGroupsIfPossible_(c, maxGap)
  );
  return result;
}

/**
 *
 * @param {SheetsValuesColumnCluster[]} clusters
 * @param {Number} maxGap
 *
 * @returns {SheetsValuesColumnCluster[]}
 */
export function _mergeTablerClusterGroupsIfPossible_(clusters, maxGap) {
  /** @type {SheetsValuesColumnCluster[]}  */
  const newClusters = [...clusters];

  let i = 0;
  while (i < newClusters.length - 1) {
    const mergeResult = _merge2SameTypeTableClusters_(
      newClusters[i],
      newClusters[i + 1],
      maxGap
    );
    if (mergeResult.can_merge) {
      // replace two clusters with their merged version and continue scanning the array again
      newClusters.splice(i, 2, mergeResult.merged);
      i = 0;
    } else {
      i++; // move to next pair
    }
  }

  return newClusters;
}

/**
 * @typedef {Object} _Merge2TypesClusterRerult
 * @prop {Boolean} can_merge
 * @prop {SheetsValuesColumnCluster} [merged]
 */

/**
 * @param {SheetsValuesColumnCluster} cluster1
 * @param {SheetsValuesColumnCluster} cluster2
 * @param {Number} [maxGapBetweenSameTypeClusters]
 *
 * @returns {_Merge2TypesClusterRerult}
 */
export function _merge2SameTypeTableClusters_(
  cluster1,
  cluster2,
  maxGapBetweenSameTypeClusters
) {
  // check if logically 2 clusters can be merged
  // max 1 gap between them
  const MAX_GAP_BETWEEN_MERGED_CLUSTERS = 1;
  maxGapBetweenSameTypeClusters =
    maxGapBetweenSameTypeClusters || MAX_GAP_BETWEEN_MERGED_CLUSTERS;

  let gap = 0;
  if (cluster2.start_index > cluster1.start_index) {
    gap = cluster2.start_index - cluster1.end_index - 1;
  } else {
    gap = cluster1.start_index - cluster2.end_index - 1;
  }
  if (gap > maxGapBetweenSameTypeClusters) {
    return {
      can_merge: false,
    };
  }

  const canConvertByTupe = _canMerge2ClustersByType_(cluster1, cluster2);
  if (!canConvertByTupe) {
    return {
      can_merge: false,
    };
  }

  const merged = mergeColumnValuesClusters_([cluster1, cluster2]);
  return {
    can_merge: true,
    merged,
  };
}

/**
 * @param {SheetsValuesColumnCluster} cluster1
 * @param {SheetsValuesColumnCluster} cluster2
 * @returns {Boolean}
 */
function _canMerge2ClustersByType_(cluster1, cluster2) {
  const commonType1 = _getTablerClusterTypeBestDataType_(cluster1);
  const commonType2 = _getTablerClusterTypeBestDataType_(cluster2);
  if (commonType1 !== commonType2) return false;
  return true;
}

/**
 * @param {SheetsValuesColumnCluster} cluster
 * @returns {BasicDataType}
 */
function _getTablerClusterTypeBestDataType_(cluster) {
  if (cluster.type !== "string") return cluster.type;
  if (!cluster.string_like_type) return cluster.type;
  return cluster.string_like_type;
}
