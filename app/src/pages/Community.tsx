import Hero from '../components/hero/Hero';
import CommunityBenefits from '../components/community/CommunityBenefits';
import EngagementLadder from '../components/community/EngagementLadder';
import StoryShowcase from '../components/community/StoryShowcase';
import CommunityTools from '../components/community/CommunityTools';
import CommunityCases from '../components/community/CommunityCases';
import { communityPage } from '../data/pages/community';
import styles from './Community.module.css';

const CommunityPage = () => {
  return (
    <div className={styles.page}>
      <Hero {...communityPage.hero} />
      <CommunityBenefits benefits={communityPage.benefits} />
      <EngagementLadder ladder={communityPage.ladder} />
      <StoryShowcase stories={communityPage.stories} />
      <CommunityTools tools={communityPage.tools} />
      <CommunityCases cases={communityPage.cases} />
    </div>
  );
};

export default CommunityPage;
