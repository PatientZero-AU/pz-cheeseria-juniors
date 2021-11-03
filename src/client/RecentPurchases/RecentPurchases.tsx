import { useEffect } from "react";
import { useQuery } from "react-query";
import { RecentItem, RecentPurchasesContainer } from "./RecentPurchases.styles";

type Props = {};

type RecentItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
};

const getRecentItems = async (): Promise<RecentItemType[]> =>
  await (await fetch(`api/orders/recent`)).json();

const RecentPurchases: React.FC<Props> = () => {
  const { data, isLoading, error } = useQuery<RecentItemType[]>(
    "recent-orders",
    getRecentItems
  );

  return (
    <RecentPurchasesContainer>
      <h2>Recent Purchases</h2>
      {data ? (
        data.map((item) => (
          <RecentItem key={item.id}>
            <img src={item.image} alt={item.title} />
            <div>{item.title}</div>
          </RecentItem>
        ))
      ) : (
        <div>Nothing here</div>
      )}
    </RecentPurchasesContainer>
  );
};

export default RecentPurchases;
