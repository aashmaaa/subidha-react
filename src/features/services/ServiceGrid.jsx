import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import { useServices } from "./useServices";
import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus"; // Import Menus
import ServiceCard from "./ServiceCard";

function ServiceGrid() {
  const { services, isLoading } = useServices();
  const navigate = useNavigate();

  // console.log(services);
  const service = services?.data || [];
  // console.log(service);

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      {" "}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* {services?.data?.map((service, index) => {
          console.log(`Rendering ServiceCard #${index + 1}:`, service);
          return <ServiceCard service={service} key={service._id} />;
        })} */}
        {service.map((service) => (
          <ServiceCard service={service} key={service._id} />
        ))}
      </div>
    </Menus>
  );
}

export default ServiceGrid;
