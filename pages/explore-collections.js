import Head from "next/head";
import ExploreCard from "../components/Explore/ExploreCard/ExploreCard";
import classes from "../styles/Explore.module.css";
import collectionBanner from "../assets/collection-banner.png";
// import ExploreCardEmpty from "../components/Explore/ExploreCardEmpty/ExploreCardEmpty";
import Search from "../components/Search/Search";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "../utils/subgraphQuery";
import { useRouter } from "next/router";

const ExploreCollection = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    console.log({ searchValue: e.target.value });
  };

  const router = useRouter();

  const { loading, error, data, refetch } = useQuery(GET_COLLECTIONS, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch();
  }, [router.asPath]);

  return (
    <div className={classes.container}>
      <Head>
        <title>BleuWater Ecosystem</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{ background: `url(${collectionBanner.src})` }}
        className={classes.banner}
      >
        <div className={classes.mainText}>Discover</div>
        <div className={classes.subText}>All Collection</div>
        <div className={classes.searchContainer}>
          <Search
            value={searchValue}
            onChange={handleChange}
            placeholder="Search for collection"
            faint
          />
        </div>
      </div>
      <div className={classes.innerContainer}>
        {error ? (
          <>something went wrong</>
        ) : loading ? (
          <>loading...</>
        ) : (
          <div className={classes.cardContainer}>
            {data.collections
              .filter((collection) => collection.nfts.length)
              .map((collection, idx) => (
                <ExploreCard key={idx} collection={collection} />
              ))}
            {/* <ExploreCardEmpty /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCollection;
