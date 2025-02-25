import styled from "styled-components";
import { useServices } from "./useServices";
import { useServiceDetails } from "../serviceDetails/useServiceDetails";

import Spinner from "../../ui/Spinner";
import { useState } from "react";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ServiceItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  background: #f9f9f9;

  &:hover {
    background: #e6e6e6;
  }
`;

function ServiceDetails({ service, onCloseModal }) {
  const { isLoading, serviceDetails } = useServiceDetails();
  const { _id: serviceId, name } = service;

  console.log(serviceDetails);
  console.log(name);

  //----------------------------------------------
  // const toViewDetail = serviceDetails?.forEach((detail) =>
  //   console.log(detail.serviceName.name)
  // );
  // const serviceNames = serviceDetails?.map((detail) => detail.serviceName?.name);

  const matchedService = serviceDetails?.find(
    (detail) => detail.serviceName?.name === service?.name
  );

  if (isLoading) return <Spinner />;

  return (
    // <ModalContent>
    //   <h1>Service Details:</h1>
    //   {/* {!selectedService ? (
    //     serviceDetails?.map((detail, index) => (
    //       <div key={index} onClick={() => setSelectedService(detail)}>
    //         <h2>{detail.serviceName?.name}</h2>
    //       </div>
    //     ))
    //   ) : (
    //     <div>
    //       <h2>{selectedService.serviceName?.name}</h2>
    //       <p>Description: {selectedService.description}</p>
    //       <p>Price: ${selectedService.price}</p>
    //       <p>Rating: {selectedService.rating}</p>
    //       <p>Service Provider: {selectedService.serviceprovidername}</p>
    //       <p>Contact Email: {selectedService.serviceprovideremail}</p>
    //       <p>Contact Phone: {selectedService.serviceproviderphone}</p>
    //       <p>Organization: {selectedService.org?.nameOrg}</p>
    //     </div>
    //   )} */}

    //   <div>{name}</div>
    //   <div>{toViewDetail}</div>
    //   <div>{printttt}</div>

    // </ModalContent>

    <ModalContent>
      <h1>Service Details:</h1>
      {matchedService ? (
        <div>
          <h2>{matchedService.serviceName?.name}</h2>
          <p>Description: {matchedService.description}</p>
          <p>Status: {matchedService.status}</p>
          <p>Price: ${matchedService.price}</p>
          <p>Rating: {matchedService.rating}</p>
          <p>Service Provider: {matchedService.serviceprovidername}</p>
          <p>Contact Email: {matchedService.serviceprovideremail}</p>
          <p>Contact Phone: {matchedService.serviceproviderphone}</p>
          <p>Organization: {matchedService.org?.nameOrg}</p>
        </div>
      ) : (
        <p>No matching service found.</p>
      )}
    </ModalContent>
  );
}
export default ServiceDetails;
