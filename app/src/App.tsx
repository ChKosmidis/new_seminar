import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home";
import IntroPage from "./pages/Intro";
import CommunityPage from "./pages/Community";
import InternalCommunicationsPage from "./pages/InternalCommunications";
import InfrastructurePage from "./pages/Infrastructure";
import LegalSecurityPage from "./pages/LegalSecurity";
import EffectivenessPage from "./pages/Effectiveness";
import CrisisManagementPage from "./pages/CrisisManagement";
import FundraisingPage from "./pages/Fundraising";
import CasesPage from "./pages/Cases";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/modules/0-introduction"
        element={
          <Layout withSectionsStrip>
            <IntroPage />
          </Layout>
        }
      />
      <Route
        path="/modules/1-community-building"
        element={
          <Layout withSectionsStrip>
            <CommunityPage />
          </Layout>
        }
      />
      <Route
        path="/modules/2-internal-communications"
        element={
          <Layout withSectionsStrip>
            <InternalCommunicationsPage />
          </Layout>
        }
      />
      <Route
        path="/modules/3-infrastructure"
        element={
          <Layout withSectionsStrip>
            <InfrastructurePage />
          </Layout>
        }
      />
      <Route
        path="/modules/4-legal-and-security"
        element={
          <Layout withSectionsStrip>
            <LegalSecurityPage />
          </Layout>
        }
      />
      <Route
        path="/modules/5-effectiveness-and-development"
        element={
          <Layout withSectionsStrip>
            <EffectivenessPage />
          </Layout>
        }
      />
      <Route
        path="/modules/6-crisis-management"
        element={
          <Layout withSectionsStrip>
            <CrisisManagementPage />
          </Layout>
        }
      />
      <Route
        path="/modules/7-fundraising"
        element={
          <Layout withSectionsStrip>
            <FundraisingPage />
          </Layout>
        }
      />
      <Route
        path="/modules/8-cases-and-practice"
        element={
          <Layout withSectionsStrip>
            <CasesPage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
