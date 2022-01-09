import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';
import { Banner } from '../../../../components/Banner';
import { HowToBuyModal } from '../../../../components/HowToBuyModal';

import { useAuctionsList } from './hooks/useAuctionsList';
import { AuctionRenderCard } from '../../../../components/AuctionRenderCard';

import {  useCreators } from '../../../../hooks';

const { TabPane } = Tabs;
const { Content } = Layout;

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
}

export const SalesListView = () => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading } = useMeta();
  const { connected } = useWallet();
  const { auctions, hasResaleAuctions } = useAuctionsList(activeKey);
 /* get creators
  const creators = useCreators(auctions[0]);
  const filtered = auctions.filter(m =>
    useCreators(m)?.some(c => c.address === id),
  );

  */


  return (
    <>
      <Banner
    src="/test-banner.jpg"
    headingText="NFT Marketplace on Solana ( Test Version )"
    subHeadingText="0% marketplace fee ( marketplace fee will be added in the stable version )"
       
        useBannerBg
      />
      <Layout>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col style={{ width: '100%', marginTop: 32 }}>
            <Row>
              <Tabs 
              style={{ display: 'flex',  justifyContent:'center' ,flexWrap: 'wrap', alignItems: 'center'}}
                activeKey={activeKey}
                onTabClick={key => setActiveKey(key as LiveAuctionViewState)}
              >
               <TabPane        tab="Explore" key={LiveAuctionViewState.All}></TabPane>
               
         
               <TabPane tab="Latest Sales" key={LiveAuctionViewState.Ended}></TabPane>
               {connected && (
                <TabPane tab="My Listed Items" key={LiveAuctionViewState.Participated}></TabPane>
               )}
              </Tabs>
            </Row>
            <Row>
              <div className="artwork-grid">
                {isLoading &&
                  [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
                {!isLoading &&
                  auctions.map(auction => (
                    <Link
                      key={auction.auction.pubkey}
                      to={`/auction/${auction.auction.pubkey}`}
                    >
                      <AuctionRenderCard auctionView={auction} />
                    </Link>
                  ))}
              </div>
            </Row>
          </Col>
        </Content>
      </Layout>
    </>
  );
};
