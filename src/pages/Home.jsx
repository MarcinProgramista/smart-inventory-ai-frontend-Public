import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import API_CONFIG from "../config/api";
import StyledLink from "../components/ui/buttons/StyledLink";
import Button from "../components/ui/buttons/Button";
import {
  Card,
  CardTitle,
  CardValue,
  DashboardWrapper,
  LogoutContainer,
  SummaryGrid,
  Welcome,
} from "../components/dashboard/DashboardStyles";
import AIInsights from "../components/dashboard/AIInsights";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import Alerts from "../components/dashboard/Alerts";
import MiniCharts from "../components/dashboard/MiniCharts";
import CategoryChart from "../components/dashboard/CategoryChart";
import AIForecast from "../components/dashboard/AIForecast";
import SectionNavigation from "../components/dashboard/SectionNavigation";
import ScrollToTopButton from "../components/dashboard/ScrollToTopButton";

export default function Home() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`,
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout request failed:", err);
    }

    setAuth({});
    navigate("/login");
  };

  return (
    <>
      <LogoutContainer>
        <StyledLink>
          <Button onClick={handleLogout}>Log out</Button>
        </StyledLink>
      </LogoutContainer>

      <DashboardWrapper>
        <Welcome>Welcome to SmartInventoryAI 👋</Welcome>
        <SectionNavigation />
        <div id="summary">
          <SummaryGrid>
            <Card>
              <CardTitle>Total Items</CardTitle>
              <CardValue>124</CardValue>
            </Card>

            <Card>
              <CardTitle>Low Stock Alerts</CardTitle>
              <CardValue>5</CardValue>
            </Card>

            <Card>
              <CardTitle>Incoming Stock</CardTitle>
              <CardValue>12</CardValue>
            </Card>

            <Card>
              <CardTitle>Outgoing Stock</CardTitle>
              <CardValue>9</CardValue>
            </Card>
          </SummaryGrid>
        </div>
        <div id="ai-insights">
          <AIInsights />
        </div>
        <div id="quick-actions">
          <QuickActions />
        </div>
        <div id="activity">
          <RecentActivity />
        </div>
        <div id="alerts">
          <Alerts />
        </div>
        <div id="charts">
          <MiniCharts />
          <CategoryChart />
          <AIForecast />
        </div>
      </DashboardWrapper>
      <ScrollToTopButton />
    </>
  );
}
