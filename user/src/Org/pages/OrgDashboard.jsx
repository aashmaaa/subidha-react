import ServiceGrid from "../features/services/ServiceGrid";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function OrgDashboard() {
  return (
    <Row type="vertical">
      <Heading as="h2">Choose a service to get started:</Heading>
      <ServiceGrid />
    </Row>
  );
}

export default OrgDashboard;
