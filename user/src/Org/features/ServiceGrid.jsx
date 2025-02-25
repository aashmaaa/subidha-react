import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import { useServices } from "./useServices";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ServiceCard = styled.div`
  width: 250px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color:   --color-grey-700: #374151;
  font-size: 16px;
  font-weight: 1;
  margin: 10px;
  background:   --color-grey-400: #9ca3af;
  cursor: pointer;


`;
function ServiceGrid() {
  const { services, isLoading } = useServices();
  const navigate = useNavigate();

  const service = services?.data || [];
  console.log(service);

  const handleCardClick = (serviceName) => {
    navigate(`/service-details/${serviceName}`);
  };

  if (isLoading) return <Spinner />;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {service.map((serv) => (
        <ServiceCard
          key={serv._id}
          code={serv.servicecode}
          onClick={() => handleCardClick(serv.name)}
        >
          <h3>{serv.name}</h3>
          <p>Code: {serv.servicecode}</p>
        </ServiceCard>
      ))}
    </div>
  );
}

export default ServiceGrid;
