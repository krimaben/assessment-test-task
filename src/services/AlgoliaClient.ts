import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "4WK61QBPDU",
  "a3a8a3edba3b7ba9dad65b2984b91e69"
);

const index = searchClient.initIndex("algolia-recommendation-data");

export interface UserAnswers {
  gitExperience: string;
  familiarFrameworks: string[];
  preferredLanguage: string;
  preferredOS: string;
  remoteWorkExperience: boolean;
  databaseExperience: string;
  cloudPlatforms: string[];
  contributeOpenSource: boolean;
  recentTechLearning: string;
}

export const searchResources = async (userAnswers: UserAnswers) => {
  const facetFilters = Object.entries(userAnswers)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `relevantTo:${key}:${v}`);
      } else if (typeof value === "boolean") {
        return `relevantTo:${key}:${value ? "Yes" : "No"}`;
      } else {
        return `relevantTo:${key}:${value}`;
      }
    })
    .flat();

  try {
    const { hits } = await index.search("", {
      facetFilters: [facetFilters],
    });
    return hits;
  } catch (error) {
    console.error("Algolia search error:", error);
    return [];
  }
};
