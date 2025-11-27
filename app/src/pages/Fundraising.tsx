import Hero from '../components/hero/Hero';
import FundraisingIdeaForm from '../components/fundraising/FundraisingIdeaForm';
import FundraisingStrategies from '../components/fundraising/FundraisingStrategies';
import FundraisingContexts from '../components/fundraising/FundraisingContexts';
import FundraisingResources from '../components/fundraising/FundraisingResources';
import { fundraisingPage } from '../data/pages/fundraising';
import styles from './Fundraising.module.css';

const FundraisingPage = () => {
  return (
    <div className={styles.page}>
      <Hero {...fundraisingPage.hero} />
      <FundraisingIdeaForm advisor={fundraisingPage.advisor} />
      <FundraisingStrategies strategies={fundraisingPage.strategies} />
      <FundraisingContexts contexts={fundraisingPage.contexts} />
      <FundraisingResources resources={fundraisingPage.resources} />
    </div>
  );
};

export default FundraisingPage;
